import { Hono } from "hono";

const todos = new Hono();

// GET all
todos.get("/", async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT * FROM todos ORDER BY created_at DESC",
    ).all();
    return c.json(results);
  } catch (e) {
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
});

// GET one
todos.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const todo = await c.env.DB.prepare("SELECT * FROM todos WHERE id = ?")
      .bind(id)
      .first();
    if (!todo) return c.json({ error: "Todo not found" }, 404);
    return c.json(todo);
  } catch (e) {
    return c.json({ error: "Failed to fetch todo" }, 500);
  }
});

// POST new
todos.post("/", async (c) => {
  try {
    const body = await c.req.json();
    if (!body.title || typeof body.title !== "string") {
      return c.json({ error: "Title is required and must be a string" }, 400);
    }
    const title = body.title.trim();
    const due_date = body.due_date || null;

    const result = await c.env.DB.prepare(
      "INSERT INTO todos (title, due_date) VALUES (?, ?) RETURNING *",
    )
      .bind(title, due_date)
      .first();

    return c.json(result, 201);
  } catch (e) {
    return c.json({ error: "Failed to create todo" }, 500);
  }
});

// PUT update
todos.put("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const body = await c.req.json();
    const existing = await c.env.DB.prepare("SELECT * FROM todos WHERE id = ?")
      .bind(id)
      .first();
    if (!existing) return c.json({ error: "Todo not found" }, 404);

    const title = body.title !== undefined ? body.title : existing.title;
    const completed =
      body.completed !== undefined
        ? body.completed
          ? 1
          : 0
        : existing.completed;
    const due_date =
      body.due_date !== undefined ? body.due_date : existing.due_date;

    const result = await c.env.DB.prepare(
      "UPDATE todos SET title = ?, completed = ?, due_date = ? WHERE id = ? RETURNING *",
    )
      .bind(title, completed, due_date, id)
      .first();

    return c.json(result);
  } catch (e) {
    return c.json({ error: "Failed to update todo" }, 500);
  }
});

// DELETE
todos.delete("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const result = await c.env.DB.prepare(
      "DELETE FROM todos WHERE id = ? RETURNING id",
    )
      .bind(id)
      .first();
    if (!result) return c.json({ error: "Todo not found" }, 404);
    return c.json({ success: true, id: result.id });
  } catch (e) {
    return c.json({ error: "Failed to delete todo" }, 500);
  }
});

export default todos;
