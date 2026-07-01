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

const markdown = `# Component Recommendation Report — ${domain}

## Summary

Recommended: ${report.recommended.length}
Acceptable: ${report.acceptable.length}
Avoid: ${report.avoid.length}
Gaps: ${report.gaps.length}

## Use First

These components are production-ready or stable and designed for the \`${domain}\` domain.
Use them without custom work.

${list(report.recommended.map((c) => `**${c.name}** (\`${c.id}\`) — ${c.description} | \`${c.importPath}\` | maturity: ${c.maturity}`))}

## Acceptable With Adaptation

These components can be used for \`${domain}\` but may require domain-specific adjustments.
General-purpose components or beta-maturity domain components.

${list(report.acceptable.map((c) => `${c.name} (\`${c.id}\`) — ${c.maturity} — ${c.description}`))}

## Do Not Use By Default

${list(report.avoid.map((item) => `${item.component.name} (\`${item.component.id}\`) — ${item.reason}`))}

## Gaps Before Custom Work

Document these gaps before creating new components. A gap means no recommended component
covers this category for the \`${domain}\` domain.

${list(report.gaps)}

## Components With Variables

${list(report.componentsWithVariables.map((c) => `${c.name} — variables: ${c.compatibleVariables.join(", ")}`))}

## Demo-Only Components

${list(report.demoOnly.map((c) => `${c.name} (\`${c.id}\`) — requires adaptation before client delivery`))}

## Warnings

${list(report.warnings)}

## Agent Decision

${report.nextAction}

Workflow: use recommended first -> acceptable with adaptation -> document gap -> custom component.
Do NOT create a custom component when a recommended component exists.
`;

const outDir = resolve("artifacts/component-recommendations");
mkdirSync(outDir, { recursive: true });
const outFile = resolve(outDir, `${domain}.md`);
writeFileSync(outFile, markdown);

console.log(markdown);
console.log(`Wrote ${outFile}`);
