import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve("apps/web/.env.demo.local.example");
const target = resolve("apps/web/.env.local");

if (!existsSync(source)) {
  console.error(`Missing demo env template: ${source}`);
  process.exit(1);
}

copyFileSync(source, target);
console.log("Copied apps/web/.env.demo.local.example to apps/web/.env.local");
