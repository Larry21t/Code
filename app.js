const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchdb = require('nano')('http://sysadm:sysadm@127.0.0.1:5984');

const couch = NodeCouchdb.db.use('rezepte');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    couch.list({ include_docs: true }, (err, body) => {
        if (err) {
            console.error(err);
            return;
        }
        const recipes = body.rows.map(row => row.doc);
        console.log(recipes)
        res.render('index', { recipes });
    });
});

app.post('/search', function(req, res) {
    const searchTerm = req.body.searchTerm;

    const query = {
        selector: {
            ingredients: {
                $regex: searchTerm,
                $options: 'i'
            }
        }
    };

    couch.find(query, function(err, result) {
        if (err) {
            console.error(err);
            return;
        }

        const recipes = result.docs;
        res.render('index', { recipes });
    });
});

app.listen(3000, function() {
    console.log('Server is started on Port 3000');
});

