pipeline {
    agent any
    environment {
        INSTANCE_NAME = '34.87.35.49'
        SSH_PRIVATE_KEY = credentials('pipeline-test')
        SSH_USER = 'pipeline-test'
        REMOTE_DIR = '/home/ubuntu/MH-Survey'
        GIT_USERNAME = 'abhishek1.singh@hubblehox.com'
        GIT_PASSWORD = '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'
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    sshScript = """
                    cd ${REMOTE_DIR}
                    pwd
                    id
                    git remote -v
                    git pull
                    pm2 start "npm run dev" --name "Backend"
                    """
                    // Execute the script block via SSH on the remote server
                    sh "ssh -i ${SSH_PRIVATE_KEY} ${SSH_USER}@${INSTANCE_NAME} -o StrictHostKeyChecking=no '${sshScript}'"
                }
            }
        }
    }
}
