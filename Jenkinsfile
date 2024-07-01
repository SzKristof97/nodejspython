pipeline {
    agent any

    environment {
        DISCORD_TITLE = "Jenkins - ${env.JOB_NAME}"
        DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1255491935762776175/mj9h4T8YdBaGMzdA0F5NiP-CqKlD7bjceV9J-2ifiMSzQqVFF8yIbvITCCJTcuKLKQVG"
    }

    triggers {
        githubPush();
    }

    stages {
        stage('Discord Notification - Start')
        {
            steps {
                script {
                    sendDiscordNotification("Build Started", 16776960)
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // For a Node.js project, use npm to install dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Create Docker Image') {
            steps {
                script {
                    // Change 'my-app' to 'NodeJSPython' for the Docker image name
                    sh 'docker build -t nodejspython .'
                }
            }
        }

        stage('Kill Docker Container') {
            steps {
                sh 'sudo docker stop nodejspython || true'
                sh 'sudo docker rm nodejspython || true'
            }
        }

        stage('Load and Run Docker Image') {
            steps {
                script {
                    // Run the Docker image, changing the port to 3001 and using 'NodeJSPython' as the image name
                    sh 'sudo docker run -d -p 3001:3001 --name nodejspython nodejspython'
                }
            }
        }
    }
    post{
        failure {
            script {
                sendDiscordNotification("Build Failed", 16711680)
            }
        }
        success {
            script {
                sendDiscordNotification("Build Succeeded", 65280)
            }
        }
    }
}

def sendDiscordNotification(description,color) {
    def payload = """
    {
        "embeds": [{
            "username": "Jenkins",
            "title": "${DISCORD_TITLE}",
            "description": "${description}",
            "color": ${color}
        }]
    }
    """
    sh "curl -H 'Content-Type: application/json' -d '${payload}' ${DISCORD_WEBHOOK_URL}"
}