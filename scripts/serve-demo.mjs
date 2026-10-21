// Local verification of the exact exported artifact at the GitHub Pages base path.
import http from "node:http";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const root = path.resolve(
  fileURLToPath(new URL("../demo/out/", import.meta.url)),
);
const prefix = "/uned";
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
};
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (pathname === prefix) {
      res.writeHead(308, { Location: prefix + "/" });
      res.end();
      return;
    }
    if (!pathname.startsWith(prefix + "/")) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    let filename = path.resolve(root, "." + pathname.slice(prefix.length));
    if (filename !== root && !filename.startsWith(root + path.sep)) {
      res.writeHead(404);
      res.end();
      return;
    }
    if ((await stat(filename)).isDirectory())
      filename = path.join(filename, "index.html");
    const content = await readFile(filename);
    res.writeHead(200, {
      "Content-Type":
        mime[path.extname(filename)] ?? "application/octet-stream",
    });
    res.end(req.method === "HEAD" ? undefined : content);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(
      await readFile(path.join(root, "404.html")).catch(() => "Not found"),
    );
  }
});
server.listen(Number(process.env.PORT ?? 4173), "127.0.0.1", () =>
  console.log(
    "Demo export available for local validation on port " +
      (process.env.PORT ?? 4173),
  ),
);
