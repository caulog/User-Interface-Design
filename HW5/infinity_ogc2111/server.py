from flask import Flask, render_template, jsonify, request

app = Flask(__name__, static_folder='static', template_folder='templates')

# Sample sales data
sales = [
    {"salesperson": "James D. Halpert", "client": "Shake Shack", "reams": 100},
    {"salesperson": "Stanley Hudson", "client": "Toast", "reams": 400},
    {"salesperson": "Michael G. Scott", "client": "Computer Science Department", "reams": 1000},
]

# Route for welcome page
@app.route('/')
def welcome():
    return render_template('welcome.html')

# Route for log sales page
@app.route('/infinity')
def log_sales():
    return render_template('log_sales.html')

# API endpoint to get sales data
@app.route('/get_sales')
def get_sales():
    return jsonify(sales)

# API endpoint to add a sale
@app.route('/add_sale', methods=['POST'])
def add_sale():
    global sales
    data = request.get_json()
    new_sale = {
        "salesperson": "Dwight Schrute",  # Default salesperson
        "client": data["client"],
        "reams": data["reams"]
    }
    sales.append(new_sale)
    return jsonify(sales)

# API endpoint to delete a sale
@app.route('/delete_sale', methods=['POST'])
def delete_sale():
    global sales
    data = request.get_json()
    index = data.get("index")
    if index is not None and 0 <= index < len(sales):
        del sales[index]
    return jsonify(sales)

if __name__ == '__main__':
    app.run(debug=True)
