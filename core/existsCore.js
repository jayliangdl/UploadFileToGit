const https = require('https');

// 核心逻辑函数
async function existsCore(owner, repo, path, GITHUB_token) {

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}/contents/${path}`,
      method: 'GET',
      headers: {
        'Authorization': `token ${GITHUB_token}`,
        'User-Agent': 'Node.js',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(body);
          resolve({
            path: response.path,
            sha: response.sha,
            exists: "true"
          });
        } else if (res.statusCode === 404) {
          resolve({
            path,
            sha: "",
            exists: "false"
          });
        } else {
          reject(new Error('Failed to fetch file info'));
        }
      });
    });

    req.on('error', error => reject(error));
    req.end();
  });
}
module.exports= {existsCore};