pipeline {
    agent any

    tools {
        nodejs 'nodejs18'
    }

    environment {
        DOCKER_HUB_USER = 'shakshigupta20'
        IMAGE_NAME = "${DOCKER_HUB_USER}/user-service"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '✅ Code checked out'
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
                    sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest .'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'docker push ${IMAGE_NAME}:${IMAGE_TAG}'
                sh 'docker push ${IMAGE_NAME}:latest'
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline succeeded! Image pushed to Docker Hub.'
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}