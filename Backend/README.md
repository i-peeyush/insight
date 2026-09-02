# Insight Pest Solutions - Backend Application

Enterprise RESTful API backend service built with Java 17/21 and Spring Boot 3.3.

## Architecture
- **Framework**: Spring Boot 3.3.3
- **Persistence**: Spring Data JPA with Hibernate
- **Databases**:
  - `dev` profile: In-memory H2 database with automatic schema migrations & seed data
  - `prod` profile: PostgreSQL with connection pooling and environment-variable secrets
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

## Running the Backend

### 1. Local Development (H2 Database)
```bash
mvn spring-boot:run
```
- API Base URL: `http://localhost:8080/api/v1`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- H2 Web Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:insightpest_dev`, User: `sa`, Password: ``)

### 2. Running with PostgreSQL (Production)
```bash
export SPRING_PROFILES_ACTIVE=prod
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=insightpest_db
export DB_USERNAME=insightpest_user
export DB_PASSWORD=your_secure_password
mvn spring-boot:run
```

### 3. Running Unit & Integration Tests
```bash
mvn clean test
```
