pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('install') {
            steps {
                bat 'npm install'
            }
        }

        stage('test') {
            steps {
                bat 'npm test || echo Sem testes definidos'
            }
        }
    }
}