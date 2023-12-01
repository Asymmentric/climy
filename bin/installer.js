const Setup =require("./requirements")

class Installer {
    static instance;

    static async linuxInstaller() {
        this.instance = 'linux'

        // check requirements

        let a = await Setup.linuxCheckRequirements(['mongodb', 'npm'])
        Setup.installRequirementsLinux()
        return a


    }
}

module.exports=Installer