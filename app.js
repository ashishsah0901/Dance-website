const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 1000;

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://localhost/contactDanceWebDb', { useNewUrlParser: true, useUnifiedTopology: true });
let contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    course: String
});
let contact = mongoose.model('contact', contactSchema);

app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res) => {
    let myData = new contact(req.body);
    myData.save().then(() => {
        res.status(200).send("Item Saved Successful");
    }).catch(() => {
        res.status(400).send("Item saved unsuccessful");
    })
});

app.listen(port, () => {
    console.log(`Website is running on port ${port}`);
});