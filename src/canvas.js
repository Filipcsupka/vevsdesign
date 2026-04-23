export function initCanvas() {
  const canvas = document.getElementById('site-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dpr, particles;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.ceil(W * dpr);
    canvas.height = Math.ceil(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawBackdrop() {
    const base = ctx.createLinearGradient(0, 0, W, H);
    base.addColorStop(0, '#FBF6EE');
    base.addColorStop(0.48, '#F7F1E8');
    base.addColorStop(1, '#EDE0C8');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, W, H);

    const glowTop = ctx.createRadialGradient(W * 0.5, H * 0.12, 0, W * 0.5, H * 0.12, Math.max(W, H) * 0.55);
    glowTop.addColorStop(0, 'rgba(255,255,255,0.44)');
    glowTop.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glowTop;
    ctx.fillRect(0, 0, W, H);

    const glowSide = ctx.createRadialGradient(W * 0.88, H * 0.58, 0, W * 0.88, H * 0.58, Math.max(W, H) * 0.46);
    glowSide.addColorStop(0, 'rgba(193,166,120,0.12)');
    glowSide.addColorStop(1, 'rgba(193,166,120,0)');
    ctx.fillStyle = glowSide;
    ctx.fillRect(0, 0, W, H);
  }

  function drawPetal(x, y, size, angle, alpha, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * 0.82, -size * 0.62, size * 0.72, size * 0.42, size * 0.08, size * 0.78);
    ctx.bezierCurveTo(-size * 0.58, size * 0.44, -size * 0.78, -size * 0.48, 0, -size);
    ctx.closePath();
    const petalFill = ctx.createLinearGradient(-size * 0.7, -size, size * 0.7, size * 0.8);
    petalFill.addColorStop(0, 'rgba(255,248,234,0.78)');
    petalFill.addColorStop(0.58, color);
    petalFill.addColorStop(1, 'rgba(193,166,120,0.22)');
    ctx.fillStyle = petalFill;
    ctx.fill();
    ctx.globalAlpha = alpha * 0.42;
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.72);
    ctx.bezierCurveTo(size * 0.16, -size * 0.25, size * 0.12, size * 0.22, size * 0.02, size * 0.52);
    ctx.strokeStyle = 'rgba(255,248,234,0.62)';
    ctx.lineWidth = Math.max(0.6, size * 0.055);
    ctx.stroke();
    ctx.restore();
  }

  function drawSparkle(x, y, size, angle, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const r1 = size, r2 = size * 0.3;
      if (i === 0) ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
      else ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1);
      const aMid = a + Math.PI / 4;
      ctx.lineTo(Math.cos(aMid) * r2, Math.sin(aMid) * r2);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,252,246,0.72)';
    ctx.fill();
    ctx.restore();
  }

  function createParticle() {
    const type = Math.random() < 0.62 ? 'petal' : (Math.random() < 0.68 ? 'dot' : 'sparkle');
    const colors = [
      'rgba(193,166,120,0.50)',
      'rgba(212,184,150,0.44)',
      'rgba(181,154,123,0.38)',
      'rgba(222,201,167,0.42)',
      'rgba(238,228,216,0.34)',
    ];
    return {
      type,
      x: Math.random() * (W + 180) - 90,
      y: Math.random() * -H - 40,
      size: type === 'petal' ? (Math.random() * 12 + 7) : (type === 'dot' ? (Math.random() * 2.2 + 0.8) : (Math.random() * 2.8 + 1.4)),
      speedY: Math.random() * 0.34 + 0.12,
      speedX: (Math.random() - 0.5) * 0.18,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.009,
      alpha: Math.random() * 0.42 + 0.22,
      alphaDelta: (Math.random() * 0.002 + 0.0007) * (Math.random() < 0.5 ? 1 : -1),
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: (Math.random() - 0.5) * 0.008,
      driftAngle: Math.random() * Math.PI * 2,
    };
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.max(Math.floor((W * H) / 18000), 24), 92);
    for (let i = 0; i < count; i++) {
      const p = createParticle();
      p.y = Math.random() * H;
      particles.push(p);
    }
  }

  function tick() {
    drawBackdrop();

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.driftAngle += 0.006;
      p.x += p.speedX + Math.cos(p.driftAngle) * p.drift * 12;
      p.y += p.speedY;
      p.angle += p.spin;
      p.alpha += p.alphaDelta;
      if (p.alpha <= 0.08 || p.alpha >= 0.58) p.alphaDelta *= -1;

      if (p.type === 'petal') {
        drawPetal(p.x, p.y, p.size, p.angle, p.alpha, p.color);
      } else if (p.type === 'dot') {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      } else {
        drawSparkle(p.x, p.y, p.size, p.angle, p.alpha * 0.8);
      }

      if (p.y > H + 70 || p.x < -150 || p.x > W + 150) {
        particles[i] = createParticle();
      }
    }

    if (!reducedMotion) requestAnimationFrame(tick);
  }

  resize();
  initParticles();
  tick();
  window.addEventListener('resize', () => {
    resize();
    initParticles();
    if (reducedMotion) tick();
  }, { passive: true });
}
