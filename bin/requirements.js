const {
    program
} = require('commander')
const cp = require("child_process")
const util = require('util')
const chalk = require('chalk')
const exec = util.promisify(cp.exec)

const cliDesign = `
 ######  ##       #### ##     ## ##    ## 
##    ## ##        ##  ###   ###  ##  ##  
##       ##        ##  #### ####   ####   
##       ##        ##  ## ### ##    ##    
##       ##        ##  ##     ##    ##    
##    ## ##        ##  ##     ##    ##    
 ######  ######## #### ##     ##    ##    

`;

console.log(chalk.magenta(cliDesign));


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
                console.log((chalk.blueBright)
                    `${requirement} --> ${a.stdout}`)

            } catch (error) {
                if (error) {
                    console.error(createBoxedText(chalk.red(`❌ Package |${requirement}| not found`), 'red')); // changed the error message color to red 
                    packageToInstall.push(requirement)
                }
            }
        }
        this.toInstall = packageToInstall
        return packageToInstall

    }

    static async installRequirementsLinux() {
        console.log(chalk.blue(this.toInstall))
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


module.exports = Setup;