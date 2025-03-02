# Capitalist Clock Server

This repository contains the web server component for the "Capitalist Clock" art installation. The server manages posts about time-money relationships and provides them to the Arduino component of the installation.

## About the Art Installation

"Capitalist Clock" is an art installation that explores the relationship between time, money, and invisible digital labor. The physical installation consists of an Arduino with an LCD display mounted on a white pedestal with a clock face. This server component handles the backend functionality for the piece.

For more information about the full art installation, visit: [Your Website/Portfolio Link]

## What This Repository Contains

This repository includes:

1. **Node.js Server**: Manages the database of time-money posts
2. **Web Interface**: For adding/managing posts and previewing how they'll appear on the Arduino
3. **API Endpoints**: For the Arduino component to retrieve posts
4. **Arduino Code**: The sketch that runs on the Arduino component of the installation

This code powers the data management aspects of the installation but does not include instructions for the physical construction of the art piece.

## Technical Setup

### Prerequisites

- Node.js (v14+) and npm
- MongoDB (local installation or MongoDB Atlas account)
- Arduino with WiFi capabilities (ESP8266 or ESP32) for the full installation

### Server Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/capitalist-clock-server.git
   cd capitalist-clock-server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env`
   - Update MongoDB connection string

4. **Start the server**:
   ```bash
   npm start
   ```

5. **Access the web interface**:
   Open `http://localhost:3000` in your browser

### Features

- **Web Interface**: For adding and managing posts
- **Sample Generation**: Creates thematic posts about time-money relationships
- **Preview**: Shows how posts will appear on the Arduino display
- **REST API**: Endpoints for the Arduino to consume

## API Endpoints

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post
- `DELETE /api/posts/:id` - Delete a post
- `GET /api/arduino/posts` - Get simplified posts for Arduino
- `GET /api/arduino/fetch-time-idioms` - Generate new sample posts

## Arduino Integration

For the full art installation, an Arduino component connects to this server to display the posts. The Arduino code is included in this repository:

```
ArduinoTweetDisplay.ino
```

You'll need to customize the Arduino code with:
- Your WiFi credentials
- The server's IP address or domain name
- Any hardware-specific configurations

The Arduino sketch handles:
1. Fetching posts from the server
2. Displaying them on the LCD screen
3. Scrolling text that's too long to fit on the display
4. Cycling through available posts
5. Periodically requesting new content

## Sample Posts

The server generates thoughtful posts about time-money relationships with phrases like:
- "Time is money, but money can't buy you more time."
- "Trading my time for money, but really wish it was the other way around."
- "We're all time millionaires with about 24,000 days to spend."

These can be generated automatically or added manually through the web interface.

## Project Structure

```
├── app.js                  # Main server file
├── models/
│   └── Post.js             # MongoDB post model
├── public/
│   └── index.html          # Web interface
├── ArduinoTweetDisplay.ino # Arduino sketch for the installation
├── package.json            # NPM dependencies
└── .env                    # Environment configuration
```

## Web Interface

The web interface provides:
1. A form to manually add new posts
2. A button to generate sample time-money themed posts
3. A list of all stored posts with delete functionality
4. A preview of how posts will appear and scroll on the Arduino display

## Troubleshooting

### Server Issues

- **MongoDB Connection Error**: Check your connection string in `.env`
- **Port Already in Use**: Change the port in `.env` (default: 3000)

### Arduino Connection Issues

- **Cannot Connect to Server**: Ensure Arduino and server are on the same network
- **No Posts Displaying**: Check the API endpoint URL in the Arduino code

## Customization

You can customize various aspects of the server:

- **Port**: Change the listening port in `.env`
- **Sample Posts**: Edit the list in `app.js` to change the generated content
- **Fetch Intervals**: Adjust how often the Arduino requests new content
- **Display Settings**: Modify how text scrolls on the Arduino display

## License

This project is licensed under the MIT License.

## About the Artist

The "Capitalist Clock" installation is a project by [Your Name]. For more information about this and other works, visit [Your Website].

---

*Note: This repository contains only the server component of the "Capitalist Clock" art installation. The physical construction of the piece requires additional materials and expertise beyond the scope of this codebase.*

## Project Structure

```
├── app.js                  # Main server file
├── models/
│   └── Post.js             # MongoDB post model
├── public/
│   └── index.html          # Web interface
├── ArduinoTweetDisplay.ino # Arduino sketch
├── package.json            # NPM dependencies
└── .env                    # Environment configuration
```

## Troubleshooting

### Server Issues

- **MongoDB Connection Error**: Check your connection string in `.env`
- **Port Already in Use**: Change the port in `.env` (default: 3000)

### Arduino Issues

- **LCD Not Working**: Check I2C address (common: 0x27 or 0x3F)
- **WiFi Connection Failed**: Double-check SSID and password
- **Cannot Connect to Server**: Ensure Arduino and server are on the same network

## Artist Statement

This project examines the intersection of time, labor, and digital capitalism. By repurposing an Arduino to display snippets of our "invisible digital labor" as mediated through language about time, I hope to make visible the often overlooked ways our digital activities are monetized.

The relationship between time and money is deeply encoded in our language and culture. Phrases like "time is money," "free time," and "spending time" reveal how thoroughly economic frameworks have colonized our understanding of temporal experience. This project aims to highlight and question these assumptions by rendering them visible.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by E.P. Thompson's work on time discipline under industrial capitalism
- Built with Node.js, Express, MongoDB, and Arduino
- Thanks to the Joan Truckenbrod Gallery and Carnation Contemporary for exhibiting this work
- Special thanks to the invisible labor of all open source contributors