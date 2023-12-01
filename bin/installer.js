const chalk = require("chalk");
const Setup = require("./systemSetup")
class Installer {
    static instance;
    static requirements;
    static repo;
    static setupInstall;
    static file_modifications = []
    static sampleEnv;
    static packageName;

    static async linuxInstaller(fileContent) {
        this.instance = 'linux'
        const {
            requirements,
            repo,
            setupInstall,
            file_modifications,
            sampleEnv,
            packageName
        } = fileContent

        this.requirements = requirements
        this.repo = repo
        this.setupInstall = setupInstall
        this.file_modifications = file_modifications
        this.sampleEnv = sampleEnv
        this.packageName = packageName
        // check requirements

        try {
            let a = await Setup.linuxCheckRequirements(this.requirements)
            if (a.length > 0) {

                console.error(createBoxedText(chalk.red(`${a.length} packages remaining.`), 'red')) //red
            } else {
                console.log(chalk.bgGreenBright(`All packages already installed`)) //grean
            }

            let b = await Setup.installRequirementsLinux()
            if (b.length > 0) {
                console.log(chalk.red(`${b.length} packages couldn't install`))
            }


            let c = await Setup.cloneRepo(this.repo)

            let d = await Setup.runSetupInstall(this.setupInstall)

            let e = await Setup.createEnvFile(this.sampleEnv)

            let f = await Setup.startProject()
        } catch (error) {
            if (error) {
                console.error(createBoxedText(chalk.redBright(error), 'red'));

            }
        }




    }
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

module.exports = Installer