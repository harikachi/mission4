**Description**

This repo is created to build an Insurance Bot Application using Google Gemini API, using react front end and Node as backend.

**Usage**

There will be one .env file under server app.

Make sure to replace the .env_sample file to .env and use appropriate GEMINI_API key and the port numbers.

Once the react and node applications are working use the docker file script to create the containers.

Use below commands for individual files

docker build -t chatbot-react-app .
docker run -p 3000:80 chatbot-react-app

docker build -t chatbot-server-app .
docker run -p 3001:3001 chatbot-server-app

To run the docker-compose file use below command.
docker-compose up --build
