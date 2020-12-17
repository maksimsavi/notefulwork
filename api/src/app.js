require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, DB_URL } = require('./config')
require('dotenv').config()

const dummyFolder = {
    name: "folder "+Date.now(),
    id: Date.now()
};

const knex = require('knex')

const app = express()

const morganOption = (NODE_ENV === 'production')?"tiny":"common";

app.use(cors())
app.use(function validateBearerToken(req, res, next) {
    const apiToken = 'supercrazytoken';
    const authToken = req.headers.authorization;
    console.log(authToken)
    if (authToken !== apiToken) {
       // if (!authToken || authToken!== apiToken) {
      return res.status(401).json({ error: 'Unauthorized request'+req.headers })
    }
    // move to the next middleware
    next()
  })
app.use(morgan(morganOption))
app.use(express.json())
app.use(helmet())
app.use(cors())
//knex
const knexInstance = knex({
    client:'pg',
    connection: DB_URL
})
//get folders
app.get('/api/folders', (req,res,next)=>{
    knexInstance.select('*').from('folders')
    .then(folders => {res.json(folders)})
    .catch(next)
})
//get notes
app.get('/api/notes', (req,res)=>{
    knexInstance.select('*').from('notes')
    .then(notes => {res.json(notes)})
})
//post new folder. dont forget json header in req
app.post('/api/folders', (req,res,next)=>{
    //change insert to use req.body values later
    knexInstance('folders').insert({
        id: dummyFolder.id,
        folder_name: dummyFolder.name
    })
    .then(folder => {res.status(204).end()})
})
// post note
app.post('/api/notes', (req,res,next)=>{
    //change insert to use req.body values later
    knexInstance('notes').insert({
        id: dummyNote.id,
        note_name: dummyNote.name,
        modified: dummyNote.modified,
        folder_id: dummyNote.folder_id,
        content: dummyNote.content
    })
    .then(folder => {res.status(204).end()})
})
//delete folder
app.delete('/api/folders/:folderid', (req, res) => {
    knexInstance('folders').where('id', req.params.folderid).del()
    .then(folder => {res.status(204).end()})
  });
//delete note
app.delete('/api/notes/:noteid', (req, res) => {
    knexInstance('notes').where('id', req.params.noteid).del()
    .then(folder => {res.status(204).end()})
  });

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV==='production') {
        response = {error: { message: 'sever error'}}
    } else {
        console.error(error)
        response = {message, error}
    }
    res.status(500).json(response)
})

module.exports = app

