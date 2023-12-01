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
const fs = require("fs");
async function start() {
    const exec = util.promisify(cp.exec)


    console.log("okay");
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
        console.error("Pass guide file")
        throw new Error("PASS GUIDE FILE")
    }

    let fileContent = fs.readFileSync(filePath)
    fileContent = JSON.parse(fileContent)

    if (platform === 'linux') {
        // const a = new Installer(fileContent)

        Installer.linuxInstaller(fileContent)
            .then(result => {
                console.log(`....installing packages`)
            }).catch(err => {
                if (err) {
                    console.log(err)
                }
            })
    }

    if (platform === 'win32') {
        console.log(`Figuring out windows`)
    }
}

start()