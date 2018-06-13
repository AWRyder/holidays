pipeline {
  agent any
  stages {
    stage('Upload') {
      steps {
        withCredentials(bindings: [sshUserPrivateKey(credentialsId: 'awk-at-bi', keyFileVariable: 'GITHUB_KEY')]) {
          sh 'echo ssh -i $GITHUB_KEY -l git -o StrictHostKeyChecking=no \\"\\$@\\" > run_ssh.sh'
          sh 'chmod +x run_ssh.sh'
          withEnv(overrides: ['GIT_SSH=run_ssh.sh']) {
            sh 'git tag deployable'
            sh 'git remote add uptest git@github.com:AWRyder/uptest.git'
            sh 'git push uptest deployable:master -f'
          }

        }

      }
    }
  }
}