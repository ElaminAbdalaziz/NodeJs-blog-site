def function buildApp() {
    echo "Building the application..."
}

def function testApp() {
    echo "Testing the application..."
}

def function deployApp() {
    echo "Deploying the application..."
    echo "Deploying application version: ${params.VERSION}"
}
return this