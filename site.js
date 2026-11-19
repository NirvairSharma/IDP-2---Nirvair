/* site.js - shared effects for every page. Plain-JS versions inspired by React Bits (reactbits.dev):
   Gooey Nav, Tilted Card, Noise, Fold Text, Star Border, Dark Veil, Gradient Text, Counter. */
(function () {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const PAGES = [["Home", "index.html"], ["Play", "play.html"], ["Visualizer", "visualizer.html"], ["Quiz", "quiz.html"], ["Timeline", "timeline.html"]];
  const idx = Math.max(0, PAGES.findIndex((p) => p[1] === page));
  // theme per page: frame, text, pill, pill text
  const T = {
    "index.html": ["rgba(255,255,255,.72)", "#1d3a73", "#1d3a73", "#fff"],
    "timeline.html": ["rgba(255,248,230,.78)", "#3a2815", "#94622a", "#fff"],
    "play.html": ["rgba(30,18,12,.78)", "#f3e7cf", "#d4a94f", "#26160d"],
    "visualizer.html": ["rgba(14,14,30,.78)", "#c9ceff", "#5b7cff", "#fff"],
    "quiz.html": ["rgba(255,255,255,.85)", "#1b1340", "#6c4cf1", "#fff"]
  };
  const el = (t, c) => { const e = document.createElement(t); if (c) e.className = c; return e; };

  const css = document.createElement("style");
  css.textContent = `
.gn-wrap{position:sticky;top:10px;z-index:60;display:flex;justify-content:center;align-items:center;gap:12px;flex-wrap:wrap;margin:12px auto 18px;pointer-events:none}
.gn-wrap>*{pointer-events:auto}
.gn-logo{display:flex;background:#fff;border-radius:14px;padding:3px 8px;box-shadow:0 4px 14px rgba(0,0,0,.18)}
.gn-logo img{height:38px;width:auto;display:block}
.gn{position:relative;display:flex;gap:2px;padding:6px;border-radius:999px;background:var(--gn-frame);-webkit-backdrop-filter:blur(14px) saturate(1.5);backdrop-filter:blur(14px) saturate(1.5);box-shadow:0 10px 26px -10px rgba(0,0,0,.35),inset 0 0 0 1px var(--gn-edge)}
.gn-goo{position:absolute;inset:6px;filter:url(#gn-goo);pointer-events:none}
.gn-pill{position:absolute;top:0;left:0;height:100%;border-radius:999px;background:var(--gn-pill);transition:transform .55s cubic-bezier(.3,1.4,.5,1),width .55s cubic-bezier(.3,1.4,.5,1)}
.gn-drop{position:absolute;left:0;top:0;width:10px;height:10px;border-radius:50%;background:var(--gn-pill)}
.gn a.gn-l{position:relative;z-index:1;padding:8px 16px;border-radius:999px;color:var(--gn-ink);text-decoration:none;font:500 14px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;white-space:nowrap;transition:opacity .2s}
.gn a.gn-l:hover{opacity:.75}
.gn a.gn-l[aria-current=page]{color:var(--gn-pill-ink)}
.tc-glare{position:absolute;left:0;top:0;width:100%;aspect-ratio:16/10;border-radius:18px;opacity:0;pointer-events:none;transition:opacity .3s;mix-blend-mode:screen}
.fx-noise{position:fixed;inset:0;z-index:40;pointer-events:none;opacity:.14;mix-blend-mode:multiply}
.sb-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;filter:drop-shadow(0 0 5px #ffe9a8)}
.sb-svg rect{fill:none;stroke:#fff3c9;stroke-width:2;stroke-linecap:round;stroke-dasharray:12 88;animation:sb-run 4s linear infinite}
@keyframes sb-run{to{stroke-dashoffset:-100}}
.fx-veil{position:fixed;inset:0;width:100%;height:100%;z-index:-1;opacity:.6}
h1.gradient-text{background:linear-gradient(90deg,#5b7cff,#b06bff,#ff7a4d,#5b7cff,#b06bff) 0 0/300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:gt 7s ease-in-out infinite alternate;filter:drop-shadow(0 0 14px rgba(150,110,255,.35))}
@keyframes gt{to{background-position:100% 0}}
.odo-c{display:inline-block;height:1em;line-height:1;overflow:hidden;vertical-align:bottom}
.odo-s{display:flex;flex-direction:column;transition:transform .8s cubic-bezier(.3,1.35,.5,1)}
.odo-s i{font-style:normal;height:1em;line-height:1;text-align:center}
@media (prefers-reduced-motion:reduce){.sb-svg rect,h1.gradient-text{animation:none}.odo-s,.gn-pill{transition:none}}`;
  document.head.appendChild(css);

  /* ---------- Gooey Nav (shared on every page) ---------- */
  function nav() {
    document.querySelector("a.home")?.remove();
    const t = T[page] || T["index.html"];
    const wrap = el("div", "gn-wrap");
    wrap.style.cssText = "--gn-frame:" + t[0] + ";--gn-ink:" + t[1] + ";--gn-pill:" + t[2] + ";--gn-pill-ink:" + t[3] + ";--gn-edge:rgba(128,128,128,.25)";
    wrap.innerHTML = '<a class="gn-logo" href="index.html" aria-label="Home"><img src="images/logo.png" alt="21K School"></a>' +
      '<nav class="gn" aria-label="Site"><div class="gn-goo"><div class="gn-pill"></div></div></nav>' +
      '<svg width="0" height="0" style="position:absolute"><filter id="gn-goo"><feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b"/>' +
      '<feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"/></filter></svg>';
    document.body.prepend(wrap);
    const gn = wrap.querySelector(".gn"), goo = wrap.querySelector(".gn-goo"), pill = wrap.querySelector(".gn-pill");
    const links = PAGES.map((p, i) => {
      const a = el("a", "gn-l"); a.href = p[1]; a.textContent = p[0];
      if (i === idx) a.setAttribute("aria-current", "page");
      gn.appendChild(a); return a;
    });
    const at = (i) => [links[i].offsetLeft - 6, links[i].offsetWidth];
    const set = (i) => { const [x, w] = at(i); pill.style.transform = "translateX(" + x + "px)"; pill.style.width = w + "px"; };
    const drops = (a, b) => {
      if (RM) return;
      const [xa, wa] = at(a), [xb, wb] = at(b), h = pill.offsetHeight;
      for (let i = 0; i < 8; i++) {
        const d = el("div", "gn-drop"); goo.appendChild(d);
        const sx = xa + wa * Math.random(), ex = xb + wb * Math.random(), my = (Math.random() - 0.5) * 46, y = h / 2 - 5;
        d.animate([
          { transform: "translate(" + sx + "px," + y + "px)" },
          { transform: "translate(" + (sx + ex) / 2 + "px," + (y + my) + "px)", offset: 0.5 },
          { transform: "translate(" + ex + "px," + y + "px)" }
        ], { duration: 520 + Math.random() * 260, delay: Math.random() * 80, easing: "ease-in-out", fill: "both" }).onfinish = () => d.remove();
      }
    };
    let prev = idx;
    try { const s = parseInt(sessionStorage.getItem("gnPrev"), 10); if (!isNaN(s) && s >= 0 && s < PAGES.length) prev = s; sessionStorage.setItem("gnPrev", idx); } catch (e) {}
    const start = () => {
      pill.style.transition = "none"; set(prev); pill.offsetWidth; pill.style.transition = "";
      requestAnimationFrame(() => { set(idx); if (prev !== idx) drops(prev, idx); });
    };
    start();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { pill.style.transition = "none"; set(idx); pill.offsetWidth; pill.style.transition = ""; });
    addEventListener("resize", () => { pill.style.transition = "none"; set(idx); pill.offsetWidth; pill.style.transition = ""; });
  }

  /* ---------- Tilted Card (home panels) ---------- */
  function tilt() {
    document.querySelectorAll(".panel").forEach((p) => {
      const img = p.querySelector("img"); if (!img) return;
      p.style.position = "relative";
      const g = el("span", "tc-glare"); p.appendChild(g);
      p.addEventListener("pointermove", (e) => {
        if (e.pointerType === "touch" || RM) return;
        const r = img.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        img.style.transition = "transform .12s ease-out";
        img.style.transform = "perspective(800px) rotateX(" + (-y * 12) + "deg) rotateY(" + (x * 12) + "deg) scale(1.04)";
        g.style.opacity = 1;
        g.style.background = "radial-gradient(circle at " + (x + 0.5) * 100 + "% " + (y + 0.5) * 100 + "%,rgba(255,255,255,.45),transparent 55%)";
      });
      p.addEventListener("pointerleave", () => {
        img.style.transition = "transform .5s cubic-bezier(.2,1.4,.4,1)"; img.style.transform = ""; g.style.opacity = 0;
      });
    });
    const foot = document.querySelector(".foot");
    if (foot) foot.textContent = "Effects inspired by React Bits (reactbits.dev)";
  }

  /* ---------- Noise (paper grain, timeline) ---------- */
  function noise() {
    const c = document.createElement("canvas"); c.width = c.height = 128;
    const x = c.getContext("2d"), d = x.createImageData(128, 128);
    for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
    x.putImageData(d, 0, 0);
    const n = el("div", "fx-noise"); n.style.backgroundImage = "url(" + c.toDataURL() + ")"; document.body.appendChild(n);
    if (!RM) setInterval(() => { n.style.backgroundPosition = (Math.random() * 128 | 0) + "px " + (Math.random() * 128 | 0) + "px"; }, 90);
  }

  /* ---------- Fold Text (timeline titles) ---------- */
  function fold(node) {
    if (!node || RM || node.dataset.folded === node.textContent) return;
    const t = node.textContent;
    node.dataset.folded = t; node.setAttribute("aria-label", t); node.textContent = ""; node.style.perspective = "700px";
    [...t].forEach((ch, i) => {
      const s = document.createElement("span"); s.textContent = ch; s.setAttribute("aria-hidden", "true");
      s.style.cssText = "display:inline-block;white-space:pre;transform-origin:50% 0;backface-visibility:hidden";
      node.appendChild(s);
      s.animate([{ transform: "rotateX(-92deg)", opacity: 0 }, { transform: "rotateX(0)", opacity: 1 }], { duration: 650, delay: i * 45, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" });
    });
  }
  function timelineFx() {
    noise();
    fold(document.querySelector("h1"));
    const slide = document.getElementById("slide");
    if (slide) {
      new MutationObserver(() => fold(slide.querySelector("h2"))).observe(slide, { childList: true, subtree: true });
      fold(slide.querySelector("h2"));
    }
  }

  /* ---------- Star Border (Play tabs) ---------- */
  function star(b) {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("class", "sb-svg"); s.setAttribute("aria-hidden", "true"); s.innerHTML = '<rect pathLength="100"></rect>';
    b.style.position = "relative"; b.appendChild(s);
    const r = s.firstChild;
    const fit = () => {
      const w = b.offsetWidth, h = b.offsetHeight;
      s.setAttribute("viewBox", "0 0 " + w + " " + h);
      r.setAttribute("x", 1); r.setAttribute("y", 1); r.setAttribute("width", w - 2); r.setAttribute("height", h - 2); r.setAttribute("rx", (h - 2) / 2);
    };
    fit(); setTimeout(fit, 400); addEventListener("resize", fit);
  }

  /* ---------- Dark Veil (visualizer background) ---------- */
  function veil() {
    const c = el("canvas", "fx-veil"); c.setAttribute("aria-hidden", "true"); document.body.prepend(c);
    const gl = c.getContext("webgl2");
    if (!gl) { c.remove(); return; }
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, "#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0,1);}"));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, "#version 300 es\nprecision highp float;uniform vec2 R;uniform float T;uniform vec2 M;out vec4 o;" +
      "float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}" +
      "float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}" +
      "float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*n(p);p=p*2.02+7.;a*=.5;}return s;}" +
      "void main(){vec2 u=gl_FragCoord.xy/R;vec2 p=(gl_FragCoord.xy*2.-R)/R.y;p+=(M-.5)*.4;float t=T*.07;" +
      "vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));float f=fbm(p+2.*q+t);float v=smoothstep(.35,.95,f);" +
      "vec3 c=mix(vec3(.02,.02,.07),vec3(.28,.2,.75),v);c+=vec3(.95,.4,.25)*pow(f,6.)*.7;c*=1.-.5*length(u-.5);o=vec4(c,1);}"));
    gl.bindAttribLocation(prog, 0, "p");
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { c.remove(); return; }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, "R"), uT = gl.getUniformLocation(prog, "T"), uM = gl.getUniformLocation(prog, "M");
    let mx = 0.5, my = 0.5;
    addEventListener("pointermove", (e) => { mx = e.clientX / innerWidth; my = 1 - e.clientY / innerHeight; }, { passive: true });
    const size = () => { c.width = Math.max(1, innerWidth * 0.5 | 0); c.height = Math.max(1, innerHeight * 0.5 | 0); gl.viewport(0, 0, c.width, c.height); };
    size(); addEventListener("resize", size);
    const draw = (now) => {
      gl.uniform2f(uR, c.width, c.height); gl.uniform1f(uT, RM ? 0 : now / 1000); gl.uniform2f(uM, mx, my);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!RM && !document.hidden) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
    document.addEventListener("visibilitychange", () => { if (!document.hidden && !RM) requestAnimationFrame(draw); });
  }

  /* ---------- Counter (odometer score on the quiz) ---------- */
  function odo(e, text) {
    const m = /^(\D*)(\d+)(.*)$/.exec(text); if (!m) return;
    const pre = m[1], num = m[2], post = m[3];
    const from = e.__prev && e.__prev.length === num.length ? e.__prev : "0".repeat(num.length);
    e.textContent = ""; e.setAttribute("aria-label", text);
    e.appendChild(document.createTextNode(pre));
    const cols = [...num].map((d, i) => {
      const c = el("span", "odo-c"), s = el("span", "odo-s");
      s.innerHTML = "<i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i>";
      s.style.transition = "none"; s.style.transform = "translateY(-" + from[i] + "em)";
      c.appendChild(s); e.appendChild(c); return s;
    });
    e.appendChild(document.createTextNode(post));
    cols[0] && cols[0].offsetHeight;
    cols.forEach((s, i) => { s.style.transition = ""; requestAnimationFrame(() => { s.style.transform = "translateY(-" + num[i] + "em)"; }); });
    e.__prev = num;
  }
  function counters() {
    ["scoreLive", "final"].forEach((id) => {
      const e = document.getElementById(id); if (!e) return;
      const obs = new MutationObserver(() => { odo(e, e.textContent); obs.takeRecords(); });
      obs.observe(e, { childList: true, characterData: true, subtree: true });
      if (e.textContent) { odo(e, e.textContent); obs.takeRecords(); }
    });
  }

  /* ---------- Start ---------- */
  function init() {
    nav();
    if (page === "index.html") tilt();
    if (page === "timeline.html") timelineFx();
    if (page === "play.html") document.querySelectorAll(".tabs button").forEach(star);
    if (page === "visualizer.html") { veil(); document.querySelector("h1")?.classList.add("gradient-text"); }
    if (page === "quiz.html") counters();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
