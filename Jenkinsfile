pipeline{
    agent any
    parameters{
        choice(name: "VERSION", choices: ["1.0.0", "1.0.1", "1.1.0"], description: "Select the version to deploy")
        booleanParam(name: "RUN_TESTS", defaultValue: true, description: "Run tests after build?")
    }

    stages{   
        stage("build"){
            steps{
                echo "building the application..."
                echo "Application version: ${APP_VERSION}"
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
                echo "Deployment completed for version: ${params.VERSION}"
            
            }
        }  
    }
}
