# Insight Pest Solutions - Backend Application

Enterprise RESTful API backend service built with Java 17/21 and Spring Boot 3.3.

## Architecture
- **Framework**: Spring Boot 3.3.3
- **Persistence**: Spring Data JPA with Hibernate
- **Database**: PostgreSQL (with connection pooling, schema DDL, and environment variables)
- **Environment Management**: `Backend/.env` (via `springboot-dotenv`)
- **Validation**: Jakarta / Spring Validation (Bean Validation)
- **Security**: Spring Security 6 with CORS policies and stateless REST configuration
- **Documentation**: OpenAPI 3 / Swagger (`/swagger-ui.html`)
- **API Standard**: Uniform `ApiResponse<T>` and `PageResponse<T>` wrappers with standard HTTP status codes

## Feature Modules
- `com.insightpest.modules.services` - Pest service catalog and tiers
- `com.insightpest.modules.pests` - Biological pest library and identification guide
- `com.insightpest.modules.locations` - Branch locations and regional coverage
- `com.insightpest.modules.testimonials` - Verified customer reviews and ratings
- `com.insightpest.modules.faq` - Knowledge base and searchable questions
- `com.insightpest.modules.blog` - Entomology and prevention guides
- `com.insightpest.modules.bookings` - Dynamic slot availability and appointment bookings
- `com.insightpest.modules.leads` - High-conversion quote request triage
- `com.insightpest.modules.contact` - Customer inquiries and support messaging
- `com.insightpest.modules.newsletter` - Seasonal pest advisory email subscriptions

## Database Setup & SQL Script

The complete schema and seed data are located in:
- [`Backend/database/inisghtpest.sql`](file:///d:/Study/Coding/Insight%20Pest/Backend/database/inisghtpest.sql)

### Create PostgreSQL Database
```sql
CREATE DATABASE insightpest_db;
```

### Import Schema and Seed Data (Optional - Hibernate auto-creates if `ddl-auto: update`)
```bash
psql -U postgres -d insightpest_db -f Backend/database/inisghtpest.sql
```

## Running the Backend

### 1. Environment Configuration
Copy `.env.example` to `.env` in the `Backend/` directory and configure your PostgreSQL credentials:
```bash
cp .env.example .env
```

Default variables in `.env`:
```env
SPRING_PROFILES_ACTIVE=dev
SERVER_PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_NAME=insightpest_db
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

### 2. Start Application
```bash
mvn spring-boot:run
```
- API Base URL: `http://localhost:8080/api/v1`
- Swagger UI: `http://localhost:8080/swagger-ui.html`

### 3. Running Unit & Integration Tests
```bash
mvn clean test
```

