# Slope Stability Monitoring System (Open Pit Mine)

This project was developed for the Smart India Hackathon (SIH). It uses real-time geotechnical sensor data and AI models to predict slope failures in open pit mines. The backend is built with Django REST framework and the frontend uses React.

## File Structure

```
opm/
├── backend/
│   ├── backend/             # Django project folder
│   ├── api/                 # Django app with views and serializers
│   ├── manage.py
│   ├── core/                # Core Featues like ML, Send SMS, etc 
│   │   ├── alert/           # Alert Components
│   │       ├── keys.json    # Credentials and Contact Informations
│   │   ├── ml/              # ML Components
├── frontend/
│   ├── public/              # React public files (index.html, etc.)
│   ├── src/                 # React source files
│   │   ├── components/      # React components
│   │   ├── services/        # API client services
│   │   └── styles/          # CSS stylesheets
│   ├── package.json         # Node dependencies and scripts
└── README.md                # This documentation file
```


## Setup Instructions

### Backend

1. Navigate to the backend folder:

```bash
cd opm/backend
```

2. Install Python dependencies:

```bash
pip install django djangorestframework django-cors-headers requests numpy pandas xgboost scikit-learn aiosmtplib
```

3. Run the Django development server:

```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000/api/`

### Frontend

1. Navigate to the frontend folder:

```bash
cd opm/frontend
```

2. (Only required the first time) Install npm packages:

```bash
npm install
```

3. Run the React development server:

```bash
npm start
```

The frontend UI will be available at `http://localhost:3000`

### Configuration: keys.json
This project requires a keys.json file to configure credentials and contact information for alerting and notification features. This file should be placed at:

```bash
opm/backend/core/alert/keys.json
```

#### Purpose

The keys.json file stores sensitive information and worker details needed for:
- Connecting to the Twilio SMS service for alert notifications.
- Email service credentials for email notifications.
- Contact details of workers to notify in their preferred language.

### JSON Structure
Below is the template and explanation of each field you must fill out:
```json
{
  "account_sid": "<Twilio Account SID>",
  "auth_token": "<Twilio Auth Token>",
  "twilio_number": "<Twilio Phone Number>",

  "email": "<Sender Email Address>",
  "email_password": "<Sender Email Password>",

  "worker_emails": ["<Additional Recipient Emails>"],

  "workers": [
    {
      "name": "<Worker Full Name>",
      "phone": "<Worker Phone Number including country code>",
      "email": "<Worker Email Address>",
      "lang": "<Preferred Language Code (e.g., 'en', 'hi', 'ta')>"
    },
    {
      "name": "...",
      "phone": "...",
      "email": "...",
      "lang": "..."
    }
  ]
}
```

## Notes

- Make sure the backend is running before starting the frontend to avoid API errors.
- The frontend communicates with the backend at port 8000 by default.
- The backend is a scaffold and not fully configured with the core programming logic. Currently working on integrating AI models and data processing code into the Django views.

