const fs = require('fs')
const chalk = require('chalk')

let data = fs.readFileSync(__dirname + '/../config/data.json', {encoding: 'utf8'})
data = JSON.parse(data)

const createSource = (url) => {
    return new Promise((resolve, reject) => {
        if (!/git/.test(url)) {
            reject('无法解析该git链接，请确保链接为gitlab或者gitHub上的项目地址')
        } else {
            let arr = url.split('/').reverse()
            if (arr[1] && /git/.test(arr[0])) {
                let source = arr[1] + '/' + arr[0].split('.')[0]
                resolve(source)
            } else {
                reject('无法解析该git链接，请确保链接为gitlab或者gitHub上的项目地址')
            }
        }
    })
}


const configData = {
    help: () => {
        console.log(chalk.cyan('    oola init <project-name>: 不带project-name则表示在当前目录下生成模板'))
        console.log(chalk.cyan('    oola list: 查看当前项目模板'))
        console.log(chalk.cyan('    oola set <template-name> <project-git-address>: 配置模板'))
        console.log(chalk.cyan('    oola remove <template-name> : 删除模板'))
        process.exit(0)
    },
    showTemplate: () => {
        console.log(chalk.green(`      -----模板列表-----`))
        console.log(chalk.green(JSON.stringify(data, null, 8)))
        process.exit(0)
    },
    set: (type, url) => {
        createSource(url)
            .then(res => {
                data[type] = res
                fs.writeFileSync(__dirname + '/../config/data.json', JSON.stringify(data, null, 4))
                console.log(chalk.green(`      -----成功设置模板：${type}-----`))
                console.log(chalk.green('     剩余模板：'))
                console.log(chalk.green(JSON.stringify(data, null, 8)))
                process.exit(0)
                return 0
            })
            .catch(err => {
                console.log(chalk.red(`      -----设置模板失败，原因：${err}-----`))
                process.exit(0)
                return 0
            })
    },
    remove: (type) => {
        if (!data[type]) {
            console.log(chalk.red('-----该模板不存在，请检查输入是否有误-----'))
            console.log(chalk.green('     当前模板：'))
            console.log(chalk.green(JSON.stringify(data, null, 8)))
            process.exit(0)
        } else {
            delete data[type]
            fs.writeFileSync(__dirname + '/../config/data.json', JSON.stringify(data, null, 4))
            console.log(chalk.green(`      -----成功删除模板：${type}-----`))
            console.log(chalk.green('     剩余模板：'))
            console.log(chalk.green(JSON.stringify(data, null, 8)))
            process.exit(0)
            return 0
        }
    }
}

module.exports = configData