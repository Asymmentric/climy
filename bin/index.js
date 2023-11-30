const {
    program
} = require("commander");

const cp = require("child_process");
const os = require('os')
const {
    stdout
} = require("process");

const util = require('util');
const Installer = require("./installer")
const exec = util.promisify(cp.exec)


console.log("okay");
let a = "NITK"
const platform = os.platform()

if (platform === 'linux') {
    Installer.linuxInstaller()
        .then(result => {
            console.log(`....installing packages`)
        }).catch(err => {
            if (err) {
                console.log(err)
            }
        })
}