pipeline {
  agent any

  tools { 
    nodejs 'node18'  // nombre de la instalación de NodeJS en Jenkins
  }

  environment {
    BUILD_DIR = 'build'
    TARGET_DIR = '/var/www/inesis-frontend'
  }

  stages {
    stage('Checkout') {
      steps {
        // Clonaje seguro por SSH usando la credential configurada
        checkout([$class: 'GitSCM', 
          branches: [[name: 'deploy']], 
          userRemoteConfigs: [[
            url: 'git@github.com:Hernandez-Luis/INESIS-FRONTEND.git', 
            credentialsId: 'github-frontend-ssh'
          ]]
        ])
      }
    }

    stage('Install') {
      steps { 
        sh 'npm ci' 
      }
    }

    stage('Build') {
      steps { 
        sh 'npm run build' 
      }
    }

    stage('Deploy') {
      steps {
        // Sincroniza la carpeta build con la del servidor
        sh "rsync -a --delete ${BUILD_DIR}/ ${TARGET_DIR}/"
        sh 'sudo systemctl reload nginx'
      }
    }
  }

  post {
    success { 
      echo "Frontend build & deploy OK" 
    }
    failure { 
      echo "Frontend failed" 
    }
  }
}
