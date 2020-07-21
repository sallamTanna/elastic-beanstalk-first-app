const express = require('express');
const  path = require ('path');
const PORT = process.env.PORT || 8081;
const app = express();


console.log(44444444444444,);

app.use(express.static(path.join(__dirname, 'client', 'build')));



app.get('/number', (req, res) => {
  res.send(`Your random number iss: ${Math.random()}`);
});
// app.get('/', (req, res) => {
//   res.send('Hi!');
// });

app.get('/*', (req, res) => {
  console.log(222222)
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}.`);
});