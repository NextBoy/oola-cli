// 模板配置文件
const fs = require('fs')

const data = fs.readFileSync(__dirname + '/data.json', {encoding: 'utf8'})

module.exports = JSON.parse(data)