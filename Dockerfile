 # Use an official Node.js runtime as the base image
FROM node:23-alpine3.20

# Set the working directory in the container
WORKDIR /app

# Copy the Angular application source code
COPY . ./

# Install dependencies
RUN npm install

# Expose the port that the app will run on
EXPOSE 4200

# Define the command to start the application
CMD [ "npm", "run", "start", "--", "--host", "0.0.0.0" ]
