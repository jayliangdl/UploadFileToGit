const {uploadCore} = require('../core/uploadCore');

// Vercel Serverless函数接口
module.exports = async (req, res) => {
  const { owner, repo, paths_entities, GITHUB_token} = req.body;
  try {
    const result = await uploadCore(owner, repo, paths_entities, GITHUB_token);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

