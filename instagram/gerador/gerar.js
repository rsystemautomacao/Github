// Gera as imagens dos carrosséis (PNG 1080x1350), os Reels (MP4 1080x1920)
// e as legendas (legenda.txt) a partir de conteudo.js.
//
// Uso:
//   node gerar.js              -> gera tudo
//   node gerar.js 03 07        -> gera só os posts cujo id começa com 03 ou 07
//   node gerar.js --sem-video  -> pula a renderização dos vídeos (só capa + legenda)
//
// Requisitos: Node 18+, `npm install` nesta pasta, Chromium do Playwright
// (`npx playwright install chromium`) e ffmpeg no PATH.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');
const { series, posts } = require('./conteudo');

// Opcional: seu @ aparece no rodapé das imagens e dos vídeos.
const PERFIL = process.env.PERFIL || '';

const FPS = 30;
const SAIDA = path.join(__dirname, '..', 'posts');
const FORMATOS = {
  reel: { w: 1080, h: 1920, pad: '250px 84px 430px' },
  carrossel: { w: 1080, h: 1350, pad: '110px 84px 150px' },
};

// ───────────────────────────── utilidades de texto ─────────────────────────────

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/R\$ /g, () => 'R$&nbsp;');
const palavras = (s) => (s ? String(s).split(/\s+/).length : 0);

function highlight(linha) {
  const re = /(#.*$)|(f?"[^"]*")|(\b(?:if|elif|else|while|for|in|def|return|class|True|False|None|and|or|not)\b)|(\b(?:self|print)\b)|(\b\d+\b)|(\b[A-Za-z_]\w*(?=\())/g;
  let out = '';
  let last = 0;
  let m;
  while ((m = re.exec(linha))) {
    out += esc(linha.slice(last, m.index));
    const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : m[4] ? 'b' : m[5] ? 'n' : 'f';
    out += `<span class="${cls}">${esc(m[0])}</span>`;
    last = re.lastIndex;
  }
  return out + esc(linha.slice(last)) || '&nbsp;';
}

// ───────────────────────────── montagem de uma cena/slide ─────────────────────────────

// Retorna { html, fim } onde fim é o instante (s, relativo à cena) em que o último elemento aparece.
// Com `t0 === null` nada é animado (usado nos carrosséis e nas capas).
// `gancho` (1ª cena): selo e frase já estão na tela no frame 0, que vira a miniatura no feed;
// só o emoji entra animado.
function cenaHTML(c, fmt, t0, gancho = false) {
  const animar = t0 !== null;
  const ritmo = gancho ? 0.3 : 1;
  let t = gancho ? 0 : 0.1;
  const anim = (nome, dur, extra = '') => (animar ? `style="animation:${nome} ${dur}s cubic-bezier(.2,.8,.2,1) ${(t0 + t).toFixed(2)}s both${extra}"` : '');
  const animFixo = gancho ? () => '' : anim;
  const partes = [];
  const contentW = FORMATOS[fmt].w - 168;

  if (c.kicker) {
    partes.push(`<div class="kicker" ${animFixo('up', 0.5)}>${esc(c.kicker)}</div>`);
    t += 0.15 * ritmo;
  }
  if (c.emoji) {
    const flutua = animar ? `, float 3.2s ease-in-out ${(t0 + t + 0.7).toFixed(2)}s infinite` : '';
    partes.push(`<div class="emoji" ${anim('pop', 0.7, flutua)}>${c.emoji}</div>`);
    t += 0.3 * ritmo;
  }
  if (c.title) {
    partes.push(`<div class="title" ${animFixo('up', 0.6)}>${rich(c.title)}</div>`);
    t += 0.35 + palavras(c.title) * 0.1;
  }
  const blocoTexto = () => {
    partes.push(`<div class="text" ${anim('up', 0.6)}>${rich(c.text)}</div>`);
    t += 0.3 + palavras(c.text) * 0.13;
  };
  // Com código ou gráfico, o texto vira conclusão e vai depois, a menos que haja emoji
  // (aí ele explica a ideia antes do código) ou que a cena peça `textoAntes`.
  const textoDepois = c.text && (c.code || c.chart) && !c.emoji && !c.textoAntes;
  if (c.text && !textoDepois) blocoTexto();

  if (c.code) {
    const maior = Math.max(...c.code.map((l) => l.length));
    const fs = Math.min(fmt === 'reel' ? 40 : 36, Math.floor((contentW - 84) / (maior * 0.61)));
    const linhas = c.code
      .map((l) => {
        const s = `<span class="ln" ${anim('right', 0.45)}>${highlight(l)}</span>`;
        t += l.trim() ? 0.32 : 0.05;
        return s;
      })
      .join('');
    partes.push(`<div class="code" style="font-size:${fs}px"><div class="dots"><i></i><i></i><i></i></div>${linhas}</div>`);
    t += 0.4;
  }
  if (c.rows) {
    const linhas = c.rows
      .map(([a, b]) => {
        const s = `<div class="row" ${anim('up', 0.5)}><div class="ra">${rich(a)}</div><div class="rb">${rich(b)}</div></div>`;
        t += 0.35 + palavras(a + ' ' + b) * 0.12;
        return s;
      })
      .join('');
    // a coluna com textos mais longos ganha mais espaço
    const larg = (k) => Math.max(...c.rows.map((r) => r[k].length));
    const cols = larg(0) > larg(1) ? '1.2fr .8fr' : '.9fr 1.1fr';
    partes.push(`<div class="rows" style="--cols:${cols}">${linhas}</div>`);
  }
  if (c.bullets) {
    const itens = c.bullets
      .map((b) => {
        const s = `<div class="bullet" ${anim('right', 0.5)}><span class="chk">✓</span><span>${rich(b)}</span></div>`;
        t += 0.35 + palavras(b) * 0.14;
        return s;
      })
      .join('');
    partes.push(`<div class="bullets">${itens}</div>`);
  }
  if (c.chart) {
    const { labels, values, highlight: hl = [], prefix = '' } = c.chart;
    const max = Math.max(...values);
    const barras = values
      .map((v, i) => {
        const h = Math.round((v / max) * 100);
        const st = animar ? `animation:grow .7s cubic-bezier(.2,.8,.2,1) ${(t0 + t).toFixed(2)}s both;` : '';
        const lb = animar ? `style="animation:up .4s ease ${(t0 + t + 0.45).toFixed(2)}s both"` : '';
        t += 0.3;
        return `<div class="bar ${hl.includes(i) ? 'hl' : ''}"><span class="val" ${lb}>${esc(prefix + v.toLocaleString('pt-BR'))}</span><div class="fill" style="height:${h}%;${st}"></div><span class="lbl">${esc(labels[i])}</span></div>`;
      })
      .join('');
    partes.push(`<div class="chart">${barras}</div>`);
    t += 0.5;
  }
  if (c.text && textoDepois) blocoTexto();

  return { html: partes.join('\n'), fim: t };
}

// ───────────────────────────── página HTML ─────────────────────────────

function paginaHTML({ fmt, cor, corpo, rodape = '', extraCSS = '' }) {
  const { w, h, pad } = FORMATOS[fmt];
  const reel = fmt === 'reel';
  return `<!doctype html><html><head><meta charset="utf-8"><style>
:root{--bg:#0c0f1e;--fg:#f4f5fa;--mut:#b4b9d3;--acc:${cor};--card:#151a30;--line:rgba(255,255,255,.08)}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${w}px;height:${h}px;overflow:hidden;background:var(--bg)}
body{font-family:Inter,'Noto Color Emoji',sans-serif;color:var(--fg);position:relative}
.bg{position:absolute;inset:0;
  background:
    radial-gradient(900px 700px at 100% 0%, color-mix(in srgb,var(--acc) 26%,transparent), transparent 70%),
    radial-gradient(800px 700px at 0% 100%, color-mix(in srgb,var(--acc) 12%,transparent), transparent 70%),
    linear-gradient(var(--line) 1px,transparent 1px) 0 0/60px 60px,
    linear-gradient(90deg,var(--line) 1px,transparent 1px) 0 0/60px 60px,
    var(--bg);
}
.cena{position:absolute;inset:0;padding:${pad};display:flex;flex-direction:column;justify-content:center;gap:${reel ? 40 : 34}px}
.kicker{align-self:flex-start;font-weight:800;letter-spacing:.14em;font-size:28px;color:#0c0f1e;background:var(--acc);padding:12px 24px;border-radius:999px}
.emoji{font-family:'Noto Color Emoji';font-size:${reel ? 190 : 150}px;line-height:1;align-self:flex-start;filter:drop-shadow(0 18px 40px rgba(0,0,0,.45))}
.title{font-family:'Inter Display',Inter,'Noto Color Emoji';font-weight:800;font-size:${reel ? 86 : 74}px;line-height:1.07;letter-spacing:-.025em;text-wrap:balance}
.title b,.text b,.rb b,.bullet b{color:var(--acc);font-weight:800}
.text{font-size:${reel ? 46 : 42}px;line-height:1.35;color:var(--mut);font-weight:500;text-wrap:pretty}
.code{background:#080a15;border:2px solid var(--line);border-radius:28px;padding:30px 40px 34px;font-family:'DejaVu Sans Mono','Noto Color Emoji',monospace;line-height:1.6;box-shadow:0 30px 80px rgba(0,0,0,.4)}
.code .dots{display:flex;gap:12px;margin-bottom:20px}
.code .dots i{width:18px;height:18px;border-radius:50%;background:#ff5f57}
.code .dots i:nth-child(2){background:#febc2e}.code .dots i:nth-child(3){background:#28c840}
.ln{display:block;white-space:pre;color:#e6e8f2}
.k{color:#ff79c6;font-weight:bold}.s{color:#a5e88a}.c{color:#7c84a8;font-style:italic}.n{color:#ffb86c}.f{color:#7dd3fc}.b{color:#c4a7ff}
.rows{display:flex;flex-direction:column;gap:18px}
.row{display:grid;grid-template-columns:var(--cols);gap:24px;align-items:center;background:var(--card);border:2px solid var(--line);border-left:8px solid var(--acc);border-radius:22px;padding:26px 30px}
.ra{font-weight:800;font-size:${reel ? 40 : 36}px;line-height:1.2}
.rb{font-size:${reel ? 38 : 34}px;color:var(--mut);line-height:1.3}
.bullets{display:flex;flex-direction:column;gap:22px}
.bullet{display:flex;gap:24px;align-items:center;font-size:${reel ? 48 : 42}px;font-weight:600;line-height:1.25}
.chk{flex:none;width:64px;height:64px;border-radius:50%;background:var(--acc);color:#0c0f1e;display:grid;place-items:center;font-size:36px;font-weight:900}
.chart{display:flex;align-items:flex-end;gap:20px;height:620px;padding:24px 28px 0;background:var(--card);border:2px solid var(--line);border-radius:28px}
.bar{flex:1;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:12px;padding-bottom:20px}
.fill{width:100%;border-radius:14px 14px 4px 4px;background:#3a4166;transform-origin:bottom}
.bar.hl .fill{background:var(--acc)}
.val{font-size:25px;font-weight:700;color:var(--mut);white-space:nowrap}
.bar.hl .val{color:var(--acc);font-size:28px}
.lbl{font-size:28px;font-weight:800;color:var(--mut)}
.rodape{position:absolute;left:84px;right:84px;bottom:${reel ? 330 : 56}px;display:flex;justify-content:space-between;align-items:center;font-size:28px;font-weight:700;color:var(--mut)}
.rodape .pag{color:var(--acc)}
.serie{position:absolute;left:84px;top:${reel ? 190 : 56}px;font-size:24px;letter-spacing:.18em;font-weight:800;color:var(--mut);opacity:.85}
.cena.capa .title{font-size:${reel ? 100 : 96}px}
.cena.capa .emoji{font-size:${reel ? 230 : 200}px}
.barra{position:absolute;left:0;top:0;height:12px;background:var(--acc);width:100%;transform-origin:left}
@keyframes up{from{opacity:0;transform:translateY(46px)}to{opacity:1;transform:none}}
@keyframes right{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:none}}
@keyframes pop{0%{opacity:0;transform:scale(.2) rotate(-14deg)}65%{opacity:1;transform:scale(1.12) rotate(5deg)}100%{opacity:1;transform:none}}
@keyframes float{0%,100%{transform:none}50%{transform:translateY(-18px) rotate(-3deg)}}
@keyframes grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes entra{from{opacity:0;transform:translateY(60px)}to{opacity:1;transform:none}}
@keyframes sai{from{opacity:1;transform:none}to{opacity:0;transform:translateY(-60px)}}
@keyframes progresso{from{transform:scaleX(0)}to{transform:scaleX(1)}}
${extraCSS}
</style></head><body><div class="bg"></div>${corpo}${rodape}</body></html>`;
}

// ───────────────────────────── carrossel ─────────────────────────────

async function gerarCarrossel(page, post, dir) {
  const s = series[post.serie];
  const total = post.slides.length;
  for (let i = 0; i < total; i++) {
    const { html } = cenaHTML(post.slides[i], 'carrossel', null);
    const seta = i === 0 ? 'ARRASTA →' : i === total - 1 ? '' : '→';
    const rodape = `<div class="rodape"><span>${esc(PERFIL)}</span><span class="pag">${i + 1}/${total} ${seta}</span></div>`;
    const topo = i === 0 || post.slides[i].kicker ? '' : `<div class="serie">${esc(s.nome)}</div>`;
    await page.setContent(paginaHTML({ fmt: 'carrossel', cor: s.cor, corpo: `${topo}<div class="cena${i === 0 ? ' capa' : ''}">${html}</div>`, rodape }));
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(dir, `slide-${String(i + 1).padStart(2, '0')}.png`) });
  }
  console.log(`  ✓ ${total} slides`);
}

// ───────────────────────────── reel ─────────────────────────────

function montarReel(post) {
  const s = series[post.serie];
  const TRANS = 0.4;
  let inicio = 0;
  const cenas = post.cenas.map((c, i) => {
    const ultima = i === post.cenas.length - 1;
    const { html, fim } = cenaHTML(c, 'reel', inicio, i === 0);
    // tempo de leitura depois que o último elemento aparece
    const dur = c.dur || Math.max(2.8, +(fim + 1.2 + (ultima ? 1.2 : 0)).toFixed(2));
    const bloco = { html, ini: inicio, fim: inicio + dur };
    // a próxima cena entra enquanto esta sai (sem quadro vazio entre elas)
    inicio += ultima ? dur : dur - TRANS;
    return bloco;
  });
  const total = cenas[cenas.length - 1].fim;
  const corpo = cenas
    .map((c, i) => {
      const ultima = i === cenas.length - 1;
      const entra = i === 0 ? '' : `entra ${TRANS}s ease-out ${c.ini.toFixed(2)}s both`;
      const sai = ultima ? '' : `sai ${TRANS}s ease-in ${(c.fim - TRANS).toFixed(2)}s forwards`;
      const a = [entra, sai].filter(Boolean).join(', ');
      return `<div class="cena${i === 0 ? ' capa' : ''}" ${a ? `style="animation:${a}"` : ''}>${c.html}</div>`;
    })
    .join('\n');
  const barra = `<div class="barra" style="animation:progresso ${total.toFixed(2)}s linear 0s both"></div>`;
  const topo = `<div class="serie">${esc(s.nome)}</div>`;
  const rodape = PERFIL ? `<div class="rodape"><span>${esc(PERFIL)}</span><span></span></div>` : '';
  return { html: paginaHTML({ fmt: 'reel', cor: s.cor, corpo: barra + topo + corpo, rodape }), total };
}

async function gerarReel(page, post, dir, comVideo) {
  const s = series[post.serie];
  // Capa (primeira cena estática): use como "capa do Reel" ao publicar.
  const { html: capa } = cenaHTML(post.cenas[0], 'reel', null);
  await page.setContent(paginaHTML({ fmt: 'reel', cor: s.cor, corpo: `<div class="serie">${esc(s.nome)}</div><div class="cena capa">${capa}</div>` }));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(dir, 'capa.png') });
  if (!comVideo) return;

  const { html, total } = montarReel(post);
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  const frames = Math.ceil(total * FPS);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'reel-'));
  for (let f = 0; f < frames; f++) {
    const ms = (f / FPS) * 1000;
    await page.evaluate((ms) => {
      for (const a of document.getAnimations()) {
        a.pause();
        a.currentTime = ms;
      }
    }, ms);
    await page.screenshot({ path: path.join(tmp, `f${String(f).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 92 });
  }
  const mp4 = path.join(dir, 'reel.mp4');
  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(tmp, 'f%05d.jpg'),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4,
  ]);
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`  ✓ reel.mp4 (${total.toFixed(1)}s, ${frames} frames)`);
}

// ───────────────────────────── legenda ─────────────────────────────

function escreverLegenda(post, dir) {
  const txt = [
    `POST ${post.id}`,
    `Formato: ${post.tipo === 'reel' ? 'Reels (1080x1920)' : `Carrossel (${post.slides.length} imagens 1080x1350)`}`,
    `Publicar: ${post.data}`,
    '',
    '──────── LEGENDA (copie daqui) ────────',
    '',
    post.legenda,
    '',
    post.hashtags.join(' '),
    '',
    '──────── TEXTO ALTERNATIVO ────────',
    '(Configurações avançadas → Acessibilidade → Escrever texto alternativo)',
    '',
    post.alt,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(dir, 'legenda.txt'), txt);
}

// ───────────────────────────── main ─────────────────────────────

(async () => {
  const args = process.argv.slice(2);
  const comVideo = !args.includes('--sem-video');
  const filtros = args.filter((a) => !a.startsWith('--'));
  const lista = posts.filter((p) => !filtros.length || filtros.some((f) => p.id.startsWith(f)));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  for (const post of lista) {
    console.log(`→ ${post.id}`);
    const dir = path.join(SAIDA, post.id);
    fs.mkdirSync(dir, { recursive: true });
    escreverLegenda(post, dir);
    if (post.tipo === 'carrossel') {
      await page.setViewportSize({ width: 1080, height: 1350 });
      await gerarCarrossel(page, post, dir);
    } else {
      await page.setViewportSize({ width: 1080, height: 1920 });
      await gerarReel(page, post, dir, comVideo);
    }
  }
  await browser.close();
})();
