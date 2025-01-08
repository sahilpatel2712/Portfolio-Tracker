# Portfolio Tracker

A full-stack application for tracking and managing your investment portfolio, built with modern web technologies.

---

## Technologies Used

- **[React.js](https://legacy.reactjs.org/)** (Frontend Framework)
- **[Tailwind CSS](https://tailwindcss.com/)** (Styling Framework)
- **[Redux Toolkit](https://redux-toolkit.js.org/)** (State Management)
- **[Node.js](https://nodejs.org/en)** (Backend Runtime)
- **[Express.js](https://expressjs.com/)** (Backend Framework)
- **[Prisma ORM](https://www.prisma.io/docs/getting-started)** (Database Access)
- **MySQL** (Relational Database)

---

## Prerequisites

Ensure the following software is installed on your local machine:

- **[Node.js](https://nodejs.org/en/download)** (Latest version recommended)
- **[MySQL](https://dev.mysql.com/downloads/)** or use **[Aiven](https://aiven.io/)**

---

## Installation Instructions

### 1. Clone the Repository

Clone the `Portfolio-Tracker` repository to your local development environment:

```bash
git clone https://github.com/sahilpatel2712/Portfolio-Tracker.git
cd Portfolio-Tracker
```

---

### 2. Set Up Backend

#### a. Navigate to the backend directory:

```bash
cd portfolio-tracker-backend
```

#### b. Install Dependencies:

```bash
npm install
```

#### c. Configure Environment Variables:

Create a `.env` file in the `portfolio-tracker-backend` directory and add the following variables:

```env
DATABASE_URL="<Your MySQL Database Connection URL>"
JWT_SECRET="<Your Secret Key>"
FINNHUB_TOKEN="<Your Finnhub API Token>"
```

- Use **[Aiven](https://aiven.io/)** for hosting your MySQL database.
- Obtain your **[Finnhub API Token](https://finnhub.io/)**.

#### d. Migrate the Database Schema:

```bash
npx prisma migrate deploy
```

#### e. Generate Prisma Client:

```bash
npx prisma generate
```

#### f. Start the Development Server:

Run the backend application locally:

```bash
npm run dev
```

Your backend will be accessible at [http://localhost:3000](http://localhost:3000).

#### g. Build and Start the Backend:

For production or deployment, build and start the project:

```bash
npm run build
npm start
```

---

### 3. Set Up Frontend

#### a. Navigate to the Frontend Directory:

```bash
cd portfolio-tracker-frontend
```

#### b. Install Dependencies:

Install the required Node.js dependencies:

```bash
npm install
```

#### c. Configure Environment Variables:

Create a `.env` file in the `portfolio-tracker-frontend` directory and add the following variable:

```env
VITE_SERVER_URL="http://localhost:3000/" # Backend Base URL
```

#### d. Run the Frontend:

Start the React development server:

```bash
npm run dev
```

Your frontend will be accessible at [http://localhost:5173](http://localhost:5173) (or the port configured).

---

## Features

- Track and manage investments with ease.
- Stock price updates using Finnhub API.
- User authentication and secure JWT-based authorization.
- Responsive and intuitive user interface.

---

## [API Documentation](https://github.com/sahilpatel2712/Portfolio-Tracker/tree/main/portfolio-tracker-backend/Documentation.md)