const fs = require('fs')
const download = require('./download')
const custom = require('./custom')
const setCustom = require('./setCustom')
const configData = require('./configData')
// 用户输入的有效参数
const initParams = process.argv.slice(2)
// 检测是否已经存在相同名字的目录或者文件
const hasCreate = (dirname) => {
    let fileList = fs.readdirSync(process.cwd())
    if (fileList.length === 0) {
        return false
    } else {
        let dirList = fileList.filter(file => {
            let path = process.cwd() + '/' + file
            return fs.statSync(path).isDirectory()
        })
        return dirList.includes(dirname)
    }
}
module.exports = {
    initParams,
    hasCreate,
    download,
    custom,
    setCustom,
    configData
}