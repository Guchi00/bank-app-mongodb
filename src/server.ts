import http from 'http';

import app from './app';


const port = process.env.PORT || 3006;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Bank app listening on port: ${port}`);
});


//for development