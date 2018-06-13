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
        withCredentials([sshUserPrivateKey(credentialsId: 'awk-at-bi', keyFileVariable: 'GITHUB_KEY')]) {
            sh 'echo ssh -i $GITHUB_KEY -l git -o StrictHostKeyChecking=no \\"\\$@\\" > run_ssh.sh'
            sh 'chmod +x run_ssh.sh'
            withEnv(['GIT_SSH=run_ssh.sh']) {
                sh 'git remote add uptest git@github.com:AWRyder/uptest.git'
                sh 'git push uptest master'
            }
        }
      }
    }
  }
}
