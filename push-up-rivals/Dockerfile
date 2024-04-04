# Base image
FROM node:20.11-alpine3.18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the app's source code
COPY . .

# Expose the port for the app
EXPOSE 3030

# Start the app
CMD ["npm", "run", "dev"]
