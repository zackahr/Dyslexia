# Dyslexia Research Application

A comprehensive full-stack application designed for dyslexia research and participant management. This system allows researchers to manage participants, create games, and track play sessions with PDF materials.

## 🎯 Overview

This application is built to support dyslexia research by providing:
- **Participant Management**: Comprehensive participant registration and profile management
- **Game Creation**: Create and manage educational games with PDF attachments
- **Play Session Tracking**: Monitor and record participant interactions with games
- **User Authentication**: Secure access with role-based permissions
- **File Management**: Upload and manage PDF materials using GridFS

## 🏗️ Architecture

The application follows a modern full-stack architecture:

- **Frontend**: React.js with Material-UI for responsive user interface
- **Backend**: NestJS with TypeScript for robust API development
- **Database**: MongoDB with Mongoose ODM for data persistence
- **File Storage**: GridFS for efficient PDF file management
- **Authentication**: JWT-based authentication with Passport.js
- **Containerization**: Docker and Docker Compose for easy deployment

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks
- **Material-UI 6.3.0** - Google's Material Design components
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API communication
- **React Router DOM** - Client-side routing
- **React Hook Form** - Performant forms with validation
- **React Input Mask** - Input formatting and validation

### Backend
- **NestJS 10.0.0** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript development
- **MongoDB with Mongoose** - NoSQL database with ODM
- **Passport.js & JWT** - Authentication and authorization
- **GridFS** - File storage for large documents
- **Multer** - File upload handling
- **Class Validator** - Input validation

### DevOps & Tools
- **Docker & Docker Compose** - Containerization and orchestration
- **ESLint** - Code linting and formatting
- **Jest** - Testing framework
- **Makefile** - Build automation

## 📦 Project Structure

```
dyslexia/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── game/           # Game management
│   │   ├── player/         # Participant management
│   │   ├── play/           # Play session tracking
│   │   ├── user/           # User management
│   │   └── main.ts         # Application entry point
│   ├── Dockerfile
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── utils/          # Utility functions
│   │   └── main.jsx        # React entry point
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Multi-container configuration
├── Makefile               # Build and deployment commands
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (optional)
- **MongoDB** (if running locally)

### Installation

#### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dyslexia
   ```

2. **Start the application with Docker**
   ```bash
   make up
   # or
   docker-compose up --build -d
   ```

3. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3000
   - MongoDB: localhost:27017

#### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dyslexia
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Start MongoDB**
   ```bash
   make up  # Start only MongoDB
   # or manually start your local MongoDB instance
   ```

4. **Start the backend**
   ```bash
   cd backend
   npm run start:dev
   ```

5. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173 (Vite dev server)
   - Backend API: http://localhost:3000

## 🎮 Features

### Participant Management
- **Registration**: Add new participants with comprehensive information
- **Profile Management**: Store personal details, educational background, and contact information
- **Demographics**: Track age, gender, school, and location data
- **Parent/Guardian Information**: Maintain contact details for minors

### Game Management
- **Game Creation**: Create educational games with descriptions and metadata
- **PDF Attachments**: Upload and attach PDF materials to games
- **Game Library**: Browse and manage all available games
- **File Management**: Efficient storage and retrieval of large PDF files

### Play Session Tracking
- **Session Recording**: Track participant interactions with games
- **Data Collection**: Gather research data from play sessions
- **Progress Monitoring**: Monitor participant progress over time

### User Interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Material Design**: Modern, accessible UI components
- **Intuitive Navigation**: Easy-to-use interface for researchers
- **Data Visualization**: Clear presentation of participant and game data

## 📚 API Endpoints

### Authentication
- `POST /auth/login` - User authentication
- `POST /auth/logout` - User logout

### Players
- `GET /players` - List all participants
- `POST /players` - Create new participant
- `PUT /players/:id` - Update participant
- `DELETE /players/:id` - Delete participant

### Games
- `GET /games` - List all games
- `POST /games` - Create new game
- `PUT /games/:id` - Update game
- `DELETE /games/:id` - Delete game
- `POST /games/:id/upload` - Upload PDF to game

### Play Sessions
- `GET /play` - List play sessions
- `POST /play` - Create play session
- `PUT /play/:id` - Update play session

## 🛠️ Development

### Available Scripts

#### Backend
```bash
npm run start:dev    # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Lint code
```

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
```

#### Docker Commands
```bash
make up              # Start all services
make down            # Stop all services
make restart         # Restart services
make logs            # View container logs
make clean           # Clean up containers and volumes
```

## 🔒 Security

- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation using class-validator
- **CORS Configuration**: Properly configured cross-origin requests
- **Environment Variables**: Sensitive data stored in environment variables

## 📊 Database Schema

### Player Schema
```typescript
{
  playerName: string;
  birthday: Date;
  gender: string;
  schoolName?: string;
  profile?: string;
  city?: string;
  parentName?: string;
  phone?: string;
  email?: string;
}
```

### Game Schema
```typescript
{
  name: string;
  date: Date;
  pdfs?: ObjectId[];  // GridFS file references
}
```

## 🧪 Testing

Run tests for the backend:
```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:cov      # Test coverage
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License - see the package.json file for details.

## 👥 Authors

- Research Team - Initial work

## 🤝 Support

For support and questions, please contact the research team or create an issue in the repository.

## 🔄 Deployment

### Production Deployment

1. **Build the application**
   ```bash
   make up
   ```

2. **Environment Configuration**
   - Set production MongoDB URI
   - Configure JWT secrets
   - Set CORS origins for production

3. **SSL/TLS Configuration**
   - Configure reverse proxy (nginx)
   - Set up SSL certificates
   - Update CORS settings

### Environment Variables

Create `.env` files for each service:

**Backend (.env)**
```env
MONGO_URI=mongodb://mongodb:27017/dyslexia
JWT_SECRET=your-jwt-secret
PORT=3000
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:3000
```

## 📈 Future Enhancements

- Real-time session monitoring
- Advanced analytics and reporting
- Multi-language support
- Enhanced accessibility features
- Mobile application
- Data export capabilities
- Integration with external research tools