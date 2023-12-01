const {
    program
} = require('commander')
const cp = require("child_process")
const util = require('util')
const Applications = require("./applications")
const inquirer = require("inquirer")
const exec = util.promisify(cp.exec)
const fs = require("fs")
const chalk = require("chalk")
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
                console.log(chalk.blue(`${requirement} --> ${a.stdout}`))

            } catch (error) {
                if (error) {
                    console.error(createBoxedText(chalk.red(`❌Package |${requirement}| not found`), 'red'))
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

                            console.error(chalk.red(`Problem installing ${iterator}`))
                            console.error(chalk.yellowBright(error))
                            installerErrors.push({
                                package: iterator,
                                errorCommand: command,
                                errorDetails: {
                                    code: error.code,
                                    mesage: error.mesage
                                }
                            })
                        }
                        throw new Error(error)
                    }
                }
            } else {
                console.error(createBoxedText(chalk.redBright(`Unknown package ${iterator}`), 'red'))
            }
        }
        this.installerErrors = installerErrors
        return installerErrors
    }

    static async cloneRepo(repoLink) {
        console.log(chalk.bgBlueBright(`Cloning Repo...`))
        let a = await exec(`git clone ${repoLink}`, {
            cwd: '../'
        })
        console.log(chalk.bgGreenBright(`Cloned`))
        // console.log(a.stdout)
        return a
    }

    static async runSetupInstall(installCommand) {
        let pwd = await exec(`pwd`)
        console.log(chalk.bgBlueBright(pwd.stdout))
        let a = await exec(`npm i`, {
            cwd: `../oslLogBook`
        })
        console.log(chalk.bgBlueBright(a.stdout))
        let b = await exec('pwd')
        console.log(chalk.bgBlueBright(b.stdout))

        return a
    }

    static async createEnvFile(sampleEnv) {
        //creating .env file

        const dbUrl = await askForDBUrl()
        const dbName = await askForDBName()
        const JWT_SECRET_TOKEN = await getKey('JWT_SECRET_TOKEN');
        const SESSION_SECRET = await getKey("SESSION_SECRET")



        const configg = dotenv.parse(fs.readFileSync(path.join(__dirname, `../../${sampleEnv}`)))
        configg.JWT_SECRET_TOKEN = SESSION_SECRET
        configg.SESSION_SECRET = JWT_SECRET_TOKEN
        configg.DB_LINK = dbUrl;
        configg.DB_NAME = dbName;

        let _env = await exec(`touch .env`, {
            cwd: "../oslLogBook"
        })

        fs.writeFileSync(path.join(__dirname, `../../oslLogBook/.env`), "");
        for (const key in configg) {

            fs.appendFileSync(path.join(__dirname, `../../oslLogBook/.env`), `${key}='${configg[key]}'\n`);
            console.log(chalk.bgBlueBright(`Create:`), `${key}`)
        }


        console.log(chalk.bgGreenBright(`Created .env Successfully`))

    }

    static async startProject(startCommand) {
        console.log(chalk.blue(`Starting...`))
        let a = await exec(`npm start`, {
            cwd: '../oslLogBook'
        })
        console.log(chalk.bgBlueBright(a.stdout))
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
async function askForDBName() {
    const {
        url
    } = await inquirer.prompt([{
        type: "input",
        name: "url",
        message: "Enter your DB name:",
    }, ]);

    return url;
}

async function getKey(keyName) {
    const {
        keyNam
    } = await inquirer.prompt([{
        type: "input",
        name: keyName,
        message: `ENTER ${keyName}:`
    }]);
    return keyNam
}

function createBoxedText(text, borderColor = 'white', textColor = 'reset') {
    const horizontalLine = chalk[borderColor]('─'.repeat(text.length + 4));
    const verticalLine = chalk[borderColor]('');
    const paddedText = chalk[textColor](`${text}  `);

    const boxedText = [
        horizontalLine,
        `${verticalLine} ${paddedText} ${verticalLine}`,
        horizontalLine,
    ].join('\n');

    return boxedText;
}

module.exports = Setup