const mongoose = require('mongoose');

const myDB = 'mongodb://localhost/HWRSS11';

const connection = mongoose.createConnection(myDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  useCreateIndex: true,
  useFindAndModify: false,
  promiseLibrary: global.Promise
}); 

const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

var Schema = mongoose.Schema;

const DocumentsSchema = new Schema({
  document: Object,
  link: { type: String }
});

const rssSchema = new Schema({
  title: String,
  link: { type: String }
});

DocumentsSchema.plugin(autoIncrement.plugin, {
  model: 'Documents',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

rssSchema.plugin(autoIncrement.plugin, {
  model: 'Rss',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

const rss = connection.model('rss', rssSchema);

const Document = connection.model('Documents', DocumentsSchema);

function saverss(data) {
  const line = new rss(data);

  return line.save();
};

function saveDocument(data) {
  let line = new Document(data);

  return line.save();
};

function getAllrss() {
  return rss.find();
};

function getAllDocuments() {
  return Document.find();
};

module.exports = {
  saverss: saverss,
  saveDocument: saveDocument,
  getAllrss: getAllrss,
  getAllDocuments: getAllDocuments
};