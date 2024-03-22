// const { Octokit } = require("@octokit/rest");
module.exports = async (req, res) => {

  const githubToken = process.env.github_token;
  // const octokit = new Octokit({ auth: githubToken });
res.status(200).send('Hello World!');
  // try {
  //   // 假设你要更新的文件路径、内容和commit信息
  //   const path = "./test.txt";
  //   const content = "新的文件内容";
  //   const message = "first try";
  //   const owner = "ljzzhuche@yeah.net";
  //   const repo = "sync_project_code_from_coze_20240322";
  //   const branch = "main";

  //   // 获取文件的SHA，如果文件已经存在
  //   let sha = null;
  //   try {
  //     const response = await octokit.rest.repos.getContent({
  //       owner,
  //       repo,
  //       path,
  //       ref: branch,
  //     });
  //     sha = response.data.sha;
  //   } catch (error) {
  //     // 如果文件不存在，则不做处理，因为GitHub会自动创建新文件
  //   }

  //   // 创建或更新文件
  //   await octokit.rest.repos.createOrUpdateFileContents({
  //     owner,
  //     repo,
  //     path,
  //     message,
  //     content: Buffer.from(content).toString('base64'),
  //     sha, // 如果文件不存在，这里可以是undefined
  //     branch,
  //   });

  //   res.json({ success: true, message: '文件成功推送到GitHub' });
  // } catch (error) {
  //   console.error('推送到GitHub时出错:', error);
  //   res.json({ success: false, message: '推送到GitHub时出错' });
  // }
};
