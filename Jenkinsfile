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
                script{
                    gv.deployApp()
                }
            
            }
        }  

        stage("commit version update"){
            steps{
                withCredentials([gitUsernamePassword(credentialsId: 'Neededcofe', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh 'git config --global user.email "jenkins@example.com"'
                    sh 'git config --global user.name "jenkins"'

                    sh 'git status'
                    sh 'git branch'
                    sh 'git config --list'

                    sh "git remote set-url origin https://${USER}:${PASS}@github.com/ElaminAbdalaziz/NodeJs-blog-site.git"
                    sh 'git add .'
                    sh "git commit -m 'Update version to ${env.APP_VERSION}'"
                    sh 'git push origin HEAD:main'
                }
            }
        }
    }
}

