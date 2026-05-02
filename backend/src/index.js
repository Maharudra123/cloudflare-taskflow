import { Hono } from "hono";
import { cors } from "hono/cors";
import todosRouter from "./routes/todos.js";

const app = new Hono();

const allowedOrigins = [
  "https://taskflow-ui-wqc.pages.dev",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  "/*",
  cors({
    origin: (origin) => {
      if (allowedOrigins.includes(origin)) {
        return origin;
      }
      return null;
    },
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (c) => {
  return c.text("Cloudflare Todo API is running!");
});

app.route("/api/todos", todosRouter);

app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ error: "Internal Server Error" }, 500);
});

app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

export default app;
