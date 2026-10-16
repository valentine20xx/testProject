# Todo test app

- `backend/` – Spring Boot REST API (CRUD on todos), MongoDB, Swagger UI at http://localhost:8080/swagger-ui.html
- `frontend/` – Angular SPA (HttpClient, routing, Jasmine unit tests, Protractor e2e)

## Run
    docker compose up -d                 # MongoDB
    cd backend && ./gradlew bootRun    # API on :8080  (./gradlew test for tests)
    cd frontend && npm install && npm start   # UI on :4200
    npm test                             # Jasmine/Karma  (ChromeHeadlessCI: ng test --browsers=ChromeHeadlessCI)
    npm run e2e                          # Protractor (backend must be running)

## Docker
    docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest