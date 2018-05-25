const choices = require('../config/index')

// 自定义设置
module.exports = [
    {
        type: 'list',
        name: 'tempType',
        message: '请选择模板类型',
        choices: Object.keys(choices)
    },
    {
        name: 'version',
        message: '请输入版本号',
        default: '0.0.1'
    },
    {
        name: 'description',
        message: '请输入项目描述',
        default: 'a new project'
    },
    {
        name: 'author',
        message: '请输入项目作者',
        default: 'anonymous'
    }
]