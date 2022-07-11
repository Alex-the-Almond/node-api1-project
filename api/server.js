// BUILD YOUR SERVER HERE
const Users = require('./users/model.js');

const express = require('express');

const server = express();

server.use(express.json());

//POST /api/users
server.post('/api/users', (req, res) => {
    let body = req.body;
    if(body.name == null) {
        res.status(400).json({message: "Please provide name and bio for the user"})
        return;
    }
    if(body.bio == null) {
        res.status(400).json({message: "Please provide name and bio for the user"})
        return;
    }
    Users.insert(body).then(user => {
        res.status(201).json(user);
    });
});

//GET /api/users
server.get('/api/users', (req, res) => {
    Users.find().then(user => res.status(200).json(user));
});

//GET /api/users
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    Users.findById(id).then(user => {
        if(user == null) {
            res.status(404).json({message: "The user with the specified ID does not exist"});
        } else {
            res.json(user);
        }
    });
});

//DELETE /api/users/:id
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.remove(id).then(user => {
        if(user == null) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
        } else {
            res.json(user)
        }
    });
});

//PUT /api/users/:id
server.put('/api/users/:id', (req, res) => {
    let body = req.body;
    if(body.name == null) {
        res.status(400).json({message: "Please provide name and bio for the user"});
        return;
    }
    if(body.bio == null) {
        res.status(400).json({message: "Please provide name and bio for the user"});
        return;
    }
    Users.update(req.params.id, body).then(user => {
        if(user == null) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
            return;
        } else {
            res.json(user)
        }
    })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
