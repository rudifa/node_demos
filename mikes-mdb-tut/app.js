    /* server */
    var express = require('express')
      , app = express.createServer()
      , mongoose = require('mongoose');

    /* models */
    mongoose.connect('mongodb://127.0.0.1/sampledb');

    var Schema = mongoose.Schema
      , ObjectId = Schema.ObjectID;

    var Hobby = new Schema({
        name            : { type: String, required: true, trim: true }
    });

    var Person = new Schema({
        first_name      : { type: String, required: true, trim: true }
      , last_name       : { type: String, required: true, trim: true }
      , username        : { type: String, required: true, trim: true }
      , hobbies         : [Hobby]
      , shoe_size       : Number
      , eye_color       : String
    });


    var Person = mongoose.model('Person', Person);

    app.get('/', function(req,res){
        Person.find({}, function(error, data){
            res.json(data);
        });
    });

    app.get('/removeuser/:username', function(req, res){
        Person.findOne({username: req.params.username}, function(error, person){
            if(error){
                res.json(error);
                console.log('error ' + error);
            }
            else {
                console.log('person ' + person);
                res.json(person);
            }
            
         }).remove(); // removes all matching documents
    });

    app.get('/adduser/:first/:last/:username', function(req, res){
        var person_data = {
            first_name: req.params.first
          , last_name: req.params.last
          , username: req.params.username
        };
        
        Person.findOne({username: req.params.username}, function(error, person){
            if(error){
                res.json(error);
            }
            else if(person == null){
                var person = new Person(person_data);

                person.save( function(error, data){
                    if(error){
                        res.json(error);
                    }
                    else{
                        res.json({'new user': data});
                    }
                });
            }
            else{
                res.json({'current user': person});
            }
        });
    });

    app.get('/addhobby/:username/:hobby', function(req, res){
        Person.findOne({ username: req.params.username }, function(error, person){
            if(error){
                res.json(error);
            }
            else if(person == null){
                res.json('no such user!')
            }
            else{
                person.hobbies.push({ name: req.params.hobby });
                person.save( function(error, data){
                    if(error){
                        res.json(error);
                    }
                    else{
                        res.json(data);
                    }
                });
            }
        });
    });

    app.listen(3001);
    console.log("listening on port %d", 3001);