import { EmailMessage } from "cloudflare:email";

const REQUIRED_FIELDS = ["meno", "email"];
const REQUIRED_ENV_FIELDS = [
  "TURNSTILE_SECRET_KEY",
  "CONTACT_FROM_EMAIL",
];

function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init.headers,
    },
    status: init.status ?? 200,
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function getField(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function getList(formData, name) {
  return formData.getAll(name)
    .map((value) => typeof value === "string" ? value.trim() : "")
    .filter(Boolean);
}

function buildEmailContent(formData) {
  const fields = [
    ["Meno", getField(formData, "meno")],
    ["Email", getField(formData, "email")],
    ["Dátum svadby", getField(formData, "datum_svadby")],
    ["Lokalita svadby", getField(formData, "lokalita_svadby")],
    ["Predbežná cena", getField(formData, "predbezna_cena")],
    ["Balíky", getList(formData, "baliky").join(", ")],
    ["Doplnky na mieru", getList(formData, "doplnky_na_mieru").join(", ")],
    ["Doplnky pre hostí", getList(formData, "doplnky_pre_hosti").join(", ")],
    ["Prenájom", getList(formData, "prenajom").join(", ")],
    ["Poznámka k produktu", getField(formData, "poznamka_a_predstava")],
  ].filter(([, value]) => value);

  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#202124">
      <h1 style="font-size:20px;margin-bottom:16px;">Nová správa z webu Vevsdesign</h1>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">
        <tbody>
          ${fields.map(([label, value]) => `
            <tr>
              <td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f8f7f4;font-weight:600;width:220px;">${escapeHtml(label)}</td>
              <td style="padding:10px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  return { text, html };
}

async function verifyTurnstile(token, request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "";
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("turnstile_unavailable");
  }

  return response.json();
}

function buildMimeEmail({ from, to, replyTo, subject, html, text }) {
  const boundary = `vevsdesign-${crypto.randomUUID()}`;

  return [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    html,
    "",
    `--${boundary}--`,
    "",
  ].filter((line) => line !== null).join("\r\n");
}

async function sendWithCloudflareEmail(formData, env) {
  if (!env.EMAIL || typeof env.EMAIL.send !== "function") {
    throw new Error("cloudflare_email_binding_missing");
  }

  const from = env.CONTACT_FROM_EMAIL;
  const to = env.CONTACT_TO_EMAIL || env.EMAIL_DESTINATION || "vevsdesignn@gmail.com";
  const replyTo = getField(formData, "email");
  const { html, text } = buildEmailContent(formData);

  const raw = buildMimeEmail({
    from,
    to,
    replyTo,
    subject: "Nová správa z webu Vevsdesign",
    html,
    text,
  });
  const message = new EmailMessage(from, to, raw);
  const response = await env.EMAIL.send(message);

  if (!response?.messageId) {
    throw new Error("cloudflare_email_send_failed");
  }

  console.log("contact-worker email accepted", {
    messageId: response.messageId,
    from,
    to,
    replyTo: replyTo || null,
  });

  return response.messageId;
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204 });
    }
    if (request.method !== "POST") {
      return jsonResponse({ ok: false, error: "method_not_allowed" }, { status: 405 });
    }

    const origin = request.headers.get("Origin");
    if (env.ALLOWED_ORIGIN && origin !== env.ALLOWED_ORIGIN) {
      return jsonResponse({ ok: false, error: "forbidden_origin" }, { status: 403 });
    }

    for (const field of REQUIRED_ENV_FIELDS) {
      if (!env[field]) {
        console.error("contact-worker missing env", field);
        return jsonResponse({ ok: false, error: "worker_not_configured" }, { status: 500 });
      }
    }

    const formData = await request.formData();
    if (getField(formData, "_honey")) {
      return jsonResponse({ ok: true });
    }

    for (const field of REQUIRED_FIELDS) {
      if (!getField(formData, field)) {
        return jsonResponse({ ok: false, error: `missing_${field}` }, { status: 400 });
      }
    }

    const turnstileToken = getField(formData, "cf-turnstile-response");
    if (!turnstileToken) {
      return jsonResponse({ ok: false, error: "missing_turnstile" }, { status: 400 });
    }

    try {
      const verification = await verifyTurnstile(turnstileToken, request, env);
      if (!verification.success) {
        return jsonResponse({ ok: false, error: "turnstile_verification_failed" }, { status: 400 });
      }

      const messageId = await sendWithCloudflareEmail(formData, env);
      console.log("contact-worker request completed", { messageId });
      return jsonResponse({ ok: true });
    } catch (error) {
      console.error("contact-worker error", error);
      return jsonResponse({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  },
};
