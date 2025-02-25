from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


# Existing clients
clients = [
  "Shake Shack",
  "Toast",
  "Computer Science Department",
  "Teacher's College",
  "Starbucks",
  "Subsconsious",
  "Flat Top",
  "Joe's Coffee",
  "Max Caffe",
  "Nussbaum & Wu",
  "Taco Bell",
]

# Sales data (Model)
sales = [
  {
    "salesperson": "James D. Halpert",
    "client": "Shake Shack",
    "reams": 100
  },
  {
    "salesperson": "Stanley Hudson",
    "client": "Toast",
    "reams": 400
  },
  {
    "salesperson": "Michael G. Scott",
    "client": "Computer Science Department",
    "reams": 1000
  },
]

# ROUTES

@app.route('/')
def hello_world():
   return render_template('welcome.html')   


@app.route('/infinity')
def people():
    return render_template('log_sales.html', sales=sales, clients=clients)  


# AJAX FUNCTIONS

# ajax for log_sales.js
@app.route('/save_sale', methods=['GET', 'POST'])
def save_sale():

    json_data = request.get_json()  
    salesperson = "Dwight Schrute"
    client = json_data["client"]
    reams = json_data["reams"]

    print(sales)

    new_sales_entry = {
        "salesperson": salesperson,
        "client" : client,
        "reams" : reams
    }

    # add new sale to front of array
    sales.insert(0, new_sales_entry)

    print(sales)

    return jsonify(sales=sales)


 # ajax for people.js
@app.route('/delete_sale', methods=['GET', 'POST'])
def delete_sale():

    json_data = request.get_json()  
    salesperson = "Dwight Schrute"
    client = json_data["client"]
    reams = json_data["reams"]

    print(sales)

    new_sales_entry = {
        "salesperson": salesperson,
        "client" : client,
        "reams" : reams
    }

    # add new sale to front of array
    sales.insert(0, new_sales_entry)

    print(sales)

    return jsonify(sales=sales)


if __name__ == '__main__':
   app.run(debug = True, port=5001)




