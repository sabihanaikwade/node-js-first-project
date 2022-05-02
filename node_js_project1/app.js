const express = require('express')
const path=require('path')
const fs=require('fs')
const app = express()
const port = 3000

//express specific stuff
app.use('/static',express.static('static'))  //for serving static files

app.use(express.urlencoded())

app.set('view engine','pug')//adding template engine pug
app.set('views',path.join(__dirname,'views'))//setting the views directory

//endpoints
app.get('/',(req,res)=>{
    const con='this is the best content on the internet'
    const params={'title':'pug is the best','content':con}
    res.status(200).render('index.pug',params);
})

app.post('/',(req,res)=>{
  sname=req.body.sname
  age=req.body.age
  gender=req.body.gender
  address=req.body.address
  more=req.body.more

  let outputToWrite=`the name of the client is ${sname}, ${age}, ${gender}, ${address}. More about her/him: ${more}`
  fs.writeFileSync('output.txt',outputToWrite)
  const params={'message':'Your form has been submitted succesfully',}
  res.status(200).render('index.pug',params)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})