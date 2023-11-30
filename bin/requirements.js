const {
    program
} = require('commander')
const cp = require("child_process")
const util = require('util')
const exec = util.promisify(cp.exec)

const windowsCheckRequirement = (appn) => {
    return `${appn} --version`
}

class Setup {
    static toInstall = []

    static async linuxCheckRequirements(requirements) {
        const packageToInstall = []

        for (let requirement of requirements) {

            if (requirement === 'mongodb') {
                requirement = 'mongodd'
            }
            try {
                let a = await exec(`${requirement} --version`)
                console.log(`${requirement} --> ${a.stdout}`)

            } catch (error) {
                if (error) {
                    console.error(`Package |${requirement}| not found`)
                    packageToInstall.push(requirement)
                }
            }
        }
        this.toInstall = packageToInstall
        return packageToInstall

    }

    static async installRequirementsLinux() {
        console.log(this.toInstall)
    }
}

module.exports = Setup