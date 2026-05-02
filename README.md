# ⚡ TaskFlow: Edge-Powered Task Management

A production-ready, full-stack task management application built to demonstrate modern edge computing capabilities. 

TaskFlow leverages Cloudflare's serverless ecosystem to deliver a blazing-fast, globally distributed backend, paired with a highly responsive React frontend featuring optimistic UI updates.

## 🔗 Live Links
* **Live Application:** [https://taskflow-ui-wqc.pages.dev](https://taskflow-ui-wqc.pages.dev)
* **Backend API Base:** `https://backend.rudra-dev.workers.dev`

---

## 🛠️ Tech Stack & Tools

### Frontend (User Interface)
* **Framework:** React 18 powered by [Vite](https://vitejs.dev/) for instant HMR.
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) using the new Vite plugin architecture.
* **State & Data Fetching:** Pure React Hooks (`useState`, `useEffect`) optimized with **Optimistic UI** patterns via Axios.
* **Animations:** [Framer Motion](https://www.framer.com/motion/) for smooth layout transitions and exit animations.
* **Icons:** [Lucide React](https://lucide.dev/).
* **Deployment:** Cloudflare Pages (via GitHub CI/CD).

### Backend (API & Edge Compute)
* **Framework:** [Hono.js](https://hono.dev/) - An ultrafast, lightweight web framework designed for the Edge.
* **Runtime:** [Cloudflare Workers](https://workers.cloudflare.com/) - Globally distributed serverless execution.
* **Database:** [Cloudflare D1](https://developers.cloudflare.com/d1/) - Serverless SQLite database at the edge.
* **Security:** Strict CORS policy restricting access to specific production and local origins.

---

## ✨ Key Features

* **Instant "Optimistic" Updates:** The UI reacts immediately to user input (like checking off a task) *before* the server responds, ensuring a zero-latency feel. It automatically rolls back if the server request fails.
* **Edge Performance:** The API runs on Cloudflare Workers, meaning the code executes in a data center geographically closest to the user.
* **Strict Security:** Cross-Origin Resource Sharing (CORS) is configured to only allow requests from the specific frontend domain and localhost.
* **Modular Architecture:** Clean separation of concerns. The frontend features an abstracted API service layer (`todoService.js`), keeping UI components completely decoupled from network logic.

---

## 🚀 Local Development Setup

To run this project locally, you will need [Node.js](https://nodejs.org/) and the [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/YourUsername/cloudflare-taskflow.git
cd cloudflare-taskflow
\`\`\`

### 2. Setup the Backend
\`\`\`bash
cd backend
npm install

# Initialize the local D1 SQLite database
npx wrangler d1 execute todo-app-db --local --file=./schema.sql

# Start the local Worker server (runs on http://127.0.0.1:8787)
npm run dev
\`\`\`

### 3. Setup the Frontend
Open a new terminal window:
\`\`\`bash
cd frontend
npm install

# Create local environment variables
echo "VITE_API_URL=http://127.0.0.1:8787/api/todos" > .env

# Start the Vite development server (runs on http://localhost:5173)
npm run dev
\`\`\`

---

## 📡 API Endpoints

The backend exposes a RESTful API powered by Hono:

| Method | Endpoint | Description | Body / Payload |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/todos` | Fetch all tasks (ordered by newest) | N/A |
| `POST` | `/api/todos` | Create a new task | `{ title: string, due_date?: string }` |
| `PUT` | `/api/todos/:id` | Update a task (e.g., mark complete) | `{ title?: string, completed?: 0 \| 1 }` |
| `DELETE`| `/api/todos/:id` | Delete a task | N/A |

---

## 👨‍💻 Developed By

**Maharudra Ganjure**
* 🌐 **Portfolio:** [https://portfolio-mern-qiuo.vercel.app/](https://portfolio-mern-qiuo.vercel.app/)
* 💼 **LinkedIn:** [https://www.linkedin.com/in/maharudra-ganjure/](https://www.linkedin.com/in/maharudra-ganjure/)
