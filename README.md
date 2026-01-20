# User Management System

A professional full-stack application built with React and Node.js (Express) for managing users with complete CRUD operations, persistent storage, and a modern UI.

## ✨ Features

### Core Functionality
- ✅ **View Users** - Display all users in a beautiful card layout
- ✅ **Add Users** - Create new users with name and email
- ✅ **Edit Users** - Update existing user information
- ✅ **Delete Users** - Remove users with confirmation
- ✅ **Persistent Storage** - Data saved to JSON file (survives server restarts)

### User Experience
- ✅ **Form Validation** - Real-time validation for name and email fields
- ✅ **Success Notifications** - Visual feedback for successful operations
- ✅ **Error Handling** - Comprehensive error messages and handling
- ✅ **Loading States** - Visual indicators during API calls
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ✅ **Modern UI** - Beautiful gradients, animations, and smooth transitions
- ✅ **Real-time Updates** - UI updates instantly without page reload

## 📁 Project Structure

```
fullstack-users-app/
├── server/                    # Node.js Express backend
│   ├── server.js             # Main server file with CRUD endpoints
│   ├── data/                 # Data storage directory
│   │   └── users.json        # Persistent user data (auto-created)
│   └── package.json
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UserList.js   # User list component with edit/delete
│   │   │   ├── UserList.css
│   │   │   ├── UserForm.js   # Form component (add/edit)
│   │   │   └── UserForm.css
│   │   ├── services/
│   │   │   └── userService.js # API service layer
│   │   ├── App.js            # Main app component
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## 🚀 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**

## 📦 Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`
   - Data will be automatically saved to `server/data/users.json`

### Frontend Setup

1. Open a **new terminal** and navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The application will automatically open in your browser at `http://localhost:3000`

## 🔌 API Endpoints

### GET /api/users
Returns a list of all users.

**Response:**
```json
[
  {
    "id": 1,
    "name": "NIMNAKA",
    "email": "nimnaka@email.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### GET /api/users/:id
Get a single user by ID.

**Response:**
```json
{
  "id": 1,
  "name": "NIMNAKA",
  "email": "nimnaka@email.com",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### POST /api/users
Creates a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:35:00.000Z"
}
```

### PUT /api/users/:id
Updates an existing user.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "createdAt": "2024-01-15T10:35:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

### DELETE /api/users/:id
Deletes a user.

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "usersCount": 5,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **File System (fs)** - JSON file storage

### Frontend
- **React 18** - UI library
- **CSS3** - Modern styling with animations
- **Fetch API** - HTTP requests

## 💡 Features Implemented

### Functional Requirements
- ✅ Complete CRUD operations (Create, Read, Update, Delete)
- ✅ Persistent data storage (JSON file)
- ✅ Real-time UI updates
- ✅ Form validation
- ✅ Error handling

### Code Quality
- ✅ Clean, modular code structure
- ✅ Separation of concerns (components/services)
- ✅ Proper error handling and validation
- ✅ Consistent code style

### Professional Features
- ✅ Success/error notifications
- ✅ Loading states
- ✅ Smooth animations and transitions
- ✅ Responsive design
- ✅ Professional UI/UX
- ✅ Email format validation
- ✅ Duplicate email prevention (case-insensitive)
- ✅ Confirmation dialogs for delete operations

## 📱 Usage

1. **Start both servers** (backend and frontend)
2. **Open the application** in your browser at `http://localhost:3000`
3. **View users** - See all users in the list
4. **Add user** - Fill in the form and click "Add User"
5. **Edit user** - Click "Edit" button on any user card
6. **Delete user** - Click "Delete" button and confirm
7. **Data persists** - All data is saved to `server/data/users.json`

## 📝 Notes

- **Persistent Storage**: Data is saved to `server/data/users.json` and persists across server restarts
- **Data Directory**: The `server/data/` directory is automatically created on first run
- **CORS**: Enabled on backend to allow frontend requests
- **Proxy**: Frontend proxies API requests to `http://localhost:5000` during development
- **Email Validation**: Email format is validated on both frontend and backend
- **Case Insensitive**: Email comparison is case-insensitive to prevent duplicates

## 🎨 UI Features

- Beautiful gradient backgrounds
- Smooth hover animations
- Card-based user display
- Responsive grid layout
- Success/error alert messages
- Loading indicators
- Form validation feedback
- Professional color scheme

## 🔒 Validation

- **Name**: Required field
- **Email**: Required field + valid email format
- **Duplicate Email**: Prevented (case-insensitive check)
- **Empty Fields**: Validated on both frontend and backend

---

**Built with ❤️ using React and Node.js**
