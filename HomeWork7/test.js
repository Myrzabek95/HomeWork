var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000");
var random = Math.random();
var idProduct = "";

// UNIT test begin
describe("REST API unit test.",function(){
    it("should return all rssList",function(done){
        // Test Get All rssList
        server
            .get("/api/rssList")
            .expect("Content-type",/json/)
            .expect(200) // This is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.should.be.an.instanceOf(Array);
                done();
            });

    });

        it("should return all rssDocuments",function(done){
            // Test rssDocuments 
            server
                .get("/api/rssDocuments")
                .expect("Content-type",/json/)
                .expect(200) // This is HTTP response
                .end(function(err,res){
                    // HTTP status should be 200
                    res.status.should.equal(200);
                    // Error key should be false.
                    res.body.should.be.an.instanceOf(Array);
                    done();
                });
        });

    it("should return insert Link",function(done){
        // Test RSS Add
        server
            .post("/api/rss")
            .send({title : "tumblr"+random, link : "https://example.tumblr.com/rss"})
            .expect("Content-type",/json/)
            .expect(200) // This is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                res.body.should.be.ok;
                res.body.should.be.an.instanceOf(Object);
                res.body.should.have.properties('link');
                done();
            });

    });

});