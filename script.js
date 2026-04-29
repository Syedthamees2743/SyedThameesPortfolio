window.addEventListener("load", () => {
  setTimeout(
    () => document.getElementById("preloader").classList.add("done"),
    1800,
  );
});
const canvas = document.getElementById("particleCanvas"),
  ctx = canvas.getContext("2d");
let particles = [];
const mouse = { x: null, y: null, radius: 160 };
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
const pCount = Math.min(
  85,
  Math.floor((window.innerWidth * window.innerHeight) / 15000),
);
for (let i = 0; i < pCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.4 + 0.5,
    o: Math.random() * 0.35 + 0.12,
  });
}
document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
document.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    if (mouse.x !== null) {
      const dx = p.x - mouse.x,
        dy = p.y - mouse.y,
        dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const f = (mouse.radius - dist) / mouse.radius;
        p.x += dx * f * 0.012;
        p.y += dy * f * 0.012;
      }
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,232,157,${p.o})`;
    ctx.fill();
  });
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x,
        dy = particles[i].y - particles[j].y,
        dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 125) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,232,157,${0.05 * (1 - dist / 125)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  if (mouse.x !== null) {
    particles.forEach((p) => {
      const dx = p.x - mouse.x,
        dy = p.y - mouse.y,
        dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 170) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(167,139,250,${0.07 * (1 - dist / 170)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();
const dot = document.getElementById("cursorDot"),
  ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + "px";
  dot.style.top = my + "px";
});
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
})();
document.querySelectorAll("a,button,.magnetic,input,textarea").forEach((el) => {
  el.addEventListener("mouseenter", () => ring.classList.add("hover"));
  el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
});
window.addEventListener("scroll", () => {
  const s = window.scrollY,
    h = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById("scrollProgress").style.width = (s / h) * 100 + "%";
});
const nav = document.getElementById("nav"),
  navLinks = document.querySelectorAll("#navLinks a"),
  sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
  let cur = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 100) cur = s.id;
  });
  navLinks.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + cur),
  );
});
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute("href"));
    if (t) window.scrollTo({ top: t.offsetTop - 70, behavior: "smooth" });
  });
});
const mobileNav = document.getElementById("mobileNav"),
  mobOverlay = document.getElementById("mobOverlay");
function openMob() {
  mobileNav.classList.add("open");
  mobOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeMob() {
  mobileNav.classList.remove("open");
  mobOverlay.classList.remove("show");
  document.body.style.overflow = "";
}
document.getElementById("navToggle").addEventListener("click", openMob);
document.getElementById("mobileClose").addEventListener("click", closeMob);
mobOverlay.addEventListener("click", closeMob);
mobileNav
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMob));
setTimeout(() => {
  document.querySelectorAll(".hero-line-inner").forEach((el, i) => {
    setTimeout(() => el.classList.add("active"), i * 200);
  });
}, 2000);
const rvObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("v");
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
);
document
  .querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale")
  .forEach((el) => rvObs.observe(el));
const cntObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target,
          target = +el.dataset.target;
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 35));
        const timer = setInterval(() => {
          cur += step;
          if (cur >= target) {
            cur = target;
            clearInterval(timer);
          }
          el.textContent = cur + "+";
        }, 55);
        cntObs.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll(".stat-num").forEach((el) => cntObs.observe(el));
document.querySelectorAll(".magnetic").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const r = btn.getBoundingClientRect(),
      x = e.clientX - r.left - r.width / 2,
      y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.18}px,${y * 0.18}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});
const roles = [
  "Web Developer",
  "Software Developer",
  "AI Enthusiast",
  "Problem Solver",
  "Full Stack Developer",
];
let ri = 0,
  ci = 0,
  del = false;
const typedEl = document.getElementById("typedEl");
function typeLoop() {
  const cur = roles[ri];
  if (!del) {
    typedEl.textContent = cur.substring(0, ci + 1);
    ci++;
    if (ci === cur.length) {
      del = true;
      setTimeout(typeLoop, 2200);
      return;
    }
  } else {
    typedEl.textContent = cur.substring(0, ci - 1);
    ci--;
    if (ci === 0) {
      del = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, del ? 30 : 75);
}
setTimeout(typeLoop, 2400);
function showToast(msg, type = "ok") {
  const t = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = msg;
  t.className = "toast " + type;
  document.getElementById("toastIcon").className =
    type === "ok"
      ? "fas fa-check-circle ok-i"
      : "fas fa-exclamation-circle err-i";
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 4500);
}
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const n = document.getElementById("name").value,
    em = document.getElementById("email").value;
  showToast(
    `Thanks ${n}! Message sent successfully. I'll reply at ${em}.`,
    "ok",
  );
  e.target.reset();
});
document.getElementById("footerTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
