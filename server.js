const { response } = require('express');
const express = require ('express');
const path = require('path');
const mongoose = require('mongoose');
const Short_url = require('./shorturl');
// const shorturl = require('./shorturl');

const app = express();
const port = 3000;

//to connect to mongodb 
mongoose
     .connect( 'mongodb://localhost:27017/url', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));

app.set('view engine', 'ejs'); //For linking html
app.use(express.static(path.join(__dirname, "views"))); //for linking css
app.use(express.urlencoded({ extended: false }))

app.get('/', async(request, response)=>{
    const shorten_url = await Short_url.find()
    response.render('index', { shorten_url: shorten_url }); //html linking
})

app.post('/shorturls', async(request,response)=>{
    await Short_url.create({
        original: request.body.full_url
    });
    response.redirect('/');
});

app.get('/:shortUrls', async(request,response)=>{
    const shorte = await Short_url.findOne({ short: request.params.Short_url})
    if(shorte == null){
        return response.sendStatus(404);
    }
    shorte.clicks++;
    shorte.save();
    response.redirect(shorte.original)
})

app.listen(process.env.PORT || port, ()=>{
    console.log(`Server up on port ${port}`)
});    