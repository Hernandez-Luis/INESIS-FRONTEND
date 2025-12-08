pipeline {
  agent any

  tools { nodejs 'node18' }

  environment {
    BUILD_DIR = 'build'
    TARGET_DIR = '/var/www/inesis-frontend'
  }

  stages {
    stage('Checkout') {
      steps {
        // Jenkins se encarga de clonar
        checkout([$class: 'GitSCM', 
          branches: [[name: 'deploy']], 
          userRemoteConfigs: [[url: 'git@github-frontend:Hernandez-Luis/INESIS-FRONTEND.git', credentialsId: 'github-frontend-ssh']]])
      }
    }

    stage('Install') {
      steps { sh 'npm ci' }
    }

    stage('Build') {
      steps { sh 'npm run build' }
    }

    stage('Deploy') {
      steps {
        sh "rsync -a --delete ${BUILD_DIR}/ ${TARGET_DIR}/"
        sh 'sudo systemctl reload apache2'
      }
    }
  }

  post {
    success { echo "Frontend build & deploy OK" }
    failure { echo "Frontend failed" }
  }
}
