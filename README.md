# Group-4_COMP308Lab3

Micro Frontend Architecture with Apollo Gateway (COMP308 Lab 3)

# COMP308 Lab 3 – Micro Frontend Architecture

## Group

Group-4

## Team Members

- Carson Stewart
- Davi Mar
- Justine Aldea
- Percy Osunde
- Trizha Bacani

---

## Project Overview

This project implements a micro frontend architecture integrated with GraphQL microservices using Apollo Gateway. The system separates frontend applications from backend services, enabling modular development, scalability, and independent deployment.

---

## Project Structure

### Client (Micro Frontends)

- **shell-app** — Host application responsible for routing and global state management
- **projects-app** — Remote micro frontend for managing projects, feature requests, and drafts
- **ai-review-app** — Remote placeholder for AI-based code review functionality

### Server (Backend Services)

- **gateway.js** — Apollo Gateway that composes and routes requests to microservices
- **microservices/**
  - **auth-service** — Handles user authentication, session management, and authorization
  - **projects-service** — Manages projects, feature requests, and implementation drafts

---

## Tech Stack

- **Frontend:** React (Vite), Module Federation
- **Backend:** Node.js, Express
- **API Layer:** GraphQL, Apollo Gateway
- **Database:** MongoDB (Mongoose)
- **Authentication:** Session-based (HTTP-only cookies)

---

## Development Workflow
