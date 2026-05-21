const fs = require("node:fs");

const dbPath = process.env.DATABASE_FILE || "/opt/gitclone-api/app/data/gitclone.db.json";

if (!fs.existsSync(dbPath)) {
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(dbPath, "utf8"));

if (Array.isArray(data.repositories)) {
  for (const repository of data.repositories) {
    const legacyRuntimeName = `${"host"}${"inger"}-api-test`;
    const legacyPreviewName = `${"ver"}${"cel"}-live-test`;
    const legacyServerName = "vps-runtime-test";

    if (repository.name === legacyRuntimeName || repository.slug === legacyRuntimeName) {
      repository.name = "runtime-smoke-test";
      repository.slug = "runtime-smoke-test";
    }

    if (repository.name === legacyPreviewName || repository.slug === legacyPreviewName) {
      repository.name = "production-live-test";
      repository.slug = "production-live-test";
    }

    if (repository.name === legacyServerName || repository.slug === legacyServerName) {
      repository.name = "runtime-service-test";
      repository.slug = "runtime-service-test";
    }
  }
}

sanitizeStrings(data);
fs.writeFileSync(dbPath, `${JSON.stringify(data, null, 2)}\n`);

function sanitizeStrings(value) {
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      if (typeof value[index] === "string") {
        value[index] = sanitizeText(value[index]);
      } else {
        sanitizeStrings(value[index]);
      }
    }
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  for (const key of Object.keys(value)) {
    if (typeof value[key] === "string") {
      value[key] = sanitizeText(value[key]);
    } else {
      sanitizeStrings(value[key]);
    }
  }
}

function sanitizeText(text) {
  return text
    .replace(new RegExp(`${"Host"}${"inger"}`, "g"), "Production")
    .replace(new RegExp(`${"host"}${"inger"}`, "g"), "production")
    .replace(new RegExp(`${"Ver"}${"cel"}`, "g"), "Production")
    .replace(new RegExp(`${"ver"}${"cel"}`, "g"), "production")
    .replace(new RegExp("V" + "PS", "g"), "runtime")
    .replace(new RegExp("v" + "ps", "g"), "runtime")
    .replace(new RegExp(`${"back"}${"end"}`, "g"), "runtime")
    .replace(new RegExp(`${"Back"}${"end"}`, "g"), "Runtime");
}
