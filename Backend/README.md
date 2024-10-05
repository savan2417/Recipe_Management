# Kitchen Recipe App Backend

Welcome to the Kitchen Recipe App Backend! This repository contains the backend code for a recipe management application.

## Description

This backend application provides various functionalities for managing user accounts and recipes. It allows users to register, login, reset passwords, and perform CRUD operations on recipes.

## Features

- User Authentication: Allows users to register an account and login securely.
- Password Reset: Enables users to request password reset links via email.
- Recipe Management: Provides endpoints for creating, updating, deleting, and retrieving recipes.
- User Management: Allows administrators to list all users registered in the system.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer (for sending emails)
- Bcrypt.js (for password hashing)

## Setup Instructions

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the root directory and provide the following variables:

    ```
    EMAIL_ID=<your-email-id>
    EMAIL_PASS=<your-email-password>
    RESET_LINK=<password-reset-link>
    ```

4. **Start the server:**
    ```bash
    npm start
    ```

5. **Access the API:**

    The API will be accessible at `http://localhost:your-port/api/v1`.

## API Endpoints

### User Routes

- `POST /api/v1/users/register`: Register a new user.
- `POST /api/v1/users/login`: Login with username and password.
- `GET /api/v1/users/list-all-users`: Get a list of all registered users.
- `POST /api/v1/users/forgotPassword`: Request password reset link.
- `PUT /api/v1/users/resetPassword`: Reset user password.

### Recipe Routes

- `GET /api/v1/recipe/`: Get all recipes.
- `POST /api/v1/recipe/create`: Create a new recipe.
- `PUT /api/v1/recipe/save`: Save a recipe.
- `GET /api/v1/recipe/savedRecipes/ids/:userId`: Get IDs of saved recipes for a user.
- `GET /api/v1/recipe/savedRecipes/:userId`: Get saved recipes for a user.
- `GET /api/v1/recipe/userRecipes/:userId`: Get recipes created by a user.
- `GET /api/v1/recipe/:id`: Get a recipe by ID.
- `DELETE /api/v1/recipe/delete/:recipeId`: Delete a recipe.
- `PUT /api/v1/recipe/update/:recipeId`: Update a recipe.
- `PUT /api/v1/recipe/removeSaved/:recipeId/:userId`: Remove a saved recipe for a user.

## Contributors

- [Harikaran](https://github.com/HarikaranSubramanian)

