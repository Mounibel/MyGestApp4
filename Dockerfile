
# Specify a base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install




# Copy the rest of your app's source code
COPY . .

# Expose port 3000 to be accessible externally
EXPOSE 3000

# Run the app
CMD ["npm", "start"]

