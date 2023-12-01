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

                console.error(`${a.length} packages remaining.`)
            } else {
                console.log(`All packages already installed`)
            }

            let b = await Setup.installRequirementsLinux()

            let c = await Setup.cloneRepo(this.repo)

            let d = await Setup.runSetupInstall(this.setupInstall)

            let e = await Setup.createEnvFile(this.sampleEnv)

            let f = await Setup.startProject()
        } catch (error) {
            if (error) {
                console.error(error);

            }
        }




    }
}

module.exports=Installer