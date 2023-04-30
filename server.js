const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 3000;

var db, collection;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://juizii:demodemo@cluster0.thiykna.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/', (request, response)=>{
  response.sendFile(__dirname + '/index.html')
})

app.get('/css/style.css', (request, response)=>{
  response.sendFile(__dirname + '/css/style.css')
})

app.get('/js/main.js', (request, response)=>{
  response.sendFile(__dirname + '/js/main.js')
})

app.get('/api/:word',(request,response)=>{
  const input = request.params.word.toLowerCase()

 if(input === input.toLowerCase().split('').reverse().join('')){
      let result = 'It is a Palindrome! :D'
      response.json(result)
  }else{
    let result = "Oopsies, its not a Palindrome :("
      response.json(result)
  }
  
})

app.listen(PORT, console.log("It's working"))



// const http = require('http');
// const fs = require('fs')
// const url = require('url');
// const querystring = require('querystring');
// const figlet = require('figlet')


// const server = http.createServer(function(req, res) {
//   const page = url.parse(req.url).pathname;
//   const params = querystring.parse(url.parse(req.url).query);
//   console.log(page);
//   if (page == '/') {
//     fs.readFile('index.html', function(err, data) {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       res.end();
//     });
//   }
//   else if (page == '/api') {
//     if('palindrome' in params){
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         reversed = params['palindrome'].toLowerCase().split('').reverse().join('');

// if (params['palindrome'] === "" || params['palindrome'] === null){
//         results = "Please enter a word >:("
// }
//       else if(params['palindrome'].toLowerCase() == reversed){
//         results = "It is a Palindrome! :D"
//       } else if(params['palindrome'].toLowerCase() != reversed){
//         results = "Oopsies, its not a Palindrome :("
//       } 
//         const objToJson = {
//           word: `${results}`,
        
//         }
//         res.end(JSON.stringify(objToJson));
//       }//student = leon
//     } else if (page == '/css/style.css'){
//     fs.readFile('css/style.css', function(err, data) {
//       res.write(data);
//       res.end();
//     });
//   }else if (page == '/js/main.js'){
//     fs.readFile('js/main.js', function(err, data) {
//       res.writeHead(200, {'Content-Type': 'text/javascript'});
//       res.write(data);
//       res.end();
//     });
//   }else{
//     figlet('404!!', function(err, data) {
//       if (err) {
//           console.log('Something went wrong...');
//           console.dir(err);
//           return;
//       }
//       res.write(data);
//       res.end();
//     });
//   }
// });

// server.listen(8000);
