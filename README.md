# Parking Lot Management System

A full-stack web application for managing parking lots, reservations, and user bookings with real-time availability tracking.

## 🎯 Key Highlights

- 🏗️ **Full-Stack Application**: Flask backend + Vue.js frontend
- 🔐 **Role-Based Access**: Separate admin and user interfaces
- ⚡ **Real-Time Updates**: Live parking spot availability tracking
- 📊 **Analytics Dashboard**: Revenue tracking and usage statistics
- 📧 **Automated Notifications**: Daily reminders and monthly reports via email
- 💾 **Data Export**: CSV export functionality for reservation history
- 🎨 **Modern UI**: Responsive design with Bootstrap 5

## Overview

This application provides a comprehensive parking management solution with separate interfaces for administrators and users. Administrators can manage parking lots and monitor occupancy, while users can book available spots, track their reservations, and view parking history.

## Live Demo

🚀 **Deployed on Render**: The application has been successfully deployed and running in production for 3+ months.

> **Note**: This is an academic project developed for learning purposes.

## Features

### Admin Features
- **Parking Lot Management**: Create, edit, and delete parking lots with customizable spot counts
- **Real-time Monitoring**: View occupied and available spots across all parking lots
- **Spot Management**: Delete individual parking spots and view detailed spot information
- **User Analytics**: Track user reservations and revenue statistics
- **Revenue Dashboard**: Monitor earnings per parking lot with visual summaries
- **User Management**: View all registered users and their booking history

### User Features
- **Spot Booking**: Browse available parking lots and book spots in real-time
- **Reservation History**: View complete parking history with timestamps and costs
- **Cost Calculation**: Real-time cost estimation based on parking duration
- **Spot Release**: Release occupied spots and view final charges
- **CSV Export**: Download personal reservation history as CSV
- **Usage Analytics**: Visual charts showing parking lot usage patterns

### Automated Features
- **Daily Reminders**: Email reminders sent to users who haven't booked parking
- **Monthly Reports**: Automated monthly reservation summaries with usage statistics
- **Cost Calculation**: Automatic hourly rate calculation with minimum 1-hour charge

## Technology Stack

### Backend
- **Framework**: Flask 3.1.1
- **Database**: SQLite with SQLAlchemy ORM
- **Authentication**: Flask-Security-Too with token-based auth
- **API**: Flask-RESTful for REST endpoints
- **Task Queue**: Celery with Redis for background jobs
- **Caching**: Flask-Caching with SimpleCache
- **Email**: SMTP integration for notifications

### Frontend
- **Framework**: Vue.js 2 with Vue Router
- **UI Library**: Bootstrap 5.3.6
- **Icons**: Bootstrap Icons
- **Charts**: Chart.js 4.4.2
- **Architecture**: Single Page Application (SPA)

## Installation

### Prerequisites
- Python 3.8+
- Redis server (for Celery tasks)
- SMTP server (for email notifications)

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/Ritik-Gupta8/Smart-Parking-Management-System.git
cd Smart-Parking-Management-System
```

2. **Create virtual environment**
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment**
The application uses `LocalDevelopmentConfig` by default. Key configurations:
- Database: SQLite (`parking_lot_v2.sqlite3`)
- Secret Key: Update in `application/config.py` for production
- SMTP: Configure in `application/mail.py` for email notifications

5. **Initialize database**
```bash
python app.py
```
The database and default admin user will be created automatically on first run.

6. **Start Redis server** (optional - for background tasks)
```bash
# On Windows: Download and run Redis from https://github.com/microsoftarchive/redis/releases
# On Linux: 
redis-server
# On Mac:
brew services start redis
```

7. **Start Celery worker** (optional - in separate terminal)
```bash
celery -A app.celery worker --loglevel=info
```

8. **Start Celery beat** (optional - for scheduled tasks, in separate terminal)
```bash
celery -A app.celery beat --loglevel=info
```

9. **Run the application**
```bash
python app.py
```

The application will be available at `http://localhost:5000`

> **Note**: Steps 6-8 are optional. The application works without Celery for basic functionality. Celery is only needed for background tasks like email reminders and CSV exports.

## Project Structure

```
parking-lot-app/
├── app.py                      # Application entry point
├── celery_config.py            # Celery configuration
├── requirements.txt            # Python dependencies
├── application/
│   ├── config.py              # App configuration
│   ├── database.py            # Database initialization
│   ├── models.py              # SQLAlchemy models
│   ├── resources.py           # REST API endpoints
│   ├── routes.py              # Flask routes
│   ├── task.py                # Celery background tasks
│   ├── utily.py               # Utility functions
│   ├── cache.py               # Cache configuration
│   └── mail.py                # Email service
├── static/
│   ├── Script.js              # Vue.js app entry
│   ├── components/            # Vue components
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Admin_dash.js
│   │   ├── User_dash.js
│   │   └── ...
│   ├── Images/
│   └── styles/
│       └── main.css
├── templates/
│   ├── index.html             # Main HTML template
│   ├── mail.html              # Monthly report template
│   └── daily_reminder.html    # Daily reminder template
└── instance/
    └── parking_lot_v2.sqlite3 # SQLite database
```

## Database Schema

### User
- Authentication and profile information
- Role-based access (admin/user)
- Linked to reservations

### ParkingLot
- Location details (name, address, pincode)
- Pricing per hour
- Maximum spot capacity
- Contains multiple parking spots

### ParkingSpot
- Status: Available (A) or Occupied (O)
- Belongs to a parking lot
- Linked to reservations

### Reservation
- User and spot association
- Vehicle number
- Parking and leaving timestamps
- Cost calculation (hourly rate × duration)

### Role & UserRoles
- Role-based access control
- Admin and user roles

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `GET /api/me` - Current user info

### Parking Lots
- `GET /api/lots` - List all parking lots
- `GET /api/lots/<id>` - Get specific lot
- `POST /api/lots` - Create lot (admin)
- `PUT /api/lots/<id>` - Update lot (admin)
- `DELETE /api/lots/<id>` - Delete lot (admin)

### Spots
- `DELETE /api/spots/<id>` - Delete spot (admin)
- `GET /api/spot_info/<id>` - Get occupied spot details

### Reservations
- `GET /api/my_reservations` - User's reservation history
- `POST /api/reservations` - Create reservation
- `DELETE /api/reservations/<id>` - Release spot
- `GET /api/reservations/<id>/cost_now` - Get current cost

### Analytics
- `GET /api/admin_summary` - Admin dashboard data
- `GET /api/user_summary` - User usage statistics
- `GET /api/users` - List all users (admin)

### Export
- `GET /api/user/export` - Trigger CSV export
- `GET /api/csv_result/<id>` - Download CSV file

## Background Tasks

### Daily Reminder (6:00 PM)
Sends email reminders to users who haven't made a reservation for the day.

### Monthly Report (1st of each month)
Generates and emails comprehensive monthly reports including:
- Total bookings and spending
- Most frequently used parking lot
- Detailed reservation history

## Cost Calculation

- Minimum charge: 1 hour
- Billing: Hourly rate × ceiling(duration in hours)
- Real-time cost estimation available while parked
- Final cost calculated upon spot release

## Security Features

- Password hashing with bcrypt
- Token-based authentication
- Role-based access control
- CSRF protection (configurable)
- Secure session management

## Default Credentials

The application creates a default admin account on first run. For security reasons, credentials are not published here. Please check the application setup code or contact the repository owner for initial access.

**Note:** Always change default credentials immediately after first login!

## Development

### Running in Debug Mode
The application runs in debug mode by default (`DEBUG = True` in `LocalDevelopmentConfig`).

### Database Migrations
The app uses `db.create_all()` for schema creation. For production, consider using Flask-Migrate for proper migrations.

### Caching
Caching is configured but commented out in some endpoints. Uncomment `@cache.cached()` decorators to enable caching.

## Production Deployment

1. Update `config.py` with production settings
2. Change default admin credentials
3. Use PostgreSQL or MySQL instead of SQLite
4. Configure proper SMTP server
5. Set up Redis for production
6. Use Gunicorn as WSGI server:
```bash
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```
7. Set up reverse proxy (Nginx/Apache)
8. Enable HTTPS
9. Configure proper secret keys and salts

## License

MIT License - Copyright (c) 2026 Ritik Gupta

See [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue in the repository.
