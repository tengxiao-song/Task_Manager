const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 4000;
const cors = require('cors'); //access from another localhost
app.use(cors()); // Enable CORS for all routes

const uri = "mongodb+srv://mango:nmFtxBKEFtF75aq0@cluster0.m4wkv23.mongodb.net/?retryWrites=true&w=majority";
let client;
let db;

async function init() {
    client = new MongoClient(uri, {
        serverApi: {
            version: '1',
            strict: true,
            deprecationErrors: true,
        }
    });
    await client.connect();
    db = client.db('task_manager');
}
init();

app.get('/', async (req, res) => {
    try {
        const collection = db.collection('task'); // Replace 'your_collection_name' with your actual collection name
        // Retrieve data from MongoDB
        const data = await collection.find().toArray();
        // Send the data as JSON in the response
        res.json(data);
    } catch (error) {
        console.error('Error retrieving data from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
