const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8080;

http
  .createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    let filePath = req.url === "/" ? "index.html" : req.url.slice(1);

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      ".html": "text/html",
      ".js": "application/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".wav": "audio/wav",
      ".mp4": "video/mp4",
      ".woff": "application/font-woff",
      ".ttf": "application/font-ttf",
      ".eot": "application/vnd.ms-fontobject",
      ".otf": "application/font-otf",
      ".wasm": "application/wasm",
    };

    const contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === "ENOENT") {
          fs.readFile("404.html", (err, content404) => {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content404, "utf-8");
          });
        } else {
          res.writeHead(500);
          res.end(`Sorry, an error occurred: ${error.code}`);
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    });
  })
  .listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
