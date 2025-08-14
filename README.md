# Think Board

Think Board is a full-stack web application for creating, managing, and organizing notes. It provides a simple and intuitive interface for users to capture their thoughts, ideas, and important information.

## Project Structure

The project follows a modern full-stack architecture with separate frontend and backend components:

## Technologies Used

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Dotenv** - Environment variable management
- **Cors** - Cross-origin resource sharing
- **Upstash Redis** - Rate limiting

### Frontend

- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **Vite** - Build tool and development server

## Features

- Create, read, update, and delete notes
- Responsive design for desktop and mobile devices
- Real-time updates
- Simple and intuitive user interface

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/think-board.git
   cd think-board
   ```

Set up environment variables.Create a .env file in the backend directory with the following variables:

PORT=5001
MONGODB_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

Install dependencies:

# Backend

cd backend
npm install

# Frontend

cd ../frontend
npm install

Start the application:

# Backend

cd backend
npm start

# Frontend

cd ../frontend
npm run dev

# Access the application

Open your browser and navigate to http://localhost:5173 to access the Think Board application.
