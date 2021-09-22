const fs = require('fs');
const userList = [];

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Prove 01</title></head>');
    res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Prove 01</title></head>');
    res.write('<body><ul>');
    for (const username of userList) {
      res.write(`<li>${username}</li>`);
    }
    res.write('</ul></body>');
    res.write('</html>');
    return res.end();
  }
  // Send an HTML response with a "Page not found" message
  if (url === '/create-user' && method === "POST") {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = (parsedBody.split('=')[1]);
      console.log(username);
      userList.push(username);
      res.statusCode = 302;
      res.setHeader('Location', '/users');
      return res.end();

    });

  }
};
exports.handler = requestHandler;
exports.someText = 'Welcome to CSE341\'\s assignment Prove 01!';

// if (url === '/create-user') {
//   const body = [];
//   req.on('data', (chunk) => {
//     body.push(chunk);
//   });
//   req.on('end', () => {
//     const parsedBody = Buffer.concat(body).toString();
//     console.log(parsedBody.split('=')[1]); //username=whatever-the-user-entered
//   });
//   res.statusCode = 302;
//   res.setHeader('Location', '/');
//   res.end();
// }