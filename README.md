# React + Docker CI/CD (Frontend + Backend)

Counter and Todo app (React + Vite) with an Express backend API.

## Run locally (development)
Needs Node.js 18 or newer.

    npm run install:all
    npm run dev

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/todos

## Run with Docker
    docker build -t react-app:test .
    docker run -d --name test-app -p 3000:5000 react-app:test
Open http://localhost:3000

Stop it: docker stop test-app && docker rm test-app

## Jenkins
Push this folder to GitHub, create a Pipeline job (Pipeline script from SCM, branch */main, script path Jenkinsfile), then Build Now.

## API
GET /api/todos, POST /api/todos {text}, PATCH /api/todos/:id (toggle done), DELETE /api/todos/:id
