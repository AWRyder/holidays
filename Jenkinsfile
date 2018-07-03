pipeline {
  agent any
  stages {
    stage('Validate') {
      parallel {
        stage('Validate') {
          steps {
            sh 'mvn validate'
          }
        }
        stage('') {
          steps {
            sh 'echo \'init\''
          }
        }
      }
    }
  }
}