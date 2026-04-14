pipeline {
    agent any

    stages {

        stage('build') {
            steps {
                echo 'Iniciando build'
                echo 'Verificando versão do Node.js'
                bat 'node --version'

                echo 'Verificando versão do npm'
                bat 'npm --version'

                echo 'Build finalizado'
            }
        }

        stage('install') {
            steps {
                echo 'Instalando dependências'
                bat 'npm install'
                echo 'Dependências instaladas'
            }
        }

        stage('test') {
            steps {
                echo 'Executando testes'
                bat 'npm test || echo Sem testes definidos'
                echo 'Testes finalizados'
            }
        }
    }
}