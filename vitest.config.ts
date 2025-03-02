import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      all: true,
      include: ["src"],
      provider: "v8",
      reporter: ["html", "json", "json-summary", "text"],
      reportOnFailure: true,
    },
    reporters: process.env.GITHUB_ACTIONS
      ? [
          [
            "default",
            {
              summary: false,
            },
          ],
          "github-actions",
        ]
      : ["default"],
  },
});
