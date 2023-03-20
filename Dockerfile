# Use a lightweight base image
FROM node:12-alpine

# Set the working directory
WORKDIR /app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the application files
COPY . .

# Set the appropriate permissions for the application files
RUN chown -R node:node /app
USER node

# Expose the necessary port(s)
EXPOSE 3069

# Start the application
CMD ["npm", "start"]
