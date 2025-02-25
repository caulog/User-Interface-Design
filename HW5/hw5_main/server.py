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
current_id = 3
sales = [
  {
    "id": 1,
    "salesperson": "James D. Halpert",
    "client": "Shake Shack",
    "reams": 100
  },
  {
    "id": 2,
    "salesperson": "Stanley Hudson",
    "client": "Toast",
    "reams": 400
  },
  {
    "id": 3,
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
    global sales
    global clients
    global current_id

    json_data = request.get_json()  
    salesperson = "Dwight Schrute"
    client = json_data["client"]
    reams = json_data["reams"]

    current_id += 1
    new_sales_entry = {
        "id": current_id,
        "salesperson": salesperson,
        "client" : client,
        "reams" : reams
    }

    # add new sale to front of array
    sales.insert(0, new_sales_entry)

    if client not in clients:
      clients.append(client)
      print(clients)
      
    return jsonify(sales=sales, clients=clients)

 # ajax for people.js
@app.route('/delete_sale', methods=['GET', 'POST'])
def delete_sale():
    global sales

    json_data = request.get_json()
    sale_id = int(json_data["id"])  # Convert the sale ID to an integer

    # Remove the sale with the matching ID
    sales = [sale for sale in sales if sale["id"] != sale_id]

    return jsonify(sales=sales)

if __name__ == '__main__':
   app.run(debug = True, port=5001)




