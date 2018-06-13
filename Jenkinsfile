pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        deleteDir()
        checkout([$class: 'GitSCM', branches: [[name: '*/develop']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'awk-at-bi', url: 'git@github.com:AWRyder/holidays.git']]])
      }
    }
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