# **RafeeqCRM: System Design & Strategy Document**

**Version:** 1.0
**Date:** June 25, 2025
**Status:** In Development

## 1. Vision & Executive Summary

RafeeqCRM is a modern, cloud-native Enterprise Resource Planning (ERP) platform designed from the ground up to address a significant gap in the Egyptian and Middle Eastern markets. While incumbent global players offer powerful but complex and expensive solutions, and open-source alternatives often lack polish and scalability, RafeeqCRM will deliver on three core principles:

1.  **A Superior, Modern User Experience:** An intuitive, mobile-first interface that reduces training time and overcomes cultural resistance to technology adoption.
2.  **Exceptional Performance & Scalability:** Built on a modern, high-performance tech stack (NestJS, React Native, PostgreSQL) capable of serving thousands of concurrent users without compromising speed.
3.  **A Straightforward & Accessible Business Model:** A core system that provides immediate value, with a simple, transparent model for adding modular features ("add-ons") as a business grows.

Our primary goal is to become the go-to ERP solution for Small and Medium-sized Enterprises (SMEs) in Egypt, providing them with the tools to digitize and scale their operations efficiently.

## 2. Market Analysis & Competitive Landscape

Our strategy is informed by a detailed analysis of the ERP markets in the US, the Gulf (as part of MEA), and Egypt.

### 2.1. Regional Market Comparison

| Region | Market Size (2025 Est.) | Projected CAGR | Key Characteristics |
| :--- | :--- | :--- | :--- |
| **United States** | $22.23 Billion | 9.51% | Mature, high adoption. Focus on AI, predictive analytics. Dominated by SAP, Oracle, Microsoft. |
| **Gulf / MEA** | $5.68 Billion | 8.7% | Rapid growth, driven by government digital transformation. High demand for cloud solutions. |
| **Egypt** | **$44.30 Million** | **5.31%** | **Emerging, high-potential.** Dominated by SMEs needing **affordable, cloud-based, and mobile-friendly** solutions. |

*(Sources: Mordor Intelligence, Fortune Business Insights, Statista)*

### 2.2. The Opportunity in Egypt

The Egyptian market's relatively small size and lower CAGR are not weaknesses, but indicators of an underserved market ripe for disruption. The key needs are:
*   **Affordability:** Solutions must cater to the budget constraints of SMEs.
*   **Localization:** Compliance with Egyptian tax laws and business practices is mandatory.
*   **Usability:** The system must be simple enough to overcome cultural resistance to new technology and minimize training overhead.

### 2.3. Competitive Positioning

Our main competitors fall into two categories:

| Competitor Category | Examples | Strengths | Weaknesses (in the Egyptian SME context) |
| :--- | :--- | :--- | :--- |
| **Global Giants** | SAP S/4HANA, Oracle NetSuite, Microsoft Dynamics 365 | Extremely powerful, feature-rich, trusted brands. | **Prohibitively expensive, complex implementation, high training cost, often over-engineered for SMEs.** |
| **Open-Source** | Odoo, ERPNext | Affordable (or free), highly customizable, strong community. | **Inconsistent UX, scalability concerns, requires significant in-house technical expertise to maintain and customize.** |
| **Local Vendors** | Perfecto ERP, Oratech | Local market knowledge, local support. | Often built on older technology, may lack scalability and a modern user experience. |

**RafeeqCRM's Strategic Position:** We will position ourselves directly in the gap left by these players, offering the **polish and performance of a modern SaaS product** with the **affordability and flexibility** required by the Egyptian SME market.

## 3. Core Architectural Principles

1.  **API-First Design:** The backend is a stateless, robust API. The front-end (and any future client) is a consumer of this API. This ensures a clean separation of concerns.
2.  **Cloud-Native & Scalable:** The entire system is designed to run in the cloud, leveraging containerization and modern database technologies for horizontal scalability.
3.  **Secure by Default:** Authentication and authorization are not afterthoughts. JWT-based security and service-level data scoping are implemented from day one.
4.  **Modular & Extensible:** The architecture (both front-end and backend) is designed around self-contained feature modules, enabling our "add-on" business model.
5.  **Performance-Oriented:** Technology choices and database design prioritize fast response times and efficient data handling to support a fluid user experience.

## 4. Technology Stack

| Component | Technology | Justification |
| :--- | :--- | :--- |
| **Backend API** | **NestJS (Node.js, TypeScript)** | High-performance, non-blocking I/O ideal for API-centric workloads. Strong TypeScript support ensures code quality and maintainability. A modern stack that attracts top developer talent. |
| **Database** | **PostgreSQL** | Unmatched data integrity (ACID compliance), superior performance on complex queries, and powerful extensibility (JSONB, PostGIS) make it the best choice for a serious ERP system. |
| **ORM** | **Prisma** | Provides a type-safe interface to the database that perfectly complements our TypeScript-first approach, dramatically reducing runtime errors and speeding up development. |
| **Front-End (Mobile/Web)** | **React Native & Expo Router** | Enables a single codebase for iOS, Android, and Web, ensuring a consistent user experience across all platforms. Expo simplifies the development and build process significantly. |
| **Front-End State** | **Zustand** | A lightweight, powerful, and simple state management library that avoids boilerplate and is perfectly suited for managing session and feature state in a React application. |

## 5. High-Level System Architecture

```mermaid
graph TD
    A[📱 RafeeqCRM Client App <br>(React Native / Expo)] -->|HTTPS/API Calls| B(🔒 API Gateway <br>NestJS)
    B --> C{🔑 Auth Service}
    B --> D{👥 Clients Service}
    B --> E{...Other Feature Services}
    C --> F[(🐘 PostgreSQL<br>Database)]
    D --> F
    E --> F
```

*   **Client App:** The user-facing application built with React Native and Expo. It is a "dumb" client that handles UI and user interaction, with all business logic and data residing on the backend.
*   **API Gateway (NestJS):** The single entry point for all client requests. It handles routing, authentication (via JWT guards), and request validation (via DTOs).
*   **Core Services:** Self-contained modules within the NestJS backend (e.g., `AuthService`, `ClientsService`) that encapsulate the business logic for a specific domain.
*   **Database (PostgreSQL):** The single source of truth for all application data, managed via the Prisma ORM.

## 6. Database Schema (Initial)

The database is designed with normalization and scalability in mind, using Prisma for schema definition.

```prisma
// file: prisma/schema.prisma

// --- Datasource & Generator ---
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// --- Data Models ---

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   // Hashed with bcrypt
  firstName String?
  lastName  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relation: A User can have many Clients
  clients   Client[]
}

model Client {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  phone     String?
  address   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relation: Each Client belongs to one User
  user      User     @relation(fields: [userId], references: [id])
  userId    Int

  // Indexing: Foreign keys should always be indexed for performance
  @@index([userId])
}
```

## 7. Front-End MVP Execution Plan

We will follow the phased roadmap to build our front-end foundation.

*   **Phase 0: The Blueprint (Complete)**
    *   **Goal:** Establish a scalable project structure.
    *   **Deliverables:** Enterprise-grade directory structure, centralized Axios API client, and a Zustand store for session management.
*   **Phase 1: The Gateway (In Progress)**
    *   **Goal:** Implement a secure and seamless authentication flow.
    *   **Deliverables:** `useProtectedRoute` hook to act as a route guard, a functional login screen connected to the `sessionStore`, and a logout mechanism.
*   **Phase 2: The Proof of Concept**
    *   **Goal:** Build the first end-to-end, read-only feature module.
    *   **Deliverables:** A self-contained `/features/clients` module with its own state, API calls, and screens to display a list of clients belonging to the authenticated user.

## 8. Conclusion: Our Differentiators

RafeeqCRM is not just another ERP. It is a strategically positioned platform designed to win by focusing on:

1.  **Modern, Intuitive UX:** To drive adoption and delight users.
2.  **Uncompromising Performance:** To ensure the system is a reliable and fast tool for business.
3.  **Simplicity and Affordability:** To serve the specific needs of the massive, underserved SME market in Egypt and beyond.

This document will serve as our guide to executing this vision.