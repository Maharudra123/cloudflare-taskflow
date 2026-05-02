import { Hono } from "hono";
import { cors } from "hono/cors";
import todosRouter from "./routes/todos.js";

const app = new Hono();

// Enable CORS for all routes
app.use(
  "/*",
  cors({
    origin: "*",
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
