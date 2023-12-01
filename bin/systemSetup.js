const {
    program
} = require('commander')
const cp = require("child_process")
const util = require('util')
const Applications = require("./applications")
const inquirer = require("inquirer")
const exec = util.promisify(cp.exec)
const fs = require("fs")
const path = require("path")

const dotenv = require('dotenv')
dotenv.config()

const windowsCheckRequirement = (appn) => {
    return `${appn} --version`
}

class Setup {
    static toInstall = []

    static installerErrors = []

    static async linuxCheckRequirements(requirements) {
        const packageToInstall = []

        for (let requirement of requirements) {
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

    static async installRequirementsLinux(osPlatform) {
        const installerErrors = []
        for (const iterator of this.toInstall) {

            if (Applications[iterator]) {
                const installCommands = Applications[iterator].linux

                for (const command of installCommands) {
                    try {
                        let a = await exec(command)
                        console.log(`${iterator} --> ${a.stdout}`)

                    } catch (error) {
                        if (error) {

                            console.error(`Problem installing ${iterator}`)
                            installerErrors.push({
                                package: iterator,
                                errorCommand: command,
                                errorDetails: {
                                    code: error.code,
                                    mesage: error.mesage
                                }
                            })
                        }
                    }
                }
            } else {
                console.error(`Unknown package ${iterator}`)
            }
        }
        this.installerErrors = installerErrors
        return installerErrors
    }

    static async cloneRepo(repoLink) {
        console.log(`Cloning Repo...`)
        let a = await exec(`git clone ${repoLink}`, {
            cwd: '../'
        })
        console.log(`Cloned`)
        // console.log(a.stdout)
        return a
    }

    static async runSetupInstall(installCommand) {
        let pwd = await exec(`pwd`)
        console.log(pwd.stdout)
        let a = await exec(`npm i`, {
            cwd: `../oslLogBook`
        })
        console.log(a.stdout)
        let b = await exec('pwd')
        console.log(b.stdout)

        return a
    }

    static async createEnvFile(sampleEnv) {
        //creating .env file

        const dbUrl = await askForDBUrl()

        const configg = dotenv.parse(fs.readFileSync(path.join(__dirname, `../../${sampleEnv}`)))

        configg.DB_LINK = dbUrl;

        let _env = await exec(`touch .env`, {
            cwd: "../oslLogBook"
        })

        fs.writeFileSync(path.join(__dirname, `../../oslLogBook/.env`), "");
        for (const key in configg) {
            fs.appendFileSync(path.join(__dirname, `../../oslLogBook/.env`), `${key}=${configg[key]}\n`);
            console.log(`Create ${key}`)
        }


        console.log(`Created .env Successfully`)

    }

    static async startProject(startCommand) {

        let a = await exec(`npm start`, {
            cwd: '../oslLogBook'
        })
        console.log(a.stdout)
    }

}

async function askForDBUrl() {
    const {
        url
    } = await inquirer.prompt([{
        type: "input",
        name: "url",
        message: "Enter your DB URL:",
    }, ]);

    return url;
}

module.exports = Setup