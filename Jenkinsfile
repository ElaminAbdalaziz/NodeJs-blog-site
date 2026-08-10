pipeline{
    agent any

    tools{
        nodejs 'node24'
    }

    stages{   
        stage("build node"){
            steps{
                script{
                    echo "Building the application..."
                    sh "npm install"
                }
            }
        } 
        
        stage("build image"){
            steps{
                script{
                    echo "Building the docker image..."
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh "docker build -t aziz-dh/blog-coffee-app:nodejs-bc-2.0 . "
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh "docker push aziz-dh/blog-coffee-app:nodejs-bc-2.0"
                    }
                }
            }
        } 
        
        stage("deploy"){
            steps{
                script{
                    echo "Deploying the application..."
                }
            
            }
        }  
    }
}
