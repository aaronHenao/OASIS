# 🏝️ OASIS - Plataforma de reservas deportivas

Este repositorio contiene el frontend y backend del proyecto **OASIS**, una plataforma para la reserva de escenarios deportivos. El sistema permite a usuarios registrarse, consultar y reservar escenarios, y a administradores gestionar la plataforma.

---

## 🛠️ Tecnologías utilizadas

### 🔙 Backend (Java + Spring Boot)
- Java 17
- Spring Boot 3.2.x
- Spring Data JPA
- PostgreSQL
- Docker
- Maven
- ELK Stack (para logs)

### 🔜 Frontend (Angular)
- Angular CLI 16.2.16
- TypeScript
- HTML/CSS
- Bootstrap
- Docker

### 🗃️ Base de datos
- PostgreSQL 15

### 🐳 Contenerización y despliegue
- Docker
- DockerHub
- Docker Compose

---

## 📥 Clonación del proyecto

```bash
git clone https://github.com/aaronHenao/OASIS.git
cd OASIS

----
🚀 Ejecución local
----
Backend
Ir al directorio del backend:
```bash
cd backend
./mvnw spring-boot:run
----
Ir al directorio del frontend:
```bash
npm install
ng serve

----
🐳 Ejecución con Docker y Docker Compose
```bash
# Desde la raíz del proyecto
docker build -t oasis-frontend ./frontend
docker build -t oasis-backend ./backend

docker-compose up --build

