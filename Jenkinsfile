def gv 

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

    // SERVER_CREDENTIALS = credentials("server-credentials")

    // tools{
    //     //maven "maven-3.8.6"
    // }

    parameters{
        choice(name: "VERSION", choices: ["1.0.0", "1.0.1", "1.1.0"], description: "Select the version to deploy")
        booleanParam(name: "RUN_TESTS", defaultValue: true, description: "Run tests after build?")
    }

    stages{   
        stage("init"){
            steps{
                script{
                    gv = load "script.groovy"
                }
            }
        }

        stage("build"){
            steps{
                script{
                    gv.buildApp()
                }
            }
        }
    
    
        stage("test"){

            when{
                expression{ return params.RUN_TESTS }
            }

            steps{
                script{
                    gv.testApp()
                }
            }
        }   
        
        stage("deploy"){
            steps{
                //echo "Deploying to server with credentials: ${SERVER_CREDENTIALS}"

                // withCredentials([usernamePassword(credentialsId: 'server-credentials', usernameVariable: USER, passwordVariable: PWD)])
                // {
                //     sh "echo Deploying to server with username: ${USER} and password: ${PWD}"
                // }

                input{
                    message: "Choose the deployment environment"
                    ok: "Deploy"
                    parameters {
                        choice(name: 'ENV', choices: ["dev", "staging", "production"], description: "Select the deployment environment")
                    }
                }

                script{
                    gv.deployApp()
                    echo "Deploying to environment: ${ENV}"
                }
            
            }
        }  
    }
}
