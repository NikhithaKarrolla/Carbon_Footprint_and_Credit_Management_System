from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.linear_model import LinearRegression

# ✅ ADDED
from sklearn.metrics import mean_absolute_error, r2_score

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

        # ✅ ADDED METRICS (NO STRUCTURE CHANGE)
        y_pred = model.predict(X)

        mae = mean_absolute_error(y, y_pred)
        r2 = r2_score(y, y_pred)

        print("\n📊 MODEL PERFORMANCE")
        print("MAE:", mae)
        print("R2 Score:", r2)

        # Original prediction
        next_value = model.predict([[len(emissions)]])[0]

        return jsonify({
            "prediction": float(next_value)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(port=5001, debug=True)