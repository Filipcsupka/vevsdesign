"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  spin: number;
  alpha: number;
  alphaDelta: number;
  color: string;
  drift: number;
  driftAngle: number;
};

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const context = ctx;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let rafId = 0;
    let animationActive = false;
    let petals: Petal[] = [];

    function getCanvasHeight() {
      const usesMobileViewport = window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;
      if (!usesMobileViewport) return window.innerHeight;

      return Math.max(window.innerHeight, window.screen?.height || 0);
    }

    function getPetalCount() {
      return Math.min(Math.max(Math.floor((W * H) / 16500), 34), 96);
    }

    function resize() {
      const prevW = W;
      const prevH = H;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = getCanvasHeight();

      if (
        prevW === W &&
        prevH === H &&
        canvas!.width === Math.ceil(W * dpr) &&
        canvas!.height === Math.ceil(H * dpr)
      ) {
        return;
      }

      canvas!.width = Math.ceil(W * dpr);
      canvas!.height = Math.ceil(H * dpr);
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!prevW || !prevH || petals.length === 0) return;

      const scaleX = W / prevW;
      const scaleY = H / prevH;
      for (const petal of petals) {
        petal.x *= scaleX;
        petal.y *= scaleY;
      }
    }

    function drawBackdrop() {
      const base = context.createLinearGradient(0, 0, W, H);
      base.addColorStop(0, "#FFF9F2");
      base.addColorStop(0.52, "#F7EFE3");
      base.addColorStop(1, "#EDF6FD");
      context.fillStyle = base;
      context.fillRect(0, 0, W, H);

      const glowTop = context.createRadialGradient(W * 0.5, H * 0.12, 0, W * 0.5, H * 0.12, Math.max(W, H) * 0.55);
      glowTop.addColorStop(0, "rgba(255,255,255,0.44)");
      glowTop.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = glowTop;
      context.fillRect(0, 0, W, H);

      const glowSide = context.createRadialGradient(W * 0.88, H * 0.58, 0, W * 0.88, H * 0.58, Math.max(W, H) * 0.46);
      glowSide.addColorStop(0, "rgba(186,216,242,0.18)");
      glowSide.addColorStop(1, "rgba(186,216,242,0)");
      context.fillStyle = glowSide;
      context.fillRect(0, 0, W, H);

      const glowWarm = context.createRadialGradient(W * 0.18, H * 0.28, 0, W * 0.18, H * 0.28, Math.max(W, H) * 0.34);
      glowWarm.addColorStop(0, "rgba(241,231,216,0.24)");
      glowWarm.addColorStop(1, "rgba(241,231,216,0)");
      context.fillStyle = glowWarm;
      context.fillRect(0, 0, W, H);
    }

    function drawPetal(x: number, y: number, size: number, angle: number, alpha: number, color: string) {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.globalAlpha = alpha;
      context.shadowColor = color;
      context.shadowBlur = size * 1.45;
      context.beginPath();
      context.moveTo(0, -size);
      context.bezierCurveTo(size * 0.82, -size * 0.62, size * 0.72, size * 0.42, size * 0.08, size * 0.78);
      context.bezierCurveTo(-size * 0.58, size * 0.44, -size * 0.78, -size * 0.48, 0, -size);
      context.closePath();

      const fill = context.createLinearGradient(-size * 0.7, -size, size * 0.7, size * 0.8);
      fill.addColorStop(0, "rgba(246,251,255,0.98)");
      fill.addColorStop(0.56, color);
      fill.addColorStop(1, "rgba(139,193,245,0.44)");
      context.fillStyle = fill;
      context.fill();

      context.shadowBlur = 0;
      context.globalAlpha = alpha * 0.54;
      context.beginPath();
      context.moveTo(0, -size * 0.72);
      context.bezierCurveTo(size * 0.16, -size * 0.25, size * 0.12, size * 0.22, size * 0.02, size * 0.52);
      context.strokeStyle = "rgba(245,251,255,0.92)";
      context.lineWidth = Math.max(0.6, size * 0.05);
      context.stroke();
      context.restore();
    }

    function createPetal(spawnInsideViewport = false): Petal {
      const colors = [
        "rgba(170,211,250,0.82)",
        "rgba(148,198,246,0.86)",
        "rgba(191,224,252,0.78)",
        "rgba(131,187,242,0.8)",
      ];

      return {
        x: Math.random() * (W + 180) - 90,
        y: spawnInsideViewport ? Math.random() * H : Math.random() * -H - 40,
        size: Math.random() * 14 + 9,
        speedY: Math.random() * 0.42 + 0.14,
        speedX: (Math.random() - 0.5) * 0.18,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.008,
        alpha: Math.random() * 0.28 + 0.36,
        alphaDelta: (Math.random() * 0.0018 + 0.0006) * (Math.random() < 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
        drift: (Math.random() - 0.5) * 0.01,
        driftAngle: Math.random() * Math.PI * 2,
      };
    }

    function initPetals() {
      petals = [];
      const count = getPetalCount();
      for (let i = 0; i < count; i++) {
        petals.push(createPetal(true));
      }
    }

    function syncPetalCount() {
      const count = getPetalCount();
      if (petals.length > count) {
        petals.length = count;
      }
      while (petals.length < count) {
        petals.push(createPetal());
      }
    }

    function tick() {
      if (!animationActive) {
        return;
      }

      drawBackdrop();

      for (let i = petals.length - 1; i >= 0; i--) {
        const petal = petals[i];
        petal.driftAngle += 0.005;
        petal.x += petal.speedX + Math.cos(petal.driftAngle) * petal.drift * 11;
        petal.y += petal.speedY;
        petal.angle += petal.spin;
        petal.alpha += petal.alphaDelta;
        if (petal.alpha <= 0.14 || petal.alpha >= 0.66) petal.alphaDelta *= -1;

        drawPetal(petal.x, petal.y, petal.size, petal.angle, petal.alpha, petal.color);

        if (petal.y > H + 70 || petal.x < -140 || petal.x > W + 140) {
          petals[i] = createPetal();
        }
      }

      if (!reducedMotion && animationActive) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function paint(resetPetals = false) {
      resize();
      if (resetPetals || petals.length === 0) {
        initPetals();
      } else {
        syncPetalCount();
      }

      if (reducedMotion) {
        drawBackdrop();
        for (const petal of petals) {
          drawPetal(petal.x, petal.y, petal.size, petal.angle, petal.alpha, petal.color);
        }
      }
    }

    function stopAnimation() {
      animationActive = false;
      cancelAnimationFrame(rafId);
    }

    function startAnimation() {
      if (reducedMotion || animationActive) {
        return;
      }

      animationActive = true;
      rafId = requestAnimationFrame(tick);
    }

    const handleResize = () => paint(false);
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
        return;
      }

      paint(false);
      startAnimation();
    };

    paint(true);
    startAnimation();
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAnimation();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} id="site-canvas" aria-hidden="true" />;
}
