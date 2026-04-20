from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        emissions = data.get("emissions", [])

        # 🚨 VALIDATION
        if not emissions or len(emissions) < 2:
            return jsonify({"error": "Not enough data"}), 400

        emissions = list(map(float, emissions))

        # Simple ML model
        X = np.array(range(len(emissions))).reshape(-1, 1)
        y = np.array(emissions)

        model = LinearRegression()
        model.fit(X, y)

        next_value = model.predict([[len(emissions)]])[0]

        return jsonify({"prediction": float(next_value)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(port=5001, debug=True)