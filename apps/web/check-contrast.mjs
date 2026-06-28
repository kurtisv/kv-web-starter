import { chromium } from "@playwright/test";

const DEMOS = ["booking", "saas", "ecommerce", "real-estate", "dashboard", "portfolio", "local-business", "api", "auto-blog"];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const slug of DEMOS) {
  await page.goto(`http://127.0.0.1:3000/demo/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const issues = await page.evaluate(function() {
    function lum(r, g, b) {
      var comps = [r, g, b].map(function(c) {
        var s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * comps[0] + 0.7152 * comps[1] + 0.0722 * comps[2];
    }
    function parseRGB(s) {
      var m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      return m ? [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])] : null;
    }
    function ratio(c1, c2) {
      var L1 = lum(c1[0], c1[1], c1[2]);
      var L2 = lum(c2[0], c2[1], c2[2]);
      var light = Math.max(L1, L2);
      var dark = Math.min(L1, L2);
      return (light + 0.05) / (dark + 0.05);
    }

    var results = [];
    var seen = new Set();
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        var text = (node.textContent || "").trim();
        if (text.length < 4) return NodeFilter.FILTER_SKIP;
        var el = node.parentElement;
        if (!el) return NodeFilter.FILTER_SKIP;
        var tag = el.tagName.toLowerCase();
        if (["script","style","noscript"].indexOf(tag) >= 0) return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var textNode;
    while ((textNode = walker.nextNode())) {
      var el = textNode.parentElement;
      if (seen.has(el)) continue;
      seen.add(el);

      var style = window.getComputedStyle(el);
      var color = style.color;
      var bg = style.backgroundColor;
      if (!color || !bg || bg === "rgba(0, 0, 0, 0)") continue;

      var fgC = parseRGB(color);
      var bgC = parseRGB(bg);
      if (!fgC || !bgC) continue;

      var r = ratio(fgC, bgC);
      if (r < 4.5) {
        results.push({
          tag: el.tagName.toLowerCase(),
          text: (el.textContent || "").trim().slice(0, 60),
          color: color,
          bg: bg,
          contrast: Math.round(r * 10) / 10,
          cls: el.className.toString().slice(0, 100)
        });
      }
    }

    return results.slice(0, 15);
  });

  if (issues.length > 0) {
    console.log("\n=== /demo/" + slug + " ===");
    for (var issue of issues) {
      console.log("  [" + issue.contrast + ":1] <" + issue.tag + "> \"" + issue.text + "\"");
      console.log("         fg:" + issue.color + " | bg:" + issue.bg);
    }
  } else {
    console.log("/demo/" + slug + ": OK");
  }
}

await browser.close();
