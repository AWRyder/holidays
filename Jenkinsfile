pipeline {
  agent any
  stages {
    stage('Process') {
      steps {
        sleep 2
      }
    }
    stage('Upload') {
      steps {
        git(url: 'git@github.com:AWRyder/uptest.git', branch: 'master', credentialsId: 'awk-at-bi')
      }
    }
  }
}