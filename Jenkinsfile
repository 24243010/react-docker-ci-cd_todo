pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build Docker Image') {
            steps {
                bat "docker build -t react-app:%BUILD_NUMBER% ."
            }
        }
        stage('Deploy Application') {
            steps {
                script {
                    def appName = "my-react-app"
                    bat "docker stop ${appName} || exit /b 0"
                    bat "docker rm ${appName} || exit /b 0"
                    bat "docker run -d --name ${appName} -p 3000:5000 react-app:%BUILD_NUMBER%"
                }
            }
        }
    }
    post {
        always { bat 'echo "Pipeline finished."' }
    }
}
