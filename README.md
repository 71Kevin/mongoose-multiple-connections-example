# mongoose-multiple-connections-example

This is an example of how to perform multiple simultaneous connections using the Mongoose library with Node.js.

## Requirements

- Node.js
- MongoDB
- Docker (for deployment)

## Installation

1. Clone the repository.
2. Install dependencies with npm install.
3. Set environment variables:
   - APP_NAME
   - APP_PORT
   - MONGO_HOSTS
   - MONGO_DATABASE
   - TIME_ZONE
4. Run the application with npm start.

## Deployment

This project includes a shell script shell.bash to automate deployment using Docker. The script builds a Docker image and runs a container with the application.

To deploy the application, follow these steps:

1. Run the script with bash shell.bash remote deploy

## License

This project is licensed under the MIT License. See the LICENSE file for details.
