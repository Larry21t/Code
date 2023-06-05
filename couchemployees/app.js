const express = require('express');  
const bodyParser = require('body-parser');  
const path = require('path');  
const NodeCouchdb = require('nano')('http://sysadm:sysadm@127.0.0.1:5984');
  
const couch = NodeCouchdb.db.use('rezepte');

couch.list({ include_docs: true }, 
    (err, body) => {
        if (err) {
            console.error(err);
            return;
        }
        body.rows.forEach(row => {
            console.log('Dokument:', row.doc);
        });
    });
  
const app = express();  
app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, 'views'));  
app.use (bodyParser.json());  
app.use(bodyParser.urlencoded({extended: false}));  

app.get('/', function(req,res){  
    res.render('index');  
}); 

app.listen(3000, function(){  
 console.log('Server is started on Port 3000');  
})  