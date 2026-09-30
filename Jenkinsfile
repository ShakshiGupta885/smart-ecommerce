pipeline {
    agent any

    tools {
        nodejs 'nodejs18'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Code checked out'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('user-service') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('user-service') {
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('user-service') {
                    sh 'docker build -t user-service:$BUILD_NUMBER .'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}