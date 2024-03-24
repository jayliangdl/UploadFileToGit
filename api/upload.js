const {uploadCore} = require('../core/uploadCore');

// Vercel Serverless函数接口
module.exports = async (req, res) => {
  const { owner, repo, path, GITHUB_token, content, sha } = req.body;
  try {
    const result = await uploadCore(owner, repo, path, GITHUB_token, content, sha);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

