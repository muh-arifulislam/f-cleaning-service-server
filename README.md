# Cleaning Service Backend

Live Server: [cleaning-service-server-one.vercel.app](cleaning-service-server-one.vercel.app)

This is the backend server for the Cleaning Service Website, built using **Express.js**. It provides API routes for authentication, customers, orders, users, showcases, services, and reviews. The server uses **MongoDB** via **Mongoose**, supports image uploads via **Multer** and **Cloudinary**, and secures private routes with **JWT authentication**.

## Features

- User authentication with JWT
- CRUD operations for customers, orders, services, and reviews
- Image upload using Multer and Cloudinary
- Secure API routes with JWT token verification
- Logging requests with Morgan
- CORS-enabled for frontend integration
- Helmet for enhanced security

## Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JSON Web Token (JWT)
- **File Storage:** Multer & Cloudinary
- **Security:** Helmet, CORS
- **Logging:** Morgan
- **Environment Variables:** Dotenv

## Installation & Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/muh-arifulislam/f-cleaning-service-server
   cd f-cleaning-service-server
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file and add the following:

   ```env
   PORT=5000
   MONGO_URL=your_mongodb_connection_string
   ACCESS_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the server:
   ```sh
   npm start-dev
   ```

## API Routes

### Authentication (`/api/auth`)

- `POST /auth/login` - Authenticate user with email and password & return JWT token
- `POST /auth/google` - Authenticate user for google login & return JWT token

### Customer (`/api/customer`)

- `GET /customers` - Get all customers

### Order (`/api/order`)

- `GET /orders` - Get all orders
- `POST /orders` - Create a new order
- `PUT /orders/:id` - Update an order

### User (`/api/user`)

- `GET /users` - Get all admin user (protected)
- `POST /users` - add admin user (protected)
- `DELETE /users/:id` - delete admin user (protected)
- `Get /users/me` - Get logged admin user profile (protected)

### Showcase (`/api/showcase`)

- `GET /showcases` - Get all showcase items
- `POST /showcases` - Add a new showcase item (protected)
- `DELETE /showcases/:id` - Delete a showcase item (protected)

### Service (`/api/service`)

- `GET /services` - Get all services

### Review (`/api/review`)

- `GET /reviews` - Get all reviews
- `POST /reviews` - Add a new review
- `PUT /reviews/:id` - Update a review

## Middleware

- **JWT Authentication** for private routes
- **Multer** for file uploads
- **Morgan** for request logging
- **Helmet & CORS** for security

## License

This project is licensed under the MIT License.
