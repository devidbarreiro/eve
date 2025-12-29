import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.text());
const port = process.env.PORT || 3000;
const apiKey = process.env.OPENAI_API_KEY;
const isProduction = process.env.NODE_ENV === "production";

let vite = null;

// Configurar Vite solo en desarrollo
if (!isProduction) {
  const { createServer: createViteServer } = await import("vite");
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);
} else {
  // En producción, servir archivos estáticos
  app.use(express.static(path.join(__dirname, "dist/client")));
}

const sessionConfig = JSON.stringify({
  session: {
    type: "realtime",
    model: "gpt-realtime",
    audio: {
      output: {
        voice: "marin",
      },
    },
  },
});

// All-in-one SDP request (experimental)
app.post("/session", async (req, res) => {
  const fd = new FormData();
  console.log(req.body);
  fd.set("sdp", req.body);
  fd.set("session", sessionConfig);

  const r = await fetch("https://api.openai.com/v1/realtime/calls", {
    method: "POST",
    headers: {
      "OpenAI-Beta": "realtime=v1",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: fd,
  });
  const sdp = await r.text();
  console.log(sdp);

  // Send back the SDP we received from the OpenAI REST API
  res.send(sdp);
});

// API route for ephemeral token generation
app.get("/token", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/realtime/client_secrets",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: sessionConfig,
      },
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Token generation error:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

// Render the React client
app.use("*", async (req, res, next) => {
  const url = req.originalUrl;

  try {
    let template, appHtml;

    if (isProduction) {
      // En producción, usar archivos construidos
      const htmlPath = path.join(__dirname, "dist/client/index.html");
      template = fs.readFileSync(htmlPath, "utf-8");
      
      // Intentar SSR si está disponible
      try {
        const serverModulePath = path.join(__dirname, "dist/server/index.js");
        if (fs.existsSync(serverModulePath)) {
          const serverModule = await import(`file://${serverModulePath}`);
          const { render } = serverModule.default || serverModule;
          if (render) {
            appHtml = await render(url);
          }
        }
      } catch (ssrError) {
        console.warn("SSR no disponible, usando HTML estático:", ssrError.message);
        appHtml = { html: "" };
      }
    } else {
      // En desarrollo, usar Vite
      template = await vite.transformIndexHtml(
        url,
        fs.readFileSync("./client/index.html", "utf-8"),
      );
      const { render } = await vite.ssrLoadModule("./client/entry-server.jsx");
      appHtml = await render(url);
    }

    const html = template.replace(
      `<!--ssr-outlet-->`,
      appHtml?.html || "",
    );
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e) {
    if (vite) {
      vite.ssrFixStacktrace(e);
    } else {
      console.error("Error renderizando:", e);
    }
    next(e);
  }
});

app.listen(port, () => {
  console.log(`Express server running on *:${port}`);
});
