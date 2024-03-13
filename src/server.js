import { createServer } from "node:http";
import { createReadStream, readFile } from "node:fs";
import { resolve } from "node:path";
import {} from "node:readline";

createServer((req, res) => {
  if (req.url.includes("script1.js")) {
    responseScript1(res);
  } else if (req.url.includes("script2.js")) {
    responseScript2(res);
  } else {
    responseIndexHtml(res);
  }
}).listen("8000", () => {
  console.log("server runnning on http://localohost:8000");
});

function responseIndexHtml(res) {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  readFile(resolve(import.meta.dirname, "index.html"), (err, data) => {
    const fileLines = data.toString().split("\n");
    let currentIndex = 0;

    const writeLine = () => {
      if (currentIndex === fileLines.length - 1) {
        res.end(fileLines[currentIndex] + "\n");
      } else {
        res.write(fileLines[currentIndex] + "\n");
        setTimeout(() => {
          writeLine();
        }, 1000);
        currentIndex++;
      }
    };
    writeLine();
  });
}

function responseScript2(res) {
  setTimeout(() => {
    res.writeHead(200, {
      "Content-Type": "application/javascript",
    });
    createReadStream(resolve(import.meta.dirname, "script2.js")).pipe(res);
  }, 3000);
}

function responseScript1(res) {
  setTimeout(() => {
    res.writeHead(200, {
      "Content-Type": "application/javascript",
    });
    createReadStream(resolve(import.meta.dirname, "script1.js")).pipe(res);
  }, 5000);
}
