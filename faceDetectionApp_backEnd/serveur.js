const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dataRoutes = require('routes/dataRoutes');

const app = express();

app.use(bodyParser.json());

// Remplacez <username>, <password> et <dbname> par vos valeurs
const connectionString = "mongodb+srv://zackDB:lilopipo@cluster0.uzwuxhn.mongodb.net/laboIA";

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch(err => {
    console.error("Error connecting to MongoDB Atlas", err);
});


app.use(dataRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
