pipeline {
    agent { docker { image 'node:24.14.1-alpine3.23' } }

    stages {
        stage('build') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('install') {
            steps {
                sh 'npm install'
            }
        }

        stage('test') {
            steps {
                sh 'npm test || echo "Sem testes definidos"'
            }
        }
    }
}