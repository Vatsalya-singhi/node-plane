var express = require('express');
var cors = require('cors');
const app = express();
var bodyParser = require('body-parser');

var submit = require('./planeService');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT ? process.env.PORT : '3000';
app.listen(port, () => {
    console.log(`Server started on port => ${port}`);
});

app.post('/plane', (req, res) => {
    let body = req.body;
    console.log('body=>', body);
    try {
        var x = submit(req.body.body, req.body.number);
        res.status(200).send(x);
        return;
    } catch (err) {
        console.log('err=>', err);
        res.status(400).send(err);
        return;
    }
})
