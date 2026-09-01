from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

sentiment_analyzer = pipeline("sentiment-analysis")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    review = data.get("review")

    result = sentiment_analyzer(review)[0]

    return jsonify({
        "sentiment": result["label"],
        "confidence": float(result["score"])
    })

app.run(port=5000)