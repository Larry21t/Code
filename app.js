const nano = require('nano')('http://admin:admin@127.0.0.1:5984'); // Passen Sie die URL entsprechend an
const db = nano.db.use('rezepte'); // Passen Sie den Datenbanknamen an

// Beispieloperationen mit der CouchDB
// Hier können Sie Ihre eigenen Funktionen und Logik einfügen

// Dokument erstellen
// const document = {
//   title: 'Mein Dokument',
//   content: 'Hallo, Welt!'
// };

// db.insert(document, (err, body) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Dokument erstellt:', body);
// });

// Dokument abrufen
// db.get('doc_id', (err, body) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Dokument abgerufen:', body);
// });

// Alle Dokumente in der Datenbank abrufen
db.list({ include_docs: true }, (err, body) => {
  if (err) {
    console.error(err);
    return;
  }
  body.rows.forEach(row => {
    console.log('Dokument:', row.doc);
  });
});
