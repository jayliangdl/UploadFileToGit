const {filesContentCore} = require('../core/filesContentCore');

// Vercel Serverless函数接口
module.exports = async (req, res) => {
  const { owner, repo, paths, GITHUB_token } = req.body;
  try {
    const result = await filesContentCore(owner, repo, paths, GITHUB_token);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
