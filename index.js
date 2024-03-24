const express = require('express');
const app = express();
const port = 3000;

// 导入你的模块
const exists = require('./api/exists');
const upload = require('./api/upload');
const filesContent = require('./api/filesContent');

// 使Express能够解析JSON请求体
app.use(express.json());

// 定义一个路由来处理POST请求
app.post('/exists', exists);
app.post('/upload', upload);
app.post('/filesContent', filesContent);
// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
