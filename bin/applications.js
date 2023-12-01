const Applications = {
    mongod: {
        windows: [
            "curl-0 https://fastdl.mongodb.org/win32/mongodb-win32-x64-4.4.18.msi",
            "msiexec /i \"mongodb-win32-x64-4.4.18.msi\" /quiet /norestart"
        ],
        linux: [
            "sudo apt-get install gnupg curl",
            "curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
            sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
            --dearmor",
            "sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 6494C6D6997C215E",
            'echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list',
            "sudo apt-get update",
            "sudo apt-get install -y mongodb-org",
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
    },
    curl:{
        linux:["sudo apt-get install curl"]
    }
}

module.exports = Applications