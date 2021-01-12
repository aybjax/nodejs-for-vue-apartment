const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

const app = express();

app.use(express.static(
    path.join(__dirname, 'images')
))

app.use(bodyParser.json())
const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'images')
    },
    filename(req, file, cb){
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

app.use(multer({storage}).array('image', 4))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.get('/', (req, res) => {
    res.send("hello")
})

app.post('/', (req, res) => {
    console.log(req.body)
    console.log(req.files)
    
    res.send({status: "ok"})
})

app.listen(3000)