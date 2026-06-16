[🇨🇴 Español](#español) · [🇺🇸 English](#english)

---

## <a name="español">🇨🇴 Español</a>

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
- git clone https://github.com/aaronHenao/OASIS.git
- cd OASIS

### 2. Inicia Minikube
- minikube start
  
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
En los archivos deployment para el backend y el frontend en las líneas:
- image: aaronhenao/oasis-backend
- image: aaronhenao/oasis-fronted

Reemplaza aaronhenao por tu nombre de usuario en Dockerhub

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

---

## <a name="english">🇺🇸 English</a>

# 🏝️ OASIS - Sports Venue Booking Platform

This repository contains the frontend and backend of the **OASIS** project, a platform for booking sports venues. The system allows users to register, view, and book venues, and enables administrators to manage the platform.

---

## 🛠️ Technologies Used

### 🔙 Backend (Java + Spring Boot)
- Java 17
- Spring Boot 3.2.x
- Spring Data JPA
- PostgreSQL
- Docker
- Maven
- ELK Stack (for logs)

### 🔜 Frontend (Angular)
- Angular CLI 16.2.16
- TypeScript
- HTML/CSS
- Bootstrap
- Docker

### 🗃️ Database
- PostgreSQL 15

### 🐳 Containerization and deployment
- Docker
- DockerHub
- Docker Compose
- Deployed with Kubernetes on Minikube

### 📦 Requirements
- Docker
- Minikube
- kubectl
- Git

---

## 🚀 Steps to run the project

### 1. Clone the repository
- git clone https://github.com/aaronHenao/OASIS.git
- cd OASIS

### 2. Start Minikube
- minikube start
  
💡 Make sure Minikube is using the correct driver (e.g., docker, virtualbox, etc.)

### 3. Enable the Minikube tunnel (in a separate terminal)
- This is necessary to expose NodePort services: minikube tunnel
  
Leave it open

### 4. Build and push the Docker images
#### Backend: 
- cd backend
- docker build -t oasis-backend .
- docker tag oasis-backend your-username/oasis-backend
- docker push your-username/oasis-backend

#### Frontend:
- cd ../frontend/reservas-app
- docker build -t oasis-frontend .
- docker tag oasis-frontend your-username/oasis-frontend
- docker push your-username/oasis-frontend

🔐 Replace your-username with your actual Docker Hub username.
Make sure you have run `docker login` before pushing.

### 5. Deploy the Kubernetes resources
In the deployment files for the backend and frontend, on the lines:
- image: aaronhenao/oasis-backend
- image: aaronhenao/oasis-frontend

Replace aaronhenao with your Docker Hub username

- From the project root: kubectl apply -f k8s/

This will create the Deployments and Services for mysql, backend, and frontend.

### 6. Check the pods
- kubectl get pods
  
Wait until all are in the Running state.

### 7. Access the application
- minikube service frontend
  
This will open the Angular application in your browser.

## 📝 Notes
- The backend is exposed on port 8080.
- The frontend is exposed on port 80 (NodePort in Minikube).
- MySQL is deployed internally within the cluster and is accessible by the backend.





