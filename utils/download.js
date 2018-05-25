const download = require('download-git-repo')
const path = require('path')
const ora = require('ora')
const tempUrl = require('../config/index')

module.exports = function (target, type) {
    return new Promise((resolve, reject) => {
        const spinner = ora(`正在从${tempUrl[type]}下载template`)
        spinner.start()
        // 这里可以根据具体的模板地址设置下载的url，注意，如果是git，url后面的branch不能忽略
        download(tempUrl[type],
            target, (err) => {
                if (err) {
                    spinner.fail()
                    reject(err)
                } else {
                    spinner.succeed()
                    // 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
                    resolve(target)
                }
            })
    })
}