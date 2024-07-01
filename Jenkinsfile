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
                    sendDiscordNotification("Build Started")
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

        stage('Build') {
            steps {
                script {
                    // Now that dependencies are installed, run the build script
                    sh 'npm run build' // Adjust this command based on your project's build script
                }
            }
        }

        stage('Create Docker Image') {
            steps {
                script {
                    // Change 'my-app' to 'NodeJSPython' for the Docker image name
                    sh 'docker build -t NodeJSPython .'
                }
            }
        }

        stage('Remove Old Docker Image') {
            steps {
                script {
                    // Remove the old Docker image if it exists, now using 'NodeJSPython' as the image name
                    sh 'docker rmi $(docker images -q NodeJSPython:previous) || true'
                }
            }
        }

        stage('Load and Run Docker Image') {
            steps {
                script {
                    // Run the Docker image, changing the port to 3001 and using 'NodeJSPython' as the image name
                    sh 'docker run -d -p 3001:3001 NodeJSPython'
                }
            }
        }

        stage('Discord Notification - Build Finished')
        {
            steps {
                script {
                    sendDiscordNotification("Build Finished")
                }
            }
        }
    }
}

def sendDiscordNotification(description) {
    def payload = """
    {
        "embeds": [{
            "title": "${DISCORD_TITLE}",
            "description": "${description}",
            "color": 5814783
        }]
    }
    """
    sh "curl -H 'Content-Type: application/json' -d '${payload}' ${DISCORD_WEBHOOK_URL}"
}