
import http from 'http';
import {fetchData, createMongoQueryObject} from './function.js';

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer( async function(req, res) {
  const url= `https://${req.headers.host}${req.url}`					// "req.url" is part of url after "origin" (i.e. pathname+query_string), "req.headers.host" is "host" (i.e. hostname+port), code can be `https://whatever.com:with_or_without_port${req.url}` as code works only with "query string" part of url (thus also "pathname" can be random)
  const mongoQueryObj= createMongoQueryObject(url)
  const data= await fetchData(mongoQueryObj).catch(console.error);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end( JSON.stringify(data) );
});

server.listen(port, hostname, () => {
  console.log(`server is running at http://${hostname}:${port}/`);
});
