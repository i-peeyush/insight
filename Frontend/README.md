# Insight Pest Solutions - Frontend Application

A high-performance, accessible, and conversion-focused React + TypeScript web application for **Insight Pest Solutions**.

## Technology Stack
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Routing**: React Router 6 (Declarative Route Table with nested Public & Admin layouts)
- **State Management**: TanStack Query (React Query)
- **Forms & Validation**: React Hook Form + Zod
- **Icons**: Lucide React
- **Design System**: Vanilla CSS Design Tokens, CSS variables, and utility styling
- **Mock Layer**: Decoupled `MockDirectory/` located outside `src/` with configurable runtime switching

## Architecture & Data Flow
```
Component ──▶ Feature Hook ──▶ Feature API Service ──▶ Decoupled Adapter ──▶ MockDirectory OR Spring Boot REST API
```

## Running the Frontend

### 1. Mock Mode (Default)
In mock mode, the frontend runs completely standalone without requiring backend services:
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### 2. Connected to Spring Boot Backend
Set environment variable in `.env`:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_USE_MOCK_DATA=false
```
Then start the Vite dev server:
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
npm run preview
```
