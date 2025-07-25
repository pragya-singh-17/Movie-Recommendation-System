from flask import Flask, request, jsonify
import pandas as pd
import pickle
from flask_cors import CORS # Import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Load the pre-computed data
try:
    movies_df = pd.read_csv('movies_data.csv')
    with open('similarity.pkl', 'rb') as f:
        similarity = pickle.load(f)
except FileNotFoundError:
    print("Error: 'movies_data.csv' or 'similarity.pkl' not found.")
    print("Please run the data preparation script first.")
    exit()


@app.route('/recommend', methods=['GET'])
def recommend():
    # Get movie title from query parameters
    movie_title_from_user = request.args.get('movie')
    
    if not movie_title_from_user:
        return jsonify({'error': 'Movie title is required'}), 400

    # --- CASE-INSENSITIVE SEARCH LOGIC ---
    # Convert user input to lowercase
    movie_title_lower = movie_title_from_user.lower()
    
    # Find all titles in the dataframe that match when converted to lowercase
    matching_movies = movies_df[movies_df['title'].str.lower() == movie_title_lower]

    if matching_movies.empty:
        return jsonify({'error': f"Movie '{movie_title_from_user}' not found in the dataset."}), 404
    
    # Get the index of the first match
    movie_index = matching_movies.index[0]
    # Get the original title from the dataframe to display later
    original_title = movies_df.iloc[movie_index].title
    # --- END OF NEW LOGIC ---

    # Get similarity scores and sort them
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])

    # Get the top 10 recommended movies
    recommended_movies = []
    for i in movies_list[1:11]:
        recommended_movies.append(movies_df.iloc[i[0]].title)
    
    # Return both the recommendations and the original title found
    return jsonify({
        'searched_movie': original_title,
        'recommendations': recommended_movies
    })

if __name__ == '__main__':
    # Run the Flask app on port 5000
    app.run(debug=True, port=5000)
