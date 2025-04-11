pipeline {
    agent any
    environment {
        IMAGE_NAME = 'banking-api'
        IMAGE_TAG = "v${env.BUILD_NUMBER}"
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/anhtien3T/banking-api.git', branch: 'main'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }
        stage('Load Image to Minikube') {
            steps {
                sh "minikube image load ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }
        stage('Update Helm Chart') {
            steps {
                sh """
                git clone https://github.com/anhtien3T/helm-charts.git
                cd helm-charts/banking-api
                sed -i 's|tag:.*|tag: ${IMAGE_TAG}|' values.yaml
                git add .
                git commit -m 'Update image tag to ${IMAGE_TAG}'
                git push origin main
                """
            }
        }
    }
}