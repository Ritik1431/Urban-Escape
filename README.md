Here’s a README file for your hotel booking website project:

---

# Hotel Booking Website

## Overview

This project is a full-stack hotel booking website, designed to provide users with a seamless experience for browsing, booking, and reviewing hotels. The application integrates a RESTful backend with a responsive frontend, ensuring scalability, maintainability, and a user-friendly interface.

## Features

- **User Authentication**: Secure login and registration using Passport.js.
- **Hotel Listings**: Browse, filter, and view details of available hotels.
- **Booking System**: Users can book rooms in hotels, with data stored in MongoDB.
- **Reviews and Ratings**: Users can leave reviews and ratings for hotels.
- **REST API**: Full CRUD operations on hotels and reviews via RESTful endpoints.
- **Responsive Design**: Frontend built with Bootstrap for a mobile-friendly interface.

## Technologies Used

### Backend
- **Express.js**: Core framework for building the web application.
- **Mongoose**: ODM for MongoDB, handling data modeling and schema validation.
- **MongoDB**: Database for storing user information, bookings, and reviews.
- **Passport.js**: Authentication middleware for secure user login and session management.
- **express-session**: Session management for user persistence.
- **Connect-flash**: Flash messages for user feedback.
- **WrapSync**: Manages asynchronous operations efficiently.

### Frontend
- **EJS**: Templating engine for rendering dynamic HTML pages.
- **Bootstrap**: Responsive design framework for a consistent and modern user interface.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ritik1431/Urban-Escape
   cd hotel-booking-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MongoDB:**
   - Ensure MongoDB is running locally or provide a connection string to a remote MongoDB instance.
   - Update the `MONGO_URL` in `app.js` if necessary.

4. **Run the application:**
   ```bash
   node app.js
   ```

5. **Access the application:**
   - Navigate to `http://localhost:8080` in your browser.

## REST API Endpoints

- **POST /listings**: Create a new hotel listing.
- **GET /listings**: Retrieve all hotel listings.
- **GET /listings/:id**: Retrieve a specific hotel listing.
- **PUT /listings/:id**: Update an existing hotel listing.
- **DELETE /listings/:id**: Delete a specific hotel listing.
- **POST /listings/:id/reviews**: Add a review to a hotel.
- **DELETE /listings/:id/reviews/:reviewId**: Delete a specific review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize the repository link, license, or any other specific details as needed.
