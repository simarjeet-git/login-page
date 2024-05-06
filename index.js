const { MongoClient } = require("mongodb");
const http = require('http')
const path = require('path')
const fs = require('fs')
 url = require('url')
 const { parse } = require('querystring');
 const uri = "mongodb+srv://Simranjeet:S12345@cluster0.t2uc6rb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
 
 
 

 
 

http.createServer((req,res)=>{
const query = url.parse(req.url,true)
 
console.log(query.host); 
console.log(query.pathname); 
console.log(query.search);
const filename ="."+query.pathname
 
if(filename.includes('.html')){
  fs.readFile('index.html',(err,data)=>{
    if(err){throw err}
    res.writeHead(200,{'content-type':'text/html'})
    res.write(data)
    res.end()
  })

}
if(filename.includes('.css')){
  fs.readFile('style.css',(err,data)=>{
    if(err){throw err}
    res.writeHead(200,{'content-type':'text/css'})
    res.write(data)
    res.end()
  })
}
if(filename.includes('.js')){
  fs.readFile('main.js',(err,data)=>{
    if(err){throw err}
    res.writeHead(200,{'content-type':'text/js'})
    res.write(data)
    res.end()
  })
}
if(filename.includes('/data')){
  let body ='';
  let userdata;
  req.on('data',(chunk)=>{
    body +=chunk
    userdata = JSON.parse(body)
    console.log(userdata)
  })
  req.on('end',()=>{
  
     
    async function run() {
      const client = new MongoClient(uri);
      try {
        const database = client.db('signupdata');
        const connectcollection = database.collection('userinfo');
     
        const query = [userdata];
        const finddata = await connectcollection.insertMany(query)
        console.log('data created');
      } finally { 
        await client.close();
      }
    }
    run().catch(console.dir);



  })

   
  
}

if (filename.includes('/logininfo')){
  let body = '';
  let matchdata;
  let Password  ;
  let email ;
  let Em;
  let ps;
  let b;
 
 
            
   
  req.on('data',(logindata)=>{
body += logindata
  
let ne = body.replaceAll('"','')
 
   let se = ne.replaceAll('{','')
   
     te = se.replaceAll('}','')
    
   let ue = te.replaceAll('email:','')
 
   let ve = ue.replaceAll('password:','')
   
   let we = ve.search(',')
    
     Password = ve.slice(we+1)
   console.log(Password)
     email = ve.slice(0,we)
   console.log(email)
    
    
  })
  req.on('end',()=>{
    matchdata = parse(body); 
     
  
      
   
  async function run() {
    const client = new MongoClient(uri);
    try {
      const database = client.db('signupdata');
      const connectcollection = database.collection('userinfo'); 
   let query = {email:`${email}`,password:`${Password}`}
       
      const finddata = await connectcollection.find( query,{projection:{_id:0,email:1,password:1}}).toArray( )
      console.log(finddata)
      let [a] = finddata;
      b = a
      console.log(a)
      console.log(b)
       let {email:e,password:p} = b
      Em = e;
     ps = p;
    
      console.log(Em,ps)
      loadpage()
    } finally { 
       
      await client.close();
    }
  }
  run().catch(console.dir);
   
  
    });
    function loadpage(){
    if (Em == email && ps == Password){
      fs.readFile('page.html',(err,data)=>{
       if(err){throw err}
       res.writeHead(200,{'content-type':'text/html'})
       res.write(data)
       res.end()
      })
    }
  }
    }
     
     
     

    

  

}).listen(8080)
 
   
        