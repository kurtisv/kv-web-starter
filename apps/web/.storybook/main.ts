import path from "path";
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "next/image": path.resolve(__dirname, "./mocks/next-image.tsx"),
      "next/link": path.resolve(__dirname, "./mocks/next-link.tsx"),
      "next/navigation": path.resolve(__dirname, "../src/__mocks__/next-navigation.ts"),
      "next/headers": path.resolve(__dirname, "../src/__mocks__/next-headers.ts"),
      "@": path.resolve(__dirname, "../src"),
    };

    config.module = config.module ?? { rules: [] };
    config.module.rules = [
      ...(config.module.rules ?? []).filter((r: any) => {
        const t = r?.test?.toString() ?? "";
        return !t.includes("tsx?") && !t.includes("ts|tsx");
      }),
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              presets: [
                ["@babel/preset-env", { targets: { node: "current" } }],
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
    ];

    return config;
  },
};

export default config;
