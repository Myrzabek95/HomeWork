const express = require("express");
const compression = require('compression');
const mongo = require('./mongo');

const app = express();
app.use(compression());
app.use(express.json());

app.use('/', express.static('view'));

const Parser = require('rss-parser');
const parser = new Parser();

async function getFromUrl(url) {
  const result = await parser.parseURL(url);

  return result;
};

app.get("/api/rssDocuments", function(req, res){
    mongo.getAllDocuments().then(function (data) {
        res.send(data);
      })
      .catch(function(errorText) {
        logger.error(errorText);
        res.status(400).send({ error: errorText });
        return;
      });
});

app.get("/api/rssList", function(req, res){
    mongo.getAllrss().then(function (data) {
        res.send(data);
      })
      .catch(function(errorText) {
        logger.error(errorText);
        res.status(400).send({ error: errorText });
        return;
      });
});

app.post("/api/rss", function(req, res){
    console.log(req.body);
    if(!req.body.title || !req.body.link){
        const errorText = 'Enter all parameters';
        res.status(400).send({ error: errorText });
        return;
    }

    let document;

    getFromUrl(req.body.link)
    .then(
        (jsonDom)=>{
            document = jsonDom;
            return mongo.saverss(
                {
                    title: req.body.title,
                    link: req.body.link
                });
        },
        (err) => {console.log('parse Xml catch err=', err);}
    ).then(
        function(data){
        return mongo.saveDocument(
            {
                link: req.body.link,
                document: document
            });
    }).then(function (data) {
         res.send({ title: req.body.title, link: req.body.link });
    }).catch(function(errorText){
        res.status(00).send({ error: errorText });
        return;
    });;
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});