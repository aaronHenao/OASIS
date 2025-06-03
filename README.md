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
- Desplegado con Kubernetes en Minikube

### 📦 Requisitos
- Docker
- Minikube
- kubectl
- Git

---

## 🚀 Pasos para ejecutar el proyecto

### 1. Clona el repositorio
- git clone https://github.com/tu-usuario/OASIS.git
- cd OASIS

### 2. Inicia Minikube
- minikube start
- 
💡 Asegúrate de que Minikube esté usando el driver correcto (ej. docker, virtualbox, etc.)

### 3. Habilita el tunnel de Minikube (en una terminal separada)
- Esto es necesario para exponer servicios NodePort: minikube tunnel

Déjalo abierto

### 4. Construye y sube las imágenes Docker
#### Backend: 
- cd backend
- docker build -t oasis-backend .
- docker tag oasis-backend tu-usuario/oasis-backend
- docker push tu-usuario/oasis-backend

#### Frontend:
- cd ../frontend/reservas-app
- docker build -t oasis-frontend .
- docker tag oasis-frontend tu-usuario/oasis-frontend
- docker push tu-usuario/oasis-frontend

🔐 Reemplaza tu-usuario con tu usuario real de Docker Hub.
Asegúrate de haber hecho docker login antes de hacer push.

### 5. Despliega los recursos de Kubernetes
- Desde la raíz del proyecto: kubectl apply -f k8s/

Esto creará los Deployments y Services para mysql, backend y frontend.

### 6. Verifica los pods
- kubectl get pods

Espera a que todos estén en estado Running.

### 7. Accede a la aplicación
- minikube service frontend

Esto abrirá la aplicación Angular en tu navegador.

## 📝 Notas
- El backend expone en el puerto 8080.
- El frontend se expone en el puerto 80 (NodePort en Minikube).
- El MySQL se despliega internamente en el clúster, accesible por el backend.




