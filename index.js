const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

const app = express();

app.use(bodyParser.json())
// app.use(multer({dest: 'images'}).single('image'))
const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'images')
    },
    filename(req, file, cb){
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

app.use(multer({storage}).single('image'))

app.get('/', (req, res) => {
    res.send("hello")
})

app.post('/', (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send({status: "ok"})
} )

app.listen(3000)