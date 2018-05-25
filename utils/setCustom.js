const fs = require('fs')
const chalk = require('chalk')
// 设置package.json
module.exports = setCustom = (target, params) => {
    target = target + '/package.json'
    let setKeys = Object.keys(params)
    let data = fs.readFileSync(target)
    data = JSON.parse(String(data))
    Object.keys(data).forEach(key => {
        if (setKeys.includes(key)) {
            data[key] = params[key]
        }
    })
    data = JSON.stringify(data, null, 4)
    fs.writeFileSync(target, data)
    console.log(chalk.green('项目生成完毕'))
    console.log(chalk.green('    开始项目：输入 npm install'))
    console.log(chalk.green('    运行项目：输入 npm run dev'))
    console.log(chalk.green('    构建项目：输入 npm run build'))
    process.exit(0)
    return 0
}
