#!/usr/bin/env node

const {
    program
} = require("commander");

const cp = require("child_process");
const os = require('os')
const {
    stdout
} = require("process");

const util = require('util');
const Installer = require("./installer");
const chalk = require("chalk");;
const fs = require("fs");
async function start() {
    const exec = util.promisify(cp.exec)



    console.log(chalk.bgGreenBright.blackBright("✅ okay"));
    let a = "NITK"
    const platform = os.platform()

    program
        .description('Requirements file')
        .option('-f, file <path>', 'Choose file with guide')
        .parse(process.argv)

    const opts = program.opts()
    if (opts.file) {
        console.log(opts.file)
    }
    const filePath = opts.file
    if (!filePath) {
        console.error(createBoxedText(chalk.red(" ❌Pass guide file"), 'red'))
        throw new Error("PASS GUIDE FILE")
    }

    let fileContent = fs.readFileSync(filePath)
    fileContent = JSON.parse(fileContent)

    if (platform === 'linux') {
        // const a = new Installer(fileContent)

        Installer.linuxInstaller(fileContent)
            .then(result => {
                console.log(chalk.blueBright(`....installing packages`))
            }).catch(err => {
                if (err) {
                    console.log(createBoxedText(chalk.redBright(err), 'red'))
                }
            })
    }




    if (platform === 'win32') {
        console.log(chalk.bgMagentaBright(`Figuring out windows`))
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

start()