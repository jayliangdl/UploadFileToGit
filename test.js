const {existsCore} = require('./core/existsCore');
const {uploadCore}= require('./core/uploadCore');
const {filesContentCore}= require('./core/filesContentCore');

const GITHUB_token = ''; // 使用你的GitHub个人访问令牌
// const path = "src/com/xxxx/user/dao/UserDao.java"; // 修改文件路径
const owner = "jayliangdl";
const repo = "sync_project_code_from_coze_20240322";
const content = "新的文件内容1112222";
const message = "first try";
const branch = "main";
const sha = "";

const paths = [
  "src/README1.md",
  "src/README2.md"
]; // 修改文件路径

const paths_entities = [
  {
    "path":"src/README1.md",
    "sha":"c7ad42ac19813144d425d2c4414db562d2e574e5",
    "content":"text9999999_1"
  },
  {
    "path":"src/README2.md",
    "sha":"c7ad42ac19813144d425d2c4414db562d2e574e5",
    "content":"text9999_2"
  }
]; // 修改文件路径

// 测试 exists API
// existsCore(owner, repo, paths, GITHUB_token)
//   .then(result => console.log('Exists API Result:', result))
//   .catch(error => console.error('Exists API Error:', error));

// 测试 upload API
// 注意：仅在存在API测试成功并且你有一个有效的SHA时才运行此测试
  uploadCore(owner, repo, paths_entities, GITHUB_token)
    .then(result => console.log('Upload API Result:', result))
    .catch(error => console.error('Upload API Error:', error));

// filesContentCore(owner, repo, paths, GITHUB_token)
//   .then(result => console.log('Exists API Result:', result))
//   .catch(error => console.error('Exists API Error:', error));
