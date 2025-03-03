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
def welcome():
  return render_template('welcome.html')   


@app.route('/infinity')
def infinity():
  return render_template('log_sales.html', sales=sales, clients=clients)  


# AJAX FUNCTIONS

# ajax for handling new sale
@app.route('/save_sale', methods=['GET', 'POST'])
def save_sale():
  # Neccesary vars
  global sales
  global clients
  global current_id

  # Initialize vars for sales entry
  json_data = request.get_json()  
  salesperson = json_data["salesperson"]
  client = json_data["client"]
  reams = json_data["reams"]

  # Create new sales entry
  current_id += 1
  new_sales_entry = {
    "id": current_id,
    "salesperson": salesperson,
    "client" : client,
    "reams" : reams
  }

  # Add new sale to front of array
  sales.insert(0, new_sales_entry)

  # Update AutoComplete
  if client not in clients:
    clients.append(client)
      
  # Return updated sales and client lists
  return jsonify(sales=sales, clients=clients)


# ajax for handling sale deletion
@app.route('/delete_sale', methods=['GET', 'POST'])
def delete_sale():
  # Neccesary vars
  global sales

  # Initialize vars for sale removal
  json_data = request.get_json()
  # Convert the sale ID to an integer
  sale_id = int(json_data["id"]) 

  # Remove the sale with the matching ID
  sales = [sale for sale in sales if sale["id"] != sale_id]

  # Return the updated sales 
  return jsonify(sales=sales)

if __name__ == '__main__':
  app.run(debug = True, port=5001)




