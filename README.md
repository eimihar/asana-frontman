# Asana Frontman

A project management bridge that connects Asana boards to Telegram for team collaboration, with a public-facing frontend for viewing project status.

## Overview

Asana Frontman provides two-way integration between Asana and Telegram, allowing teams to:
- Receive Asana task updates directly in Telegram
- Create and manage tasks from Telegram
- View project boards publicly via a web frontend

## Features

### Telegram Bot
- Real-time notifications for task updates (assignments, comments, due dates)
- Create tasks directly from Telegram
- Quick actions: complete, assign, set due dates
- Interactive inline keyboards for common actions

### Public Frontend
- View Asana board status without Asana accounts
- Real-time sync with Asana workspace
- Clean, responsive design for public project visibility
- Filter by project, assignee, or status

## Setup

### Prerequisites
- Node.js 18+
- Telegram Bot Token (via @BotFather)
- Asana Personal Access Token

### Environment Variables

```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
ASANA_ACCESS_TOKEN=your_asana_access_token
ASANA_WORKSPACE_ID=your_workspace_id
FRONTEND_PORT=3000
```

### Installation

```bash
npm install
```

### Running

```bash
# Development
npm run dev

# Production
npm start
```

## Project Structure

```
api/                     # Express/Node.js backend
├── src/
│   ├── index.ts         # Express server entry
│   ├── config/          # Configuration
│   ├── services/        # API services (Asana client)
│   ├── routes/         # REST API routes
│   └── types/          # TypeScript declarations
├── package.json
└── tsconfig.json

frontend/                # Public viewing frontend (TODO)
```

## REST API

All API endpoints are prefixed with `/api`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/boards` | List all projects |
| GET | `/api/boards/:id` | Get single project |
| GET | `/api/projects/:id/tasks` | Get tasks in a project |
| GET | `/api/sections/project/:id` | Get sections in a project |
| GET | `/api/sections/:id/tasks` | Get tasks in a section |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create new task |
| PATCH | `/api/tasks/:id` | Update task |

## Frontend - Product Team Board

The frontend displays a Kanban-style view of the "Product Team" board with the following structure:

### Data Model
- **Board**: Product Team (gid: 1204409512349603)
- **Sections**: Each section becomes a column in the Kanban view
- **First Task in Section**: Treated as "issues" - displays as the column header/card
- **Subtasks**: When clicking on the "issues" task, all other tasks in that section are displayed as subtasks

### UI Behavior
1. Columns represent sections (e.g., "qmed", "selfkiosks", "patientapp")
2. Each column shows the first task (named "issues") as a clickable card
3. Clicking on an "issues" card opens a modal/drawer showing all other tasks in that section as subtasks
4. Subtasks show: name, completion status, assignee, due date

### Tech Stack
- Vue 3 (Options API)
- Tailwind CSS
- TypeScript

## License

MIT