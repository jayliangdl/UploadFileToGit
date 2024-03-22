const express = require('express');
const app = express();
const port = 3000;

// 导入你的模块
const uploadToGitHub = require('./api/exists');

// 使Express能够解析JSON请求体
app.use(express.json());

// 定义一个路由来处理POST请求
app.post('/async', uploadToGitHub);

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
