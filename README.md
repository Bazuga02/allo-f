
# Allo Meals: React-based Meal Selection Web App
# Project Overview

This project is a React-based web application designed for meal selection. It includes features such as user authentication, meal filtering by tags, dynamic pricing, and integration with a backend server. The site is deployed and accessible at [https://allo-meals.netlify.app/](https://allo-meals.netlify.app/). Please note that as it's hosted on a free service, it may take a few seconds to load initially.

## Key Features

- **User Authentication**: Allows users to sign up and log in securely.
- **Meal Selection**: Users can select meals for two persons, with options filtered by tags.
- **Dynamic Pricing**: Real-time calculation of total prices based on selected meals.
- **Responsive Design**: Ensures optimal viewing experience across various devices.
- **Animation and Notifications**: Utilizes React Lottie for animations and React Hot Toast for user notifications.

## Setup and Test Locally

### Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v12.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- MongoDB installed and running locally (for backend setup)

### Local Setup Instructions

1. **Clone the Frontend and Backend Repositories:**

   Create a project folder and clone both repositories into it:

   ```bash
   mkdir allo-meals-project
   cd allo-meals-project

   # Clone frontend repository
   git clone https://github.com/Bazuga02/allo-f.git frontend

   # Clone backend repository
   git clone https://github.com/Bazuga02/allo-b.git backend
   ```

2. **Setup Backend (Node.js and MongoDB):**

   ```bash
   cd backend
   npm install
   ```

   Ensure MongoDB is running locally. Configure MongoDB URI in `backend/.env` file if necessary.

3. **Run Backend Server:**

   ```
   npm start
   ```

   The backend server should now be running on [http://localhost:1000](http://localhost:1000).

4. **Setup Frontend (React):**

   ```bash
   cd ../frontend
   npm install
   ```

5. **Run Frontend Development Server:**

   ```bash
   npm start
   ```

   The frontend development server should now be running on [http://localhost:3000](http://localhost:3000).

## API Responses

### Meals Endpoint (`/meals`)
This endpoint provides JSON responses for meals and labels fetched from `meals-data`.

### Authentication Endpoints (Login and Signup)

Endpoints for user authentication using MongoDB are implemented in the backend.

## Additional Notes

- **React Lottie Animation**: Used for animated visuals in the UI.
- **React Hot Toast**: Provides toast notifications for user interactions.
- **Responsive Design**: Ensures the application adapts well to different screen sizes.
