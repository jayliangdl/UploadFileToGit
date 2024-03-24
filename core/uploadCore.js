const https = require('https');

// 核心逻辑函数
async function uploadCore(owner, repo, paths_entities, GITHUB_token) {
  let results = [];
  for(const path_entity of paths_entities){
    const path = 'path' in path_entity?path_entity['path']:'';
    const content = 'content' in path_entity?path_entity['content']:'';
    const sha = 'content' in path_entity?path_entity['sha']:'';
    const result = await uploadOnePath(owner, repo, path, GITHUB_token, content, sha);
    result['path'] = path;
    result['sha'] = result['sha'];
    results.push(result);
  }
  return {
    "data":results
  }
}

async function uploadOnePath(owner, repo, path, GITHUB_token, content, sha = ''){
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
        const response = JSON.parse(body);
        if (res.statusCode === 200 || res.statusCode === 201) {
          const body_in_json = JSON.parse(body);
          resolve({
            operation_result: "true",
            sha:body_in_json?.['content']?.['sha'],
            error_message: ""
          });
        } else {
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