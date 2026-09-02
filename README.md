# Insight Pest Solutions - Enterprise Full-Stack Web Platform

A production-grade, full-stack business web platform for **Insight Pest Solutions** (Professional Pest Control & Integrated Pest Management Services).

Built with a decoupled **React 18 + TypeScript + Vite** frontend and a modular, feature-based **Spring Boot 3 + Spring Data JPA** backend.

---

## 🏗 Project Architecture

```
InsightPest/
├── Backend/                    # Spring Boot 3.3 REST API backend
│   ├── pom.xml
│   ├── Dockerfile
│   ├── README.md
│   └── src/
│       ├── main/
│       │   ├── java/com/insightpest/
│       │   │   ├── InsightPestApplication.java
│       │   │   ├── config/          # CORS, OpenAPI, Data Seeder
│       │   │   ├── security/        # Spring Security configuration
│       │   │   ├── common/          # Standard ApiResponse, Exception Handling, Constants
│       │   │   └── modules/         # Feature-based architecture
│       │   │       ├── services/    # Service catalog & plans
│       │   │       ├── pests/       # Biological Pest Library
│       │   │       ├── locations/   # Regional branch coverage
│       │   │       ├── bookings/    # Slot availability & appointment bookings
│       │   │       ├── leads/       # Inbound quote requests
│       │   │       ├── contact/     # Customer support inquiries
│       │   │       ├── testimonials/# Verified reviews & ratings
│       │   │       ├── faq/         # Knowledge base & FAQs
│       │   │       ├── blog/        # Prevention & educational guides
│       │   │       └── newsletter/  # Advisory email subscriptions
│       │   └── resources/
│       │       ├── application.yml
│       │       ├── application-dev.yml
│       │       └── application-prod.yml
│       └── test/                    # Integration & unit test suites
│
├── Frontend/                   # React + TypeScript + Vite frontend
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── Dockerfile
│   ├── README.md
│   ├── MockDirectory/          # Decoupled mock datasets outside src/
│   │   ├── company/            # Centralized company config & safe placeholders
│   │   ├── navigation/         # Header, footer, and mobile nav links
│   │   ├── services/           # Service catalog datasets
│   │   ├── pests/              # Pest species profiles
│   │   ├── locations/          # Service areas
│   │   ├── testimonials/       # Demo customer reviews
│   │   ├── faq/                # FAQ entries
│   │   ├── blog/               # Educational articles
│   │   ├── bookings/           # Slot availability
│   │   └── leads/              # Lead triage mock data
│   └── src/
│       ├── assets/             # Brand logos & vector graphics
│       ├── components/         # Reusable UI cards, forms, buttons, sections
│       ├── layouts/            # PublicLayout & AdminLayout
│       ├── routes/             # Declarative React Router configuration
│       ├── hooks/              # Feature React Query custom hooks
│       ├── api/                # Decoupled API adapters (Mock vs REST)
│       ├── contexts/           # AuthContext & ToastContext
│       ├── types/              # Comprehensive TypeScript interfaces
│       └── modules/            # Domain pages (home, services, pests, bookings, leads, admin, etc.)
│
├── docker-compose.yml          # Container orchestration (Frontend, Backend, PostgreSQL)
├── .gitignore
└── README.md
```

---

## ⚡ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, React Router 6, React Hook Form, Zod, TanStack Query, Lucide Icons, Vanilla CSS Tokens |
| **Backend** | Java 17/21, Spring Boot 3.3, Spring Web, Spring Data JPA, Spring Validation, Spring Security, OpenAPI/Swagger |
| **Database** | In-Memory H2 (local development) / PostgreSQL 16 (production) |
| **DevOps** | Docker, Docker Compose, Multi-stage builds, Nginx SPA server |

---

## 🚀 Quick Start Guide

### 1. Running the Frontend in Standalone Mock Mode (Default)
The frontend comes equipped with a decoupled `MockDirectory` layer that allows testing the entire UI, interactive quote form, booking wizard, and admin dashboard without running the database.

```bash
cd Frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

### 2. Running the Spring Boot Backend (Local H2 Mode)
```bash
cd Backend
mvn spring-boot:run
```
- **REST API Base URL**: `http://localhost:8080/api/v1`
- **Interactive Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **H2 Web Console**: `http://localhost:8080/h2-console` (`jdbc:h2:mem:insightpest_dev`)

---

### 3. Connecting Frontend to Spring Boot REST APIs
To switch the frontend from mock mode to the real Spring Boot backend:
1. Open `Frontend/.env`
2. Update the environment variables:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api/v1
   VITE_USE_MOCK_DATA=false
   ```
3. Restart the Vite dev server (`npm run dev`).

---

### 4. Running the Entire Stack with Docker Compose
To launch PostgreSQL, Spring Boot backend, and Nginx-powered React frontend in isolated containers:
```bash
docker-compose up --build
```
- Frontend: `http://localhost:3000`
- Backend REST API: `http://localhost:8080/api/v1`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- PostgreSQL: Port `5432`

---

## 🌐 API Endpoint Summary

| HTTP Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/services` | List all service programs |
| `GET` | `/api/v1/services/{slug}` | Get service details by slug |
| `GET` | `/api/v1/pests` | List pest identification library |
| `GET` | `/api/v1/pests/{slug}` | Get pest biology & treatment guide |
| `GET` | `/api/v1/locations` | List service areas and cities |
| `GET` | `/api/v1/locations/{slug}` | Get local branch information |
| `GET` | `/api/v1/testimonials` | List verified customer reviews |
| `GET` | `/api/v1/faqs` | List FAQs (optional `?category=` filter) |
| `GET` | `/api/v1/blog` | List educational blog articles |
| `GET` | `/api/v1/blog/{slug}` | Get article detail by slug |
| `GET` | `/api/v1/bookings/availability` | Get confirmed open arrival time slots |
| `POST` | `/api/v1/bookings` | Reserve and schedule an appointment |
| `GET` | `/api/v1/bookings` | List all scheduled bookings |
| `POST` | `/api/v1/leads` | Submit a quote or callback lead |
| `GET` | `/api/v1/leads` | List all inbound leads |
| `POST` | `/api/v1/contact` | Send general support inquiry |
| `POST` | `/api/v1/newsletter/subscribe`| Subscribe to seasonal pest alerts |

---

## 🧪 Testing

### Frontend Build & Typecheck
```bash
cd Frontend
npm run build
```

### Backend Unit & Integration Tests
```bash
cd Backend
mvn clean test
```
