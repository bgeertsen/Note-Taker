const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json')
const app = express();
const PORT = process.env.PORT || 3001;
// const router = require('express').Router();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function createNewNote(body, noteArray) {
    const note = body;
    noteArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(noteArray, null, 2)
    )

    return note;
}

function deleteNote(id, noteArray) {
    const newArr = noteArray.splice(id, 1);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(noteArray, null, 2)
    )
    
    return newArr;
    
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    // req.body.id = notes.length.toString();

    const note = createNewNote(req.body, notes)
    res.json(note);
})

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params, notes)
    
    res.json(notes);
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})