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
    return render_template('log_sales.html', data=sales)  


# AJAX FUNCTIONS

# ajax for people.js
@app.route('/add_name', methods=['GET', 'POST'])
def add_name():
    global data 
    global current_id 

    json_data = request.get_json()   
    name = json_data["name"] 
    
    # add new entry to array with 
    # a new id and the name the user sent in JSON
    current_id += 1
    new_id = current_id 
    new_name_entry = {
        "name": name,
        "id":  current_id
    }
    data.append(new_name_entry)

    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(data = data)
 


if __name__ == '__main__':
   app.run(debug = True, port=5001)




