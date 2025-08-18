# Task Management - Microservice App

## Service Overview

<img width="1491" height="975" alt="Image" src="https://github.com/user-attachments/assets/f66e5134-e6b8-4413-8593-3bf437c49c3c" />

## Core Services

| Service Name         | Port | Description                                                  |
| -------------------- | ---- | ------------------------------------------------------------ |
| API Gateway          | 3000 | Entry point for all client requests, routes to services.     |
| Auth Service         | 3001 | Handles authentication, authorization, and token management. |
| User Service         | 3002 | Manages user profiles, accounts, and related data.           |
| Task Service         | 3003 | Handles creation, tracking, and management of tasks.         |
| Project Service      | 3004 | Manages projects, members, and related workflows.            |
| Notification Service | 3005 | Sends alerts, emails, and real-time notifications.           |

## Supporting Service

| Service Name | Port | Description                  |
| ------------ | ---- | ---------------------------- |
| Redis        | 6379 | Cache and Session Management |
| Redis UI     | 8001 | Redis Management Interface   |

## Technologies

| Layer              | Technologies                                     |
| ------------------ | ------------------------------------------------ |
| Frontend           | NextJS, TypeScript, TailwindCSS, ShadcnUI        |
| Backend            | Node.js, Express, REST APIs, GRPC, Typescript    |
| Design Pattern     | Repository Pattern (in each service)             |
| Database           | PostgreSQL, Mongodb, Redis, Prisma ORM, Mongoose |
| Authentication     | JWT                                              |
| Infrastructure     | Docker, Nginx                                    |
| Cloud & Deployment |                                                  |
| Monitoring/Logging |                                                  |
