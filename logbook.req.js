let a = {
    "requirements": ["node", "mongo"],
    "repo": "https://github.com/Asymmentric/oslLogBook.git",
    "readme": [
        "npm install",
        "create env"
    ]
}

linux: {
    mongo: [
        'gpg key',
        'setting gpg key',
        'sudo apt-get update',
        'sudo '
    ]
}

/**
 * req file
 * env file -> parse -> create values ->
 * 
 */

/**
 * 
 */