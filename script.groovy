def buildNode() {
    echo "Building the application..."    
    sh "npm install"}
}

def buildImage() {
    echo "Building the docker image..."
    withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
        sh "docker build -t neededcofe/blog-coffee:NJs-BC-2.0 . "
        sh "echo $PASS | docker login -u $USER --password-stdin"
        sh "docker push neededcofe/blog-coffee:NJs-BC-2.0"
    }
}

def deployApp() {
    echo "Deploying the application..."
}
return this
