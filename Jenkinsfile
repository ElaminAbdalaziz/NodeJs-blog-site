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
                    gv = load "globalVar.groovy"
                }
            }
        }

        stage("build node"){
            steps{
                script{
                    gv.buildNode()
                }
            }
        } 
        
        stage("build image"){
            steps{
                script{
                    gv.buildImage()
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
