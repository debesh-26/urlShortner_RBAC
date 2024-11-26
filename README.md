# Admin Dashboard with Role-Based Access Control (RBAC)

A **Role-Based Access Control (RBAC)** system for managing users and their associated URLs. This dashboard is designed for administrators to perform key operations, including deleting users and URLs, updating URLs, and viewing user data. 

The application is built with **React** for the frontend and **Node.js (Express)** for the backend, with **MongoDB** as the database. The application ensures that the logged-in admin is excluded from the displayed list of users.

## Features

- **User Management**:
  - View all users (except the logged-in admin).
  - Delete users.
  
- **URL Management**:
  - View all URLs associated with each user.
  - Update URLs (short ID and redirect URL).
  - Delete URLs.

- **Authentication and Authorization**:
  - JWT-based authentication.
  - Role-based permissions.

## Demo

### Deployed Link
[[ Live Link](https://url-shortner-rbac.vercel.app/)](#)

## Technologies Used

### Frontend
- React.js
- Axios for HTTP requests
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- JWT for Authentication

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

#### Clone the Repository
```bash
$ git clone https://github.com/your-repo/admin-dashboard-rbac.git
$ cd admin-dashboard-rbac
```

#### Install Dependencies

1. Navigate to the backend folder:
   ```bash
   $ cd backend
   $ npm install
   ```

2. Navigate to the frontend folder:
   ```bash
   $ cd ../frontend
   $ npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` folder and include the following:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Running the Application

#### Start Backend
```bash
$ cd backend
$ npm start
```

#### Start Frontend
```bash
$ cd ../frontend
$ npm start
```

### Accessing the Application
Open your browser and go to:
```
http://localhost:3000
```

## Folder Structure

```
admin-dashboard-rbac/
├── backend/               # Backend code
│   ├── controllers/       # Route logic
│   ├── models/            # MongoDB Models
│   ├── routes/            # API routes
│   └── index.js          # Entry point for the backend
├── frontend/              # Frontend code
│   ├── src/
│   │   ├── components/
|   |   ├── pages/          # React components
│   │   ├── App.js         # Main app file
│   │   └── index.js       # Entry point for React
└── README.md
```

## API Endpoints

### User Routes

- **GET /admin/users**
  - Fetch all users (except the logged-in admin).

- **DELETE /admin/users/:userId**
  - Delete a specific user.

### URL Routes

- **PUT /admin/urls/:urlId**
  - Update a URL's short ID and redirect URL.

- **DELETE /admin/urls/delete/:urlId**
  - Delete a specific URL.


## Future Enhancements

- Add search and filtering options for users and URLs.
- Implement pagination for user and URL lists.
- Improve UI/UX with additional styling and animations.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## Contact

For any inquiries or feedback, feel free to reach out:

- **Email**: dmohapatra291@gmail.com
- **GitHub**: [Your GitHub Profile]((https://github.com/debesh-26))
