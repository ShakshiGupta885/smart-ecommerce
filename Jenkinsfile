pipeline {
    agent any

    tools {
        nodejs 'nodejs18'
    }

    environment {
        DOCKER_HUB_USER = 'shakshigupta20'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Code checked out'
            }
        }

        stage('Build user-service') {
            steps {
                dir('user-service') {
                    sh 'npm install'
                    sh 'npm test'
                    sh 'docker build -t ${DOCKER_HUB_USER}/user-service:${IMAGE_TAG} -t ${DOCKER_HUB_USER}/user-service:latest .'
                }
            }
        }

        stage('Build product-service') {
            steps {
                dir('product-service') {
                    sh 'npm install'
                    sh 'npm test'
                    sh 'docker build -t ${DOCKER_HUB_USER}/product-service:${IMAGE_TAG} -t ${DOCKER_HUB_USER}/product-service:latest .'
                }
            }
        }

        stage('Build order-service') {
            steps {
                dir('order-service') {
                    sh 'npm install'
                    sh 'npm test'
                    sh 'docker build -t ${DOCKER_HUB_USER}/order-service:${IMAGE_TAG} -t ${DOCKER_HUB_USER}/order-service:latest .'
                }
            }
        }

        stage('Build payment-service') {
            steps {
                dir('payment-service') {
                    sh 'npm install'
                    sh 'npm test'
                    sh 'docker build -t ${DOCKER_HUB_USER}/payment-service:${IMAGE_TAG} -t ${DOCKER_HUB_USER}/payment-service:latest .'
                }
            }
        }

        stage('Security Scan (Trivy)') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL --no-progress ${DOCKER_HUB_USER}/user-service:${IMAGE_TAG} || true'
                sh 'trivy image --severity HIGH,CRITICAL --no-progress ${DOCKER_HUB_USER}/product-service:${IMAGE_TAG} || true'
                sh 'trivy image --severity HIGH,CRITICAL --no-progress ${DOCKER_HUB_USER}/order-service:${IMAGE_TAG} || true'
                sh 'trivy image --severity HIGH,CRITICAL --no-progress ${DOCKER_HUB_USER}/payment-service:${IMAGE_TAG} || true'
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

        stage('Push All Images') {
            steps {
                sh 'docker push ${DOCKER_HUB_USER}/user-service:${IMAGE_TAG}'
                sh 'docker push ${DOCKER_HUB_USER}/user-service:latest'
                sh 'docker push ${DOCKER_HUB_USER}/product-service:${IMAGE_TAG}'
                sh 'docker push ${DOCKER_HUB_USER}/product-service:latest'
                sh 'docker push ${DOCKER_HUB_USER}/order-service:${IMAGE_TAG}'
                sh 'docker push ${DOCKER_HUB_USER}/order-service:latest'
                sh 'docker push ${DOCKER_HUB_USER}/payment-service:${IMAGE_TAG}'
                sh 'docker push ${DOCKER_HUB_USER}/payment-service:latest'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! All 4 images scanned, built, and pushed.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}