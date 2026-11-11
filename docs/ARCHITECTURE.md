# BrownBites Architecture

## Frontend

React + TypeScript + Vite + Tailwind CSS

## Backend

Node.js + Express + TypeScript

## Database

PostgreSQL

Database access uses the `pg` package and raw SQL.

## Backend Layers

Routes
    ↓
Controllers
    ↓
Services
    ↓
Repositories
    ↓
PostgreSQL

## Frontend → Backend

The React frontend communicates with the Express backend through HTTP REST APIs.

## Important Decisions

### Database Access

Use raw SQL rather than Prisma or another ORM.

Reason:
This project is intended to strengthen SQL and relational database skills.

### AI

The LLM does not directly query or modify the database.

The backend retrieves and validates candidate foods before passing relevant information to the LLM.