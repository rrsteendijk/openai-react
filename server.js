const compression = require("compression");
const express = require("express");
const cors = require("cors"); // Voeg de cors import toe
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(compression());
app.use(cors()); // Gebruik CORS voor alle inkomende verzoeken
app.use(express.static(path.join(__dirname, "build")));

app.use(express.json()); // Belangrijk voor het parsen van JSON body data

// Logging middleware voor debuggen
app.use((req, res, next) => {
  console.log(`Inkomend verzoek: ${req.method} ${req.url}`);
  next();
});

// Hier importeer je de whoami router
const whoamiRouter = require('./src/apis/whoami')(); 

// Gebruik de whoami router voor /api routes
app.use('/api', whoamiRouter);

// Importeer de createcourse router
const createCourseRouter = require('./src/apis/createcourse')();

// Gebruik de createcourse router
app.use('/api', createCourseRouter); // Dit zorgt ervoor dat je POST route bereikbaar is via /api/createcourse

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(PORT);
console.log("Node server is now running on: http://localhost:" + PORT);

