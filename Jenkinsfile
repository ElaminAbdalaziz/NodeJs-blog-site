pipeline{
    agent any

    post{
        always{
        echo "Cleaning up workspace..."
        cleanWs()
        }

        success{
        echo "Pipeline completed successfully!"
        }

        failure{
        echo "Pipeline failed!"
        }
    }

    // environment{
    //     APP_VERSION = "1.1.0"
    //     //SERVER_CREDENTIALS = credentials("server-credentials")
    // }

    // tools{
    //     //maven "maven-3.8.6"
    // }

    parameters{
        choice(name: "VERSION", choices: ["1.0.0", "1.0.1", "1.1.0"], description: "Select the version to deploy")
        booleanParam(name: "RUN_TESTS", defaultValue: true, description: "Run tests after build?")
    }

    stages{   
        stage("build"){
            steps{
                echo "building the application..."
                echo "Application version: ${params.VERSION}"
            }
        }
    
    
        stage("test"){

            when{
                expression{ return params.RUN_TESTS }
            }

            steps{
                echo "testing the application..."
            }
        }   
        
        stage("deploy"){
            steps{
                echo "deploying the application..."
                //echo "Deploying to server with credentials: ${SERVER_CREDENTIALS}"

                // withCredentials([usernamePassword(credentialsId: 'server-credentials', usernameVariable: USER, passwordVariable: PWD)])
                // {
                //     sh "echo Deploying to server with username: ${USER} and password: ${PWD}"
                // }

                echo "Deployment completed for version: ${params.VERSION}"
            
            }
        }  
    }
}
