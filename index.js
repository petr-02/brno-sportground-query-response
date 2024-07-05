
/////////////
// node.js //
/////////////

import http from 'http';
import {fetchData, createMongoQueryObject} from './function.js';

const hostname = '127.0.0.1';                                                  // při nasazení na server se změní na '0.0.0.0'
const port = 3000;

const server = http.createServer( async function(req, res) {
  const url= `https://${req.headers.host}${req.url}`;                          // "req.url" is part of url after "origin" (i.e. pathname+query_string), "req.headers.host" is "host" (i.e. hostname+port), code can be `https://whatever.com:with_or_without_port${req.url}` as code works only with "query string" part of url (thus also "pathname" can be random)
  const mongoQueryObj= createMongoQueryObject(url);
  const data= await fetchData(mongoQueryObj).catch(console.error);

  res.setHeader('Access-Control-Allow-Origin', 'https://fotbalvbrne.8u.cz');   // allows requests from mentioned origin (if "*" instead of "https://...", all origin will be allowed)
  res.setHeader('Access-Control-Allow-Methods', 'GET');                        // allows only get method
  res.setHeader('Access-Control-Allow-Headers', '');                           // allows no headers

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end( JSON.stringify(data) );
});

server.listen(port, hostname, () => {
  console.log(`server is running at http://${hostname}:${port}/`);
});



