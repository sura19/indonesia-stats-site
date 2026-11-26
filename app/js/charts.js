// Canvas charts with no libraries: bar, line and donut. Every chart draws
// from plain arrays of {label, value} and sizes itself to its canvas.

const INK = "#14213d";
const MUTED = "#6b7280";
const RED = "#c8102e";
const NAVY = "#1e3a5f";
const TEAL = "#0e7c6b";
const AMBER = "#b7791f";
const GRID = "#e5e0d8";

function setup(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.height = height + "px";
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.font = "12px system-ui, -apple-system, sans-serif";
  return { ctx, w, h: height };
}

function axes(ctx, w, h, pad, maxV, ticks) {
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.lineWidth = 1;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let i = 0; i <= ticks; i++) {
    const v = (maxV * i) / ticks;
    const y = pad.top + (h - pad.top - pad.bottom) * (1 - i / ticks);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
    ctx.fillText(v.toFixed(v < 10 ? 1 : 0), pad.left - 8, y);
  }
}

export function drawBarChart(canvas, data, opts) {
  const { unit = "", color = NAVY, height = 220, highlightLast = false } = opts || {};
  const { ctx, w, h } = setup(canvas, height);
  const pad = { top: 14, right: 12, bottom: 28, left: 44 };
  const maxV = Math.max(...data.map((d) => d.value)) * 1.15;
  axes(ctx, w, h, pad, maxV, 4);
  const slot = (w - pad.left - pad.right) / data.length;
  const barW = Math.min(46, slot * 0.62);
  ctx.textAlign = "center";
  data.forEach((d, i) => {
    const x = pad.left + slot * i + (slot - barW) / 2;
    const bh = ((h - pad.top - pad.bottom) * d.value) / maxV;
    const y = h - pad.bottom - bh;
    ctx.fillStyle = highlightLast && i === data.length - 1 ? RED : color;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, bh, [4, 4, 0, 0]);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = "bold 12px system-ui, -apple-system, sans-serif";
    ctx.fillText(d.value.toFixed(2).replace(/\.00$/, "") + unit, x + barW / 2, y - 8);
    ctx.font = "12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = MUTED;
    ctx.fillText(d.label, x + barW / 2, h - pad.bottom + 16);
  });
}

export function drawLineChart(canvas, data, opts) {
  const { unit = "", color = RED, height = 220, fill = true } = opts || {};
  const { ctx, w, h } = setup(canvas, height);
  const pad = { top: 16, right: 16, bottom: 28, left: 48 };
  const values = data.map((d) => d.value);
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const span = Math.max(maxV - minV, 0.001);
  const lo = minV - span * 0.25;
  const hi = maxV + span * 0.25;
  axes(ctx, w, h, pad, hi, 4);
  const xs = data.map((_, i) => pad.left + ((w - pad.left - pad.right) * i) / (data.length - 1));
  const ys = values.map((v) => pad.top + ((h - pad.top - pad.bottom) * (hi - v)) / (hi - lo));
  if (fill) {
    ctx.beginPath();
    ctx.moveTo(xs[0], h - pad.bottom);
    xs.forEach((x, i) => ctx.lineTo(x, ys[i]));
    ctx.lineTo(xs[xs.length - 1], h - pad.bottom);
    ctx.closePath();
    ctx.fillStyle = "rgba(200,16,46,0.08)";
    ctx.fill();
  }
  ctx.beginPath();
  xs.forEach((x, i) => (i === 0 ? ctx.moveTo(x, ys[i]) : ctx.lineTo(x, ys[i])));
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.textAlign = "center";
  data.forEach((d, i) => {
    ctx.beginPath();
    ctx.arc(xs[i], ys[i], 4, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = INK;
    ctx.font = "bold 12px system-ui, -apple-system, sans-serif";
    ctx.fillText(d.value.toFixed(2).replace(/\.00$/, "") + unit, xs[i], ys[i] - 12);
    ctx.font = "12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = MUTED;
    ctx.fillText(d.label, xs[i], h - pad.bottom + 16);
  });
}

export function drawDonut(canvas, data, opts) {
  const { height = 220, colors = [NAVY, RED, TEAL, AMBER, "#7c6aa8", "#8a8f98"], centerTop = null, centerSub = "share of GDP" } = opts || {};
  // Wide canvas: legend beside the ring. Narrow canvas (phones): legend
  // below the ring, with a taller canvas so nothing is clipped.
  const probeW = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
  const side = probeW >= 420;
  const tall = side ? height : 178 + data.length * 22 + 8;
  const { ctx, w, h } = setup(canvas, tall);
  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = side ? 92 : w / 2;
  const cy = side ? h / 2 : 82;
  const r = Math.min(78, (side ? h : 150) / 2 - 12);
  let a = -Math.PI / 2;
  data.forEach((d, i) => {
    const sweep = (d.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, a, a + sweep);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    a += sweep;
  });
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.58, 0, Math.PI * 2);
  ctx.fillStyle = "#fffdf8";
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = "bold 15px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(centerTop || data.length + " sectors", cx, cy - 8);
  ctx.font = "12px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = MUTED;
  ctx.fillText(centerSub, cx, cy + 10);
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  if (side) {
    let ly = 18;
    data.forEach((d, i) => {
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(196, ly - 5, 10, 10);
      ctx.fillStyle = INK;
      ctx.font = "12px system-ui, -apple-system, sans-serif";
      ctx.fillText(d.label + " — " + d.value.toFixed(2).replace(/\.00$/, "") + "%", 212, ly);
      ly += 24;
    });
  } else {
    let ly = cy + r + 22;
    data.forEach((d, i) => {
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(16, ly - 5, 10, 10);
      ctx.fillStyle = INK;
      ctx.font = "12px system-ui, -apple-system, sans-serif";
      ctx.fillText(d.label + " — " + d.value.toFixed(2).replace(/\.00$/, "") + "%", 32, ly);
      ly += 22;
    });
  }
}
