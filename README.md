# Slope Stability Monitoring System (OPM)

This project was developed for the Smart India Hackathon (SIH). It uses real-time geotechnical sensor data and AI models to predict slope failures in open pit mines. The backend is built with Django REST framework and the frontend uses React.

## File Structure

```
opm/
├── backend/
│   ├── backend/             # Django project folder
│   ├── api/                 # Django app with views and serializers
│   ├── manage.py
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── public/              # React public files (index.html, etc.)
│   ├── src/                 # React source files
│   │   ├── components/      # React components
│   │   ├── services/        # API client services
│   │   └── styles/          # CSS stylesheets
│   ├── package.json         # Node dependencies and scripts
│   └── node_modules/        # Installed Node packages
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
pip install -r requirements.txt
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

## Notes

- Make sure the backend is running before starting the frontend to avoid API errors.
- The frontend communicates with the backend at port 8000 by default.
- The backend is a scaffold and not fully configured with the core programming logic. Currently working on integrating AI models and data processing code into the Django views.

