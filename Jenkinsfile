#!/user/bin/env groovy  
library identifier: 'jenkins-shared-library@main', retriever: modernSCM([
    $class: 'GitSCMSource',
    remote: 'https://github.com/ElaminAbdalaziz/jenkins-shared-library.git',
    credentialsId: 'Neededcofe'
])


def gv

pipeline{
    agent any

    tools{
        nodejs 'node26'
    }

    stages{  
        stage("increment version"){
            steps{
                sh 'npm version patch --no-git-tag-version'
                script{
                    echo "incrementing app version..."
                    env.APP_VERSION = sh(
                        script: "node -p \"require('./package.json').version\"", 
                        returnStdout: true
                    ).trim()

                }
            }
        }

        stage("init"){
            steps{
                script{
                    gv = load "script.groovy"
                }
            }
        }

        stage("build node"){
            steps{
                script{
                    buildNode()
                }
            }
        } 
        
        stage("build image"){
            steps{
                script{
                    buildImage "neededcofe/blog-coffee:${env.APP_VERSION}"   
                    dockerLogin()
                    dockerPush "neededcofe/blog-coffee:${env.APP_VERSION}"
                }
            }
        } 
        
        stage("deploy"){
            steps{
                script {
                    def dockerComposeCmd = "APP_VERSION=${env.APP_VERSION} docker-compose -f docker-compose.yml up --detach"
                    sshagent(credentials: ['ec2-server-key']) {
                        sh "scp -o StrictHostKeyChecking=no docker-compose.yml ec2-user@13.50.197.201:/home/ec2-user"
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@13.50.197.201 '${dockerComposeCmd}'"
                    }
                    gv.deployApp()
                }
            
            }
        }  

        stage("commit version update"){
            steps{
                withCredentials([gitUsernamePassword(credentialsId: 'Neededcofe', gitToolName: 'Default')]) {
                    sh 'git config --global user.email "jenkins@example.com"'
                    sh 'git config --global user.name "jenkins"'
                    sh 'git add .'
                    sh "git commit -m 'Update version to ${env.APP_VERSION}'"
                    sh 'git push origin HEAD:main'
                }
            }
        }
    }
}


