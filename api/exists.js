const {existsCore} = require('../core/existsCore');

// Vercel Serverless函数接口
module.exports = async (req, res) => {
  console.log('exists.js');
  console.log(`req.query：${req.body}`);
  console.log(`req.query：${JSON.stringify(req.body)}`);
  const { owner, repo, path, GITHUB_token } = req.body;
  try {
    const result = await existsCore(owner, repo, path, GITHUB_token);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
