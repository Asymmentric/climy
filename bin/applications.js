const Applications = {
    mongod: {
        windows: [
            "curl-0 https://fastdl.mongodb.org/win32/mongodb-win32-x64-4.4.18.msi",
            "msiexec /i \"mongodb-win32-x64-4.4.18.msi\" /quiet /norestart"
        ],
        linux: [
            "curl -fsSL https://pgp.mongodb.org/server-7.0.asc | sudo apt-key add -",
            "echo deb http://downloads.mongodb.org/linux/$(lsb_release -cs)/dist mongodb-org",
            "sudo apt-get update",
            "sudo apt-get install mongodb-org",
            "sudo systemctl start mongod",
        ],
        mac: [
            "/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"",
            "brew install mongodb-community",
            "brew services start mongodb-community",
        ]
    },
    mongodb: {
        linux: ['echo "to install mongo DD"']
    }
}

module.exports = Applications