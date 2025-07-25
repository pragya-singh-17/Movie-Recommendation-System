# Movie Recommendation System

A full-stack, content-based movie recommendation system using Python for machine learning and a modern MERN (MongoDB, Express, React, Node.js) web stack for the user interface.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Architecture](#project-architecture)
- [A Note on the Data Layer](#a-note-on-the-data-layer)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

---

## Project Overview

This project recommends movies based on content similarity (genres, keywords, cast, crew, etc.) using a Python machine learning model (scikit-learn, pandas). The backend is served via Flask, and the frontend is a React SPA that communicates with a Node.js/Express backend, which acts as a bridge to the Python API.


>  
> ![Demo Video](Video.mp4)

---

## Project Architecture

The application is split into three main services:

1. **React Frontend (`movie-recommender-ui`):**  
   Responsive UI for users to input a movie title and view recommendations.

2. **Node.js Backend (`mern-backend`):**  
   Express server acting as a bridge between the frontend and Python API, preventing direct CORS issues.

3. **Python ML API (`python-api`):**  
   Flask server loading a pre-trained ML model, exposing an endpoint to return the top 10 most similar movies.

---

## A Note on the Data Layer

This project does **not** use a traditional database like MongoDB for its primary data. Instead, the Python API loads pre-processed `.csv` and `.pkl` files into memory for fast access.  
*For future enhancements, MongoDB could be used to store additional movie metadata (posters, summaries, ratings, etc.).*

---

## Prerequisites

- **Node.js** and **npm**  
  [Download Node.js](https://nodejs.org/) (npm is included)
- **Python 3**  
  [Download Python](https://www.python.org/)
- **pip** (Python package installer)

---

## Getting Started

Follow these steps to run the project locally:

### 1. Download the Dataset

- Download the [TMDB 5000 Movie Dataset](https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata) from Kaggle.
- You need:  
  - `tmdb_5000_credits.csv`  
  - `tmdb_5000_movies.csv`
- Place both files in a `data` folder at the root of your project.

### 2. Prepare the Machine Learning Assets

```bash
# Navigate to your Python API directory
cd python-api

# Install required Python packages
pip install pandas scikit-learn

# Run the data preparation script
python prepare_data.py
```

This will generate two files in `python-api/`:
- `movies_data.csv`
- `similarity.pkl`

### 3. Install Dependencies & Run Servers

You will need **three terminal windows** (one for each service):

#### Terminal 1: Python ML API

```bash
cd python-api
pip install Flask Flask-Cors pandas scikit-learn
python api.py
# API runs at http://127.0.0.1:5000
```

#### Terminal 2: Node.js Backend

```bash
cd mern-backend
npm install
node server.js
# Server runs at http://localhost:8080
```

#### Terminal 3: React Frontend

```bash
cd movie-recommender-ui
npm install
npm start
# App runs at http://localhost:3000
```

You should now be able to use the application in your browser!

---

## Project Structure

```
movie-recommendation-system/
├── mern-backend/
│   ├── node_modules/
│   ├── package.json
│   └── server.js         # Express server (bridge)
│
├── movie-recommender-ui/
│   ├── public/
│   ├── src/
│   │   ├── App.css       # Styles for the React app
│   │   └── App.js        # Main React component
│   └── package.json
│
├── python-api/
│   ├── movies_data.csv   # (Generated) Processed movie data
│   ├── similarity.pkl    # (Generated) Saved similarity matrix
│   ├── api.py            # Flask API for serving recommendations
│   └── prepare_data.py   # Script to process data and create assets
│
└── README.md             # This file
```

---

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Machine Learning API:** Python, Flask
- **ML/Data Libraries:** Pandas, Scikit-learn, NLTK
- **HTTP Client:** Axios
- **Development Tools:** npm, pip