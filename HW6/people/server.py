from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


current_id = 2
fav_cafes = ["1", "3", "6"]
data = [
    {
  "1": {
    "id": "1",
    "name": "Irving Farm UWS",
    "image": "https://media.timeout.com/images/100523819/750/422/image.jpg",
    "address": "224 W 79th St, New York, NY 10024",
    "description": "Irving Farm UWS is a spacious cafe in the Upper West Side, known for its high-quality coffee and welcoming atmosphere. It offers ample seating, including communal tables and booths, making it a great spot for remote workers. While the cafe has ample outlets and is meeting-friendly, it lacks Wi-Fi, so it's best for those who bring their own hotspot. The natural lighting and moderate noise level create a comfortable work environment for extended stays.",
    "rating": 4.3,
    "outlets": "ample",
    "wifi": "no",
    "meeting_friendly": "yes",
    "food": "yes",
    "drink": "yes",
    "pastry": "yes",
    "seating_type": ["communal tables", "booths"],
    "noise_level": "moderate",
    "lighting": "natural light",
    "similar_cafes": ["2", "3", "45"]
  },
  "2": {
    "id": "2",
    "name": "Gem Home",
    "image": "https://assets.vogue.com/photos/6719690afa24f23f9c19c41d/master/w_2560%2Cc_limit/seandavidson_gemhome_29.jpg",
    "address": "116 Forsyth St, New York, NY 10002",
    "description": "Gem Home is a cozy and aesthetic coffee shop in the Lower East Side, known for its minimalistic design and curated selection of drinks. With bright natural lighting and a quiet ambiance, it's an excellent spot for deep focus work. However, seating is somewhat limited, making it better suited for short work sessions rather than all-day stays. The cafe does not have many outlets, so it's best for those who don't need frequent charging.",
    "rating": 4.6,
    "outlets": "bad",
    "wifi": "yes",
    "meeting_friendly": "no",
    "food": "no",
    "drink": "yes",
    "pastry": "no",
    "seating_type": ["small tables", "counter seating"],
    "noise_level": "quiet",
    "lighting": "bright natural light",
    "similar_cafes": ["3", "5", "7"]
  },
  "3": {
    "id": "3",
    "name": "Cafe Flor",
    "image": "https://images.happycow.net/venues/1024/41/09/hcmp410952_2994162.jpeg",
    "address": "280 W 14th St, New York, NY 10014",
    "description": "Located in the heart of the West Village, Cafe Flor offers a European-style cafe experience with a relaxed atmosphere. It's a great place for remote workers who need strong Wi-Fi and a variety of seating options. With moderate noise levels and plenty of natural light, it's an ideal space for productivity. The cafe also serves a delicious selection of food and drinks, making it a good spot for long work sessions.",
    "rating": 4.5,
    "outlets": "good",
    "wifi": "yes",
    "meeting_friendly": "yes",
    "food": "yes",
    "drink": "yes",
    "pastry": "yes",
    "seating_type": ["communal tables", "outdoor seating"],
    "noise_level": "moderate",
    "lighting": "natural light",
    "similar_cafes": ["2", "6", "9"]
  },
  "4": {
    "id": "4",
    "name": "Daily Provisions UWS",
    "image": "https://cdn.vox-cdn.com/thumbor/agX2zDbGHOiZasUsEXfjLdh1HLI=/0x0:2500x1721/1200x800/filters:focal(1050x661:1450x1061)/cdn.vox-cdn.com/uploads/chorus_image/image/65369589/2019_09_30_USHG_FSP2602_JPEG_2500px_DB.0.jpg",
    "address": "375 Amsterdam Ave, New York, NY 10024",
    "description": "Daily Provisions UWS is a casual and inviting cafe offering some of the best pastries and coffee in the Upper West Side. While it’s a great place to grab a quick bite, seating is limited, making it less ideal for long work sessions. However, the Wi-Fi is reliable, and the bright atmosphere is perfect for a short productivity boost. The space can get crowded during peak hours, so early mornings are the best time to work here.",
    "rating": 4.4,
    "outlets": "bad",
    "wifi": "yes",
    "meeting_friendly": "no",
    "food": "yes",
    "drink": "yes",
    "pastry": "yes",
    "seating_type": ["small tables", "counter seating"],
    "noise_level": "loud",
    "lighting": "bright artificial light",
    "similar_cafes": ["1", "3", "7"]
  },
  "5": {
    "id": "5",
    "name": "Hungarian Pastry Shop",
    "image": "https://static.wixstatic.com/media/7aaea5_78e558ccbf59433c98368fb4427960c8~mv2.jpg/v1/fill/w_640,h_480,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/7aaea5_78e558ccbf59433c98368fb4427960c8~mv2.jpg",
    "address": "1030 Amsterdam Ave, New York, NY 10025",
    "description": "A beloved Columbia University hangout, Hungarian Pastry Shop is known for its delicious baked goods and intellectual crowd. The cafe does not have Wi-Fi, but it provides an old-school charm and a distraction-free environment for reading or writing. With ample seating and a warm ambiance, it’s a great space for independent work. However, it’s not the best choice for virtual meetings due to its popularity and noise levels.",
    "rating": 4.7,
    "outlets": "good",
    "wifi": "no",
    "meeting_friendly": "no",
    "food": "yes",
    "drink": "yes",
    "pastry": "yes",
    "seating_type": ["communal tables", "couches"],
    "noise_level": "moderate",
    "lighting": "warm and cozy",
    "similar_cafes": ["2", "4", "6"]
  },
  "6": {
    "id": "6",
    "name": "Think Coffee",
    "image": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/53/7d/4d/photo3jpg.jpg?w=900&h=500&s=1",
    "address": "123 4th Ave, New York, NY 10003",
    "description": "Think Coffee is a go-to spot for NYC remote workers looking for a reliable cafe with good Wi-Fi and plenty of outlets. The spacious seating and relaxed environment make it ideal for longer work sessions. The cafe is also known for its sustainability efforts and ethically sourced coffee. It can get busy during peak hours, but early mornings and late afternoons are usually quieter.",
    "rating": 4.2,
    "outlets": "ample",
    "wifi": "yes",
    "meeting_friendly": "yes",
    "food": "yes",
    "drink": "yes",
    "pastry": "yes",
    "seating_type": ["communal tables", "bar seating"],
    "noise_level": "moderate",
    "lighting": "bright artificial light",
    "similar_cafes": ["1", "3", "5"]
  }, 
  "7": {
        "id": "7",
        "name": "Bibliotheque",
        "image": "https://cdn.prod.website-files.com/63e1538a40b51fa38c1b20fe/657ca5f5d2ebb92c60541965_Unknown-2.jpeg",
        "address": "45 Mercer St, New York, NY 10013",
        "description": "A quiet haven for book lovers and remote workers, Bibliotheque combines a charming library ambiance with high-quality coffee. Its Wi-Fi is strong, making it a popular choice for students and freelancers alike. The cafe has a mix of seating options, from individual study nooks to communal tables. It tends to be quiet during the mornings and early afternoons but gets busier in the evenings.",
        "rating": 4.8,
        "outlets": "good",
        "wifi": "yes",
        "meeting_friendly": "no",
        "food": "no",
        "drink": "yes",
        "pastry": "yes",
        "seating_type": ["study nooks", "communal tables"],
        "noise_level": "quiet",
        "lighting": "warm and cozy",
        "similar_cafes": ["1", "6", "9"]
    },
    "8": {
        "id": "8",
        "name": "Pause Cafe",
        "image": "https://www.tagvenue.com/resize/53/76/fit-900-600;45596-entire-venue-room.jpeg",
        "address": "3 Clinton St, New York, NY 10002",
        "description": "Pause Cafe is a laid-back spot with a vibrant and colorful interior. The cafe is great for both work and casual meetups, offering a variety of drinks and Mediterranean-inspired snacks. Outlets are limited, so it's best for shorter work sessions. The Wi-Fi is reliable, and the noise level is usually moderate, making it a decent choice for remote work.",
        "rating": 4.4,
        "outlets": "bad",
        "wifi": "yes",
        "meeting_friendly": "yes",
        "food": "yes",
        "drink": "yes",
        "pastry": "yes",
        "seating_type": ["booths", "window seating"],
        "noise_level": "moderate",
        "lighting": "natural light",
        "similar_cafes": ["2", "4", "6"]
    },
    "9": {
        "id": "9",
        "name": "Urban Backyard",
        "image": "https://images.squarespace-cdn.com/content/v1/5edaf010f96c3956a9022210/1cdbc83d-4c1a-4de0-bccc-ee6b876184cd/UB2022-inside.jpg",
        "address": "180 Mulberry St, New York, NY 10012",
        "description": "Urban Backyard is a charming, eco-friendly cafe with a focus on sustainability and plant-based offerings. The space is small but thoughtfully designed, making it a cozy spot for a quick work session. With good Wi-Fi and a peaceful atmosphere, it's a great choice for solo workers who don't mind the limited seating. Their matcha and specialty lattes are a highlight.",
        "rating": 4.6,
        "outlets": "good",
        "wifi": "yes",
        "meeting_friendly": "no",
        "food": "no",
        "drink": "yes",
        "pastry": "yes",
        "seating_type": ["counter seating", "small tables"],
        "noise_level": "quiet",
        "lighting": "soft natural light",
        "similar_cafes": ["3", "7", "10"]
    },
    "10": {
        "id": "10",
        "name": "Georgie's",
        "image": "https://images.squarespace-cdn.com/content/v1/6706df485e8ac00b3501747c/1569f5ae-9a9c-444a-84e3-e1fb959d7612/georgies+cafe+bar+nyc+les.png?format=2500w",
        "address": "37 E 8th St, New York, NY 10003",
        "description": "Georgie's is a stylish, modern cafe with great Wi-Fi and plenty of seating. It's popular among students and remote workers due to its reliable connectivity and comfortable chairs. The cafe serves a wide variety of drinks and pastries, making it a good all-day work location. However, it can get quite busy during peak hours, so finding a seat might be a challenge.",
        "rating": 4.5,
        "outlets": "ample",
        "wifi": "yes",
        "meeting_friendly": "yes",
        "food": "yes",
        "drink": "yes",
        "pastry": "yes",
        "seating_type": ["couches", "communal tables"],
        "noise_level": "moderate",
        "lighting": "bright artificial light",
        "similar_cafes": ["2", "6", "8"]
    },
}
]

# ROUTES

@app.route('/')
def home():
    # Prepare the favorite cafes data
    fav_cafes_data = [data[0][cafe_id] for cafe_id in fav_cafes]

    return render_template('home.html', fav_cafes=fav_cafes_data)


@app.route('/cafe')
def cafe():
    return render_template('cafe.html', cafes=data)


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '').lower()  # Get search query from the URL
    results = []

    # If the query is empty or just whitespace, don't perform the search
    if not query:
        return render_template('cafe.html')

    # Otherwise, search for cafes matching the query in their name
    # Loop through each cafe in the list of cafes
    for cafe_dict in data:
        # Loop through each cafe in the nested dictionary (by id)
        for cafe_id, cafe_info in cafe_dict.items():
            if query in cafe_info["name"].lower():  # Case-insensitive search
                results.append(cafe_info)


    return render_template('search_results.html', query=query, results=results)


@app.route('/view/<int:id>')
def view(id):
    # Iterate through the list to find the cafe by ID
    cafe = None
    for cafe_item in data:
        # Access each cafe by key (which is the string of the number, e.g., '1', '2', etc.)
        if cafe_item.get(str(id)):
            cafe = cafe_item[str(id)]
            break  # Stop the loop once the correct cafe is found

    if cafe:
        return render_template('view.html', cafe=cafe)
    else:
        return "Cafe not found", 404


# AJAX FUNCTIONS

# ajax for people.js
@app.route('/add_name', methods=['GET', 'POST'])
def add_name():
    global data 
    global current_id 

    json_data = request.get_json()   
    name = json_data["name"] 
    
    print(json_data)

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




