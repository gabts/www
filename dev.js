const fs = require("fs");
const http = require("http");
const { render } = require("./framework");

(async function () {
  /**
   * @type {http.ServerResponse[]}
   */
  const clients = [];

  fs.watch("./templates", {}, function () {
    clients.forEach((client) => client.write("data: update\n\n"));
    clients.length = 0;
  });

  const refreshServer = http.createServer(function (req, res) {
    if (req.url === "/") {
      const html = render("./templates/index.html");
      const bodyClosingTagIndex = html.indexOf("</body>");
      const updatedHtml =
        html.substring(0, bodyClosingTagIndex) +
        '<script>"use strict";(() => new EventSource("/reload").onmessage = ' +
        "() => location.reload())();</script>" +
        html.substring(bodyClosingTagIndex);

      res.writeHead(200);
      res.end(updatedHtml);
      return;
    }

    try {
      const data = fs.readFileSync("public" + req.url);
      res.writeHead(200);
      res.end(data);
    } catch (error) {
      console.error(error);
      res.writeHead(500);
      res.end();
    }
  });

  const listener = refreshServer.listen();
  const address = listener.address();
  if (typeof address === "string") throw new Error("unexpected address type");

  const server = http.createServer(function (req, res) {
    if (req.url === "/reload") {
      return clients.push(
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        })
      );
    }
    req.pipe(
      http.request(
        {
          headers: req.headers,
          hostname: "localhost",
          method: req.method,
          path: req.url,
          port: address.port,
        },
        function (proxy) {
          res.writeHead(proxy.statusCode, proxy.headers);
          proxy.pipe(res, { end: true });
        }
      ),
      { end: true }
    );
  });

  const port = 3000;
  server.listen(port);
  console.log(`🚀 development server running @ http://localhost:${port}`);
})();
