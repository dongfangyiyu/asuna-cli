
const request = require('request')
const semver = require('semver')
const chalk = require('chalk')
const logger = require('./logger')
const packageConfig = require('../package.json')

module.exports = callback => {
    //检验使用者的node版本号
    if (!semver(process.version, packageConfig.engines)) {
        return console.log(chalk.red(
            '  You must upgrade node to >=' + packageConfig.engines.node + '.x to use vue-cli'
        ))
    }
    //检验asuna-cli是否最新版
    request({
        url: 'https://registry.npmjs.org/   -cli',
        timeout: 1000
    }, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            const latestVersion = JSON.parse(body)['dist-tags'].latest
            const localVersion = packageConfig.version
            if (semver.lt(localVersion, latestVersion)) {
                console.log()
                console.log(chalk.yellow('  A newer version of asuna-cli is available.'))
                console.log()
                console.log('  latest:    ' + chalk.green(latestVersion))
                console.log('  installed: ' + chalk.red(localVersion))
                console.log()
            }
        } else {
            console.log()
            console.log(chalk.yellow("Sorry,server error,check version unsuccessfully.Please try again later!"))
        }
        if (typeof callback === 'function') callback()        
    })
}
