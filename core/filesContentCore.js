const https = require('https');
/**
 * 
 * @param {*} base64Content 
 */
function convert(encodedContent){
  // 假设您已经从GitHub API获取到了Base64编码的文件内容
  // let encodedContent = "VGhpcyBpcyBhIHNhbXBsZSBmaWxlIGNvbnRlbnQuCg==";
  // 使用Buffer.from()创建一个Buffer实例，并传入Base64编码字符串和指定的编码类型
  let decodedBuffer = Buffer.from(encodedContent, 'base64');
  // 然后将Buffer转换为字符串，假设文件内容是UTF-8编码
  let decodedContent = decodedBuffer.toString('utf-8');
  return decodedContent
}

// 核心逻辑函数
async function filesContentCore(owner, repo, paths, GITHUB_token) {
    const promises = paths.map(path=>fileContent(owner, repo, path, GITHUB_token));
    return Promise.all(promises).then(results => {
      return {"data": results}
    });
}

async function fileContent(owner, repo, path, GITHUB_token){
  return new Promise((resolve,reject)=>{
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
          const encodedContent = response && 'content' in response && response['content'] ? response['content']: ''
          resolve({
            path: response.path,
            sha: response.sha,
            exists: "true",
            content: convert(encodedContent)
          });
        } else if (res.statusCode === 404) {
          resolve({
            path,
            sha: "",
            exists: "false",
            content: null
          });
        } else {
          reject(new Error('Failed to fetch file info'));
        }
      });
    });
    req.on('error', err => {
      reject(err);
    });
    req.end();
  });
}
module.exports= {filesContentCore};