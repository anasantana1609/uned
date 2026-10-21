import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/preliminary",
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:4174",
    trace: "retain-on-failure",
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "npm run serve:demo",
    url: "http://127.0.0.1:4174/uned/",
    env: { PORT: "4174" },
    reuseExistingServer: false,
  },
});
