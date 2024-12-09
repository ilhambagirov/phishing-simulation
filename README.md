# Multi-Project Solution with Docker Compose

This repository contains:
- A .NET project (Phishing Simulation)
- Nest.js project (Phishing Attempts Management)
- React.js project (Phishing Attempts Management UI)
- Mongo Db
- Docker Compose setup to manage the containers

## Prerequisites

Before you begin, ensure you have the following installed:
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Git** (for cloning the repository): [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine using Git:

```bash
git clone https://github.com/ilhambagirov/phishing-simulation.git
cd phishing-simulation
```

### 1. Build and Start the Containers
Make sure you are in the root directory of the project (where docker-compose.yml is located), and then run the following command to build and start all the services defined in the docker-compose.yml:

```bash
docker-compose up --build
```

### 3. Access the Services
Once the containers are up and running, you can access the services via: 

Frontend (UI):
```bash
http://localhost:80
```

.NET App: 
```bash
http://localhost:5296
```

Nest.js App:
```bash
http://localhost:3000
```
### Email Configuration

Update below email settings to send phishing emails:

```json
"EmailSettings": {
    "Host": "your host",
    "Port": 587,
    "User": "user",
    "Pwd": "your pass",
    "From": "from"
}
```


MONGODB_URI = "mongodb://mongodb:27017"
DB_NAME = "phishing_simulation_db"
APP_PORT = 3000
JWT_SECRET_KEY = "DCVW302BPUO79NAL8IFH"
PHISHING_SIMULATION_ACCESS_KEY = "6SD5P0EXMLT2OGHQ89BZ"
PHISHING_SIMULATION_BASE_URL="http://phishing-simulation:8080"

