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
                    buildImage 'neededcofe/blog-coffee:NJs-BC-3.0'    
                    dockerLogin()
                    dockerPush('neededcofe/blog-coffee:NJs-BC-3.0')
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
    }
}

