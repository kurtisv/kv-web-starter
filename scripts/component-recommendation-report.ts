import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  generateComponentRecommendationReport,
} from "../apps/web/src/lib/component-registry/recommendation-policy";
import type { ComponentDomain } from "../apps/web/src/lib/component-registry/types";

const domain = process.argv[2] as ComponentDomain | undefined;

if (!domain) {
  console.error("Usage: pnpm registry:recommend <domain>");
  process.exit(1);
}

const report = generateComponentRecommendationReport(domain);

function list(items: string[]): string {
  return items.length > 0 ? items.map((item) => `- ${item}`).join("\n") : "- None";
}

const markdown = `# Component Recommendation Report ${domain}

## Domain

${domain}

## Recommended

${list(report.recommended.map((component) => `${component.name} (${component.id}) - ${component.importPath}`))}

## Acceptable

${list(report.acceptable.map((component) => `${component.name} (${component.id}) - ${component.maturity}`))}

## Avoid

${list(report.avoid.map((item) => `${item.component.name} (${item.component.id}) - ${item.reason}`))}

## Gaps

${list(report.gaps)}

## Warnings

${list(report.warnings)}

## Components With Variables

${list(report.componentsWithVariables.map((component) => `${component.name} - ${component.compatibleVariables.join(", ")}`))}

## Demo-Only Components

${list(report.demoOnly.map((component) => `${component.name} (${component.id})`))}

## Next Action

${report.nextAction}
`;

const outDir = resolve("artifacts/component-recommendations");
mkdirSync(outDir, { recursive: true });
const outFile = resolve(outDir, `${domain}.md`);
writeFileSync(outFile, markdown);

console.log(markdown);
console.log(`Wrote ${outFile}`);
