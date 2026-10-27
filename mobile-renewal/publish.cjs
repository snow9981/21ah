const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const preview = path.join(__dirname, "site");
const settings = JSON.parse(fs.readFileSync(path.join(__dirname, "publication.json"), "utf8"));
const siteUrl = new URL(settings.siteUrl);
if (siteUrl.protocol !== "https:" || !siteUrl.pathname.endsWith("/")) {
  throw new Error("The public site URL must use HTTPS and end with a slash.");
}

function build(env) {
  const result = spawnSync(process.execPath, [path.join(__dirname, "build.cjs")], {
    cwd: root,
    env: { ...process.env, ...env },
    stdio: "inherit"
  });
  if (result.status !== 0) throw new Error("Website generation failed.");
}

// Publish only generated site files; source photos and local backups stay local.
try {
  build({ SITE_URL: siteUrl.href, INCLUDE_REVIEWS: String(settings.includeReviews) });
  for (const file of ["index.html", "checkup.html", "heart.html", "dental.html", "cat.html", "price.html", "styles.css", "script.js", "sitemap.xml"]) {
    fs.copyFileSync(path.join(preview, file), path.join(root, file));
  }
  fs.mkdirSync(path.join(root, "assets"), { recursive: true });
  for (const file of fs.readdirSync(path.join(preview, "assets"))) {
    if (!settings.includeReviews && file.startsWith("review-")) continue;
    const source = path.join(preview, "assets", file);
    if (fs.statSync(source).isFile()) fs.copyFileSync(source, path.join(root, "assets", file));
  }
  const redirects = {
    "team.html": ["index.html#team", "의료진 소개"],
    "directions.html": ["index.html#visit", "진료시간 및 오시는 길"],
    "philosophy.html": ["index.html#visit", "진료시간 및 오시는 길"],
    "facilities.html": ["index.html#cat-space", "병원 공간 안내"],
    "equipment.html": ["heart.html", "영상진료 안내"],
    "care.html": ["index.html#care", "진료 안내"]
  };
  for (const [file, [target, title]] of Object.entries(redirects)) {
    const canonical = new URL(target, siteUrl);
    canonical.hash = "";
    fs.writeFileSync(path.join(root, file), `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="${canonical.href}"><title>${title} | 스물하나 동물병원</title></head><body><p><a href="${target}">${title} 바로가기</a></p></body></html>`);
  }
  console.log(`Prepared public website: ${siteUrl.href}`);
} finally {
  // Keep the separately accessible design preview out of search results.
  build({ SITE_URL: "", INCLUDE_REVIEWS: "true" });
}
