#! node
const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')  // npm i inquirer -D
const utils = require('../utils/index')
const templateData = require('../config/index')
// 主程序
const init = () => {
    const cmd = ['init', 'set', 'remove', 'list']
    // 获取初始化指令的参数
    let cli = utils.initParams[0].toLowerCase()
    if (!cmd.includes(cli)) {
        console.log(chalk.red('-----非法指令，请检查输入是否有误-----'))
        process.exit(1)
        return 0
    }
    if (cli === 'list') {
        utils.configData.showTemplate()
    }
    if (cli === 'remove') {
        if (Object.keys(templateData).length === 0) {
            console.log(chalk.yellow('-----无匹配的项目模板-----'))
            process.exit(0)
            return 0
        }
        if (!utils.initParams[1]) {
            console.log(chalk.red('-----指令未指明模板名字，无法删除-----'))
            console.log(chalk.green('-----example：oola remove mpvue-----'))
            process.exit(0)
            return 0
        }
        utils.configData.remove(utils.initParams[1])
        return 0
    }
    if (cli === 'set') {
        if (!utils.initParams[1]) {
            console.log(chalk.red('-----指令未指明模板资源，无法配置-----'))
            console.log(chalk.green('-----example：oola set mpvue http://github.com/leihou/template.git-----'))
            process.exit(1)
            return 0
        }
        utils.configData.set(utils.initParams[1], utils.initParams[2])
        return 0
    }
    if (Object.keys(templateData).length === 0) {
        console.log(chalk.red('-----当前暂无可用模板，请先进行模板配置-----'))
        console.log(chalk.green('-----example：oola set mpvue http://github.com/leihou/template.git-----'))
        process.exit(1)
        return 0
    }
    // 获取初始化指令的参数，第二个参数为新建目录的名字
    let projectName = utils.initParams[1]
    // 如果没有指定新建目录，则默认在当前目录下初始化模板
    let targetDir = process.cwd()
    // 如果有指定新建目录，则检查当前目录下是否已经有重名目录，如果有则退出，没有则新建目录
    if (projectName) {
        if (utils.hasCreate(projectName)) {
            console.log(chalk.red('-----当前目录下已存在相同的文件名-----'))
            process.exit(1)
            return 0
        } else {
            // 创建目录
            targetDir = targetDir + '/' + projectName
            fs.mkdirSync(targetDir, '0777')
        }
    }
    inquirer.prompt([utils.custom[0]])
        .then(res => {
            // 从git上clone模板
            utils.download(targetDir, res.tempType)
                .then((target) => {
                    inquirer.prompt(utils.custom.splice(1))
                        .then(answer => {
                            utils.setCustom(target, answer)
                        })
                })
                .catch(err => {
                    console.log(chalk.red('模板下载失败，请确保模板资源位置正确并且拥有权限下载'))
                    console.log(err)
                    process.exit(1)
                    return 0
                })
        })
}

init()