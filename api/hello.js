// api/hello.js
module.exports = (req, res) => {
  result = {"text":"Hello World"};
  res.status(200).json(result);
  // res.status(200).send('Hello World!');
};