# BrownBites

A full-stack nutrition tracking application built around Brown University's dining system.

BrownBites allows users to browse Brown dining menus, view nutritional information, log meals, track calories and macronutrients, and set personalized nutrition goals.

Future versions will include food recommendations and AI-powered natural-language search based on nutrition goals and dietary preferences.

---

## Features

### MVP

* User registration and authentication
* Brown dining hall browsing
* Dining menu browsing
* Food nutritional information
* Food search and filtering
* Meal logging
* Serving adjustments
* Daily calorie tracking
* Daily macronutrient tracking
* Nutrition goals
* Visual nutrition dashboard
* Nutrition history

### Future

* Brown dining data ingestion
* Personalized food recommendations
* Natural-language food search
* AI-powered meal recommendations
* AI nutrition summaries
* Favorite meals
* Custom meals
* Advanced nutrition analytics

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express
* TypeScript

### Database

* PostgreSQL
* `pg`
* Raw PostgreSQL SQL

### Development

* Git
* GitHub
* Cursor
* Notion

### AI

* LLM API

---

## Architecture

BrownBites uses a layered full-stack architecture:

```text
                    BrownBites
                         |
          +--------------+--------------+
          |                             |
          v                             v
     React Frontend                Express API
                                        |
                                        v
                                     Routes
                                        |
                                        v
                                   Controllers
                                        |
                                        v
                                    Services
                                        |
                                        v
                                  Repositories
                                        |
                                        v
                                   PostgreSQL
```

### Frontend

The React frontend is responsible for:

* User interface
* User interaction
* Forms
* Navigation
* Displaying application data
* Communicating with the backend API

### Routes

Routes define the application's HTTP endpoints and map requests to controllers.

### Controllers

Controllers handle HTTP requests and responses.

### Services

Services contain application and business logic.

### Repositories

Repositories handle database access and PostgreSQL queries.

### PostgreSQL

PostgreSQL provides persistent storage for users, menus, foods, meals, nutrition goals, and related data.

---

## Database

The initial database consists of these core entities:

```text
users
user_goals
dining_locations
menus
food_items
menu_items
meals
meal_items
```

Relationships:

```text
users
  |
  +---- user_goals
  |
  +---- meals
            |
            +---- meal_items ---- food_items
                                      ^
                                      |
                                 menu_items
                                      ^
                                      |
                                    menus
                                      ^
                                      |
                              dining_locations
```

For more information, see:

```text
docs/PROJECT_SPEC.md
```

---

## Project Structure

```text
BrownBites/
│
├── client/                 # React frontend
│   └── src/
│
├── server/                 # Express backend
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── middleware/
│       ├── types/
│       └── utils/
│
├── database/               # PostgreSQL schema, migrations, and seeds
│   ├── migrations/
│   └── seeds/
│
├── docs/                   # Project documentation
│   └── PROJECT_SPEC.md
│
├── .env.example            # Example environment variables
├── .gitignore
├── README.md
└── package.json
```

---

## Prerequisites

Before running BrownBites locally, install:

* Node.js
* npm
* PostgreSQL
* Git

Check your installations:

```bash
node --version
npm --version
psql --version
git --version
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd BrownBites
```

### 2. Install dependencies

Install the frontend dependencies:

```bash
cd client
npm install
```

Install the backend dependencies:

```bash
cd ../server
npm install
```

### 3. Configure environment variables

Create environment files based on the provided examples.

Do not commit real secrets or passwords to Git.

---

## Running the Frontend

From the `client` directory:

```bash
npm run dev
```

The Vite development server will provide a local URL, typically:

```text
http://localhost:5173
```

---

## Running the Backend

From the `server` directory:

```bash
npm run dev
```

The Express API will run on the configured backend port.

---

## API

The API uses versioned REST-style endpoints.

Example:

```text
/api/v1/health
```

Future endpoints will include:

```text
/api/v1/auth
/api/v1/dining-locations
/api/v1/menus
/api/v1/foods
/api/v1/meals
/api/v1/nutrition
/api/v1/goals
```

---

## Development Roadmap

### Phase 1 — Foundation

* Project setup
* React frontend
* Express backend
* TypeScript
* Tailwind
* Environment configuration
* Health-check endpoint

### Phase 2 — Database

* PostgreSQL setup
* Database schema
* Migrations
* Seed data
* SQL queries
* Database relationships

### Phase 3 — Backend

* API routes
* Controllers
* Services
* Repositories
* PostgreSQL integration
* Food APIs
* Menu APIs
* Meal APIs
* Nutrition APIs

### Phase 4 — Frontend

* Application layout
* Navigation
* Dashboard
* Dining menu
* Food details
* Meal logging
* Nutrition goals

### Phase 5 — Authentication

* Registration
* Login
* Logout
* Password hashing
* Protected routes
* User-specific data

### Phase 6 — Brown Dining Data

* Retrieve Brown dining data
* Parse menu data
* Normalize data
* Store data in PostgreSQL
* Update menus

### Phase 7 — Search and Recommendations

* Food search
* Nutrition filtering
* Dietary filtering
* Recommendation algorithm

### Phase 8 — AI

* Natural-language search
* AI food recommendations
* AI meal recommendations
* AI nutrition summaries

### Phase 9 — Testing and Deployment

* Unit testing
* API testing
* Frontend testing
* Error handling
* Security review
* Performance improvements
* Deployment
* Documentation

---

## AI Architecture

AI functionality will be added after the core application and recommendation engine are working.

The planned architecture is:

```text
User Request
     |
     v
Backend
     |
     +-- User Goals
     +-- Remaining Nutrition
     +-- Dietary Preferences
     +-- Current Menu
     |
     v
Structured Requirements
     |
     v
PostgreSQL Query
     |
     v
Candidate Foods / Meals
     |
     v
Recommendation Logic
     |
     v
LLM
     |
     v
Natural-Language Response
```

The LLM should not be the source of truth for Brown dining nutrition information.

Actual food and nutrition data should come from the application's database.

---

## Engineering Principles

BrownBites is being built as a learning and portfolio project with an emphasis on understanding the underlying technologies.

### Backend

Follow:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

### Database

* Use PostgreSQL
* Use raw SQL
* Use foreign keys
* Use constraints
* Use parameterized queries
* Avoid unnecessary data duplication
* Add indexes when appropriate

### Code Quality

* Use TypeScript
* Keep functions focused
* Avoid unnecessary abstraction
* Keep business logic out of controllers
* Keep SQL/database logic out of the frontend
* Validate user input
* Handle errors explicitly
* Document important architectural decisions

---

## Development Philosophy

BrownBites will be developed incrementally.

The project will not attempt to implement every feature at once.

The initial goal is:

```text
Foundation
    ↓
Database
    ↓
Backend
    ↓
Frontend
    ↓
Authentication
    ↓
Nutrition
    ↓
Brown Data
    ↓
Recommendations
    ↓
AI
```

Each stage should be working and understood before moving to the next stage.

---

## Documentation

Project requirements and architecture are documented in:

```text
docs/PROJECT_SPEC.md
```

This document serves as the primary source of truth for the application's intended functionality and architecture.
