pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(credentialsId: 'awk-at-bi', url: 'git@github.com:AWRyder/holidays.git', branch: 'develop')
      }
    }
    stage('Upload') {
      steps {
        withCredentials(bindings: [sshUserPrivateKey(credentialsId: 'awk-at-bi', keyFileVariable: 'GITHUB_KEY')]) {
          sh 'echo ssh -i $GITHUB_KEY -l git -o StrictHostKeyChecking=no \\"\\$@\\" > run_ssh.sh'
          sh 'chmod +x run_ssh.sh'
          withEnv(overrides: ['GIT_SSH=run_ssh.sh']) {
            sh 'git remote add uptest git@github.com:AWRyder/uptest.git'
            sh 'git push uptest develop:master'
          }

        }

      }
    }
  }
}