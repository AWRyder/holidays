pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        deleteDir()
        checkout([$class: 'GitSCM', branches: [[name: "*/${env.BRANCH_NAME}"]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'awk-at-bi', url: 'git@github.com:AWRyder/holidays.git']]])
      }
    }
    stage('Validate') {
      steps {
        sh 'echo e'
      }
    }
    stage('Upload to dev') {
          when {
            branch 'develop'
          }
          steps {
            withCredentials(bindings: [sshUserPrivateKey(credentialsId: 'awk-at-bi', keyFileVariable: 'GITHUB_KEY')]) {
              sh 'echo ssh -i $GITHUB_KEY -l git -o StrictHostKeyChecking=no \\"\\$@\\" > run_ssh.sh'
              sh 'chmod +x run_ssh.sh'
              withEnv(overrides: ['GIT_SSH=run_ssh.sh']) {
                sh 'git tag deployable'
                sh 'git remote add uprem git@github.com:AWRyder/uptest.git'
                echo "Uploading to dev"
                sh 'git push uprem deployable:master -f'
              }

            }

          }
        }
    stage('Upload to master') {
          when {
            branch 'master'
          }
          steps {
            withCredentials(bindings: [sshUserPrivateKey(credentialsId: 'awk-at-bi', keyFileVariable: 'GITHUB_KEY')]) {
              sh 'echo ssh -i $GITHUB_KEY -l git -o StrictHostKeyChecking=no \\"\\$@\\" > run_ssh.sh'
              sh 'chmod +x run_ssh.sh'
              withEnv(overrides: ['GIT_SSH=run_ssh.sh']) {
                sh 'git tag deployable'
                sh 'git remote add uprem git@github.com:AWRyder/uptest.git'
                echo "Uploading to master"
                sh 'git push uprem deployable:master -f'
              }

            }

          }
        }

  }
}
