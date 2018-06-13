pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout([$class: 'GitSCM',
            branches: [[name: 'origin/develop']],
            extensions: [[$class: 'WipeWorkspace']],
            userRemoteConfigs: [[url: 'git@github.com:AWRyder/holidays.git']]
        ])
      }
    }
    stage('Upload') {
      steps {
        withCredentials(bindings: [sshUserPrivateKey(credentialsId: 'awk-at-bi', keyFileVariable: 'GITHUB_KEY')]) {
          sh 'echo ssh -i $GITHUB_KEY -l git -o StrictHostKeyChecking=no \\"\\$@\\" > run_ssh.sh'
          sh 'chmod +x run_ssh.sh'
          withEnv(overrides: ['GIT_SSH=run_ssh.sh']) {
            sh 'git remote add uptest git@github.com:AWRyder/uptest.git'
            sh 'git push uptest master'
          }

        }

      }
    }
  }
}
