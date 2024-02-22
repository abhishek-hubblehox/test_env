pipeline {
    agent any
    
    environment {
        INSTANCE_NAME = '34.87.35.49'
        SSH_PRIVATE_KEY = credentials('pipeline-test')
        SSH_USER = 'pipeline-test'
        REMOTE_DIR = '/home/ubuntu/MH-Survey'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code..."
            }
        }
        
        stage("dev") {
            when {
                expression {
                    return env.BRANCH_NAME == "dev"
                }
            }
            steps {
                echo "You are a dev user"
            }
        }
        
        stage("test") {
            when {
                expression {
                    return env.BRANCH_NAME == 'test'
                }
            }
            steps {
                echo "You are a test user"
            }
        }
        
        stage("main") {
            when {
                expression {
                    return env.BRANCH_NAME == 'main'
                }
            }
            steps {
                script {
                    def sshScript = """
                    cd ${REMOTE_DIR}
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
