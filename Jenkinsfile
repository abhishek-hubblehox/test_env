pipeline {
    agent any
    environment {
        INSTANCE_NAME = '34.87.35.49'
        SSH_PRIVATE_KEY = credentials('pipeline-test')
        SSH_USER = 'pipeline-test'
        REMOTE_DIR = '/home/ubuntu/test_env'
    }
    stages {
        stage('Checkout') {
            steps {
                echo "Checkout"
            }
        }
        stage("dev") {
            when {
                expression {
                    return env.BRANCH_NAME == "dev"
                }
            }
            steps {
                script {
                    sshScript = """
                    cd ${REMOTE_DIR}
                    git remote -v
                    git pull
                    pm2 restart "Backend"
                    """
                    sh "ssh -i ${SSH_PRIVATE_KEY} ${SSH_USER}@${INSTANCE_NAME} -o StrictHostKeyChecking=no '${sshScript}'"
                }
            }
        }
        stage("test") {
            when {
                expression {
                    return env.BRANCH_NAME == 'test'
                }
            }
            steps {
                script {
                    sshScript = """
                    cd ${REMOTE_DIR}
                    git remote -v
                    git pull
                    pm2 restart "Backend"
                    """
                    sh "ssh -i ${SSH_PRIVATE_KEY} ${SSH_USER}@${INSTANCE_NAME} -o StrictHostKeyChecking=no '${sshScript}'"
                }
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
                    sshScript = """
                    cd ${REMOTE_DIR}
                    git remote -v
                    git pull
                    pm2 restart "Backend"
                    """
                    sh "ssh -i ${SSH_PRIVATE_KEY} ${SSH_USER}@${INSTANCE_NAME} -o StrictHostKeyChecking=no '${sshScript}'"
                }
            }
        }
    }
}
