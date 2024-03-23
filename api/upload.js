const {uploadCore} = require('../core/uploadCore');

// Vercel Serverless函数接口
module.exports = async (req, res) => {
  console.log('uploadCore.js');
  console.log(`req.body:${req.body}`);
  console.log(`req.body:${JSON.stringify(req.body)}`);
  const { owner, repo, path, GITHUB_token, content, sha } = req.body;
  try {
    const result = await uploadCore(owner, repo, path, GITHUB_token, content, sha);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

