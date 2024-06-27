# Use the official Node.js image based on Alpine Linux
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install production dependencies and also include dev dependencies required for building/running the application
RUN npm install

# Install ts-node globally
RUN npm i -g ts-node typescript

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your application will run on
EXPOSE 8888

# Command to run your application
CMD ["ts-node", "--require", "./instrumentation.ts", "app.ts"]