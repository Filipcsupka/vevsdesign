import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Review by 2026-11-04. GHSA-vfj7-8cjw-p6xm has no patched braces release.
// Its only path here is the dev-only ESLint toolchain; the deployed image is static nginx content.
const advisoryUrl = "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm";
const waivedChain = new Map([
  ["braces", { version: "3.0.3", via: advisoryUrl }],
  ["micromatch", { version: "4.0.8", via: "braces" }],
  ["fast-glob", { version: "3.3.1", via: "micromatch" }],
  ["@next/eslint-plugin-next", { version: "16.3.4", via: "fast-glob" }],
  ["eslint-config-next", { version: "16.3.4", via: "@next/eslint-plugin-next" }],
]);

function runAudit(args) {
  const result = spawnSync("npm", ["audit", ...args], {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
  if (result.error || result.signal || ![0, 1].includes(result.status)) {
    throw new Error(`npm audit failed to run: ${result.error?.message ?? result.stderr ?? result.status}`);
  }
  return result;
}

try {
  const lock = JSON.parse(readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"));
  const fullAudit = runAudit(["--json", "--audit-level=high"]);
  const report = JSON.parse(fullAudit.stdout);
  if (report.error || !report.vulnerabilities || !report.metadata?.vulnerabilities) {
    throw new Error(`Unexpected npm audit response: ${report.error?.message ?? "missing vulnerability data"}`);
  }

  const serious = Object.entries(report.vulnerabilities).filter(([, item]) =>
    item.severity === "high" || item.severity === "critical"
  );
  const seriousCount = report.metadata.vulnerabilities.high + report.metadata.vulnerabilities.critical;
  if (seriousCount !== serious.length || (fullAudit.status === 0) !== (seriousCount === 0)) {
    throw new Error("npm audit status or vulnerability count does not match its report");
  }

  for (const [name, item] of serious) {
    const allowed = waivedChain.get(name);
    const locked = lock.packages?.[`node_modules/${name}`];
    const expectedVia = allowed?.via;
    const validVia = item.via?.length === 1 && item.via[0] === expectedVia ||
      item.via?.length === 1 && item.via[0]?.url === expectedVia && item.via[0]?.name === name;
    if (!allowed || item.severity !== "high" || !validVia ||
      item.nodes?.length !== 1 || item.nodes[0] !== `node_modules/${name}` ||
      locked?.version !== allowed.version || locked.dev !== true) {
      throw new Error(`Unwaived high/critical npm advisory in ${name}`);
    }
  }

  const productionAudit = runAudit(["--omit=dev", "--audit-level=high"]);
  if (productionAudit.status !== 0) {
    throw new Error(`Production dependency audit failed:\n${productionAudit.stdout}\n${productionAudit.stderr}`);
  }

  if (serious.length) {
    process.stdout.write(`Waived ${advisoryUrl} in dev-only ESLint dependencies; review by 2026-11-04.\n`);
  }
  process.stdout.write("Production dependencies: no high or critical advisories.\n");
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
