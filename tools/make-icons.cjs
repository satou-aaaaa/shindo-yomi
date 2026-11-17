// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、地震計の揺れの波と目盛り。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <g stroke="#fffdf7" stroke-opacity=".25" stroke-width="1.5"><line x1="10" y1="30" x2="90" y2="30"/><line x1="10" y1="70" x2="90" y2="70"/></g>
      <polyline points="8,50 22,50 27,42 32,58 37,26 43,76 49,18 55,82 61,32 66,64 71,44 76,54 81,50 92,50" fill="none" stroke="#f6d77a" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
