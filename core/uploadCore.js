const https = require('https');

// 核心逻辑函数
async function uploadCore(owner, repo, path, GITHUB_token, content, sha = '') {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      message: "Update file",
      content: Buffer.from(content).toString('base64'),
      sha
    });

    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}/contents/${path}`,
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_token}`,
        'User-Agent': 'Node.js',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve({
            operation_result: "true",
            error_message: ""
          });
        } else {
          const response = JSON.parse(body);
          resolve({
            operation_result: "false",
            error_message: response.message
          });
        }
      });
    });

    req.on('error', error => reject(error));
    req.write(data);
    req.end();
  });
}
module.exports= {uploadCore};