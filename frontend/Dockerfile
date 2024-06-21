# Use the official Node.js image
FROM node:lts-alpine

# Create app directory
WORKDIR /frontend

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev", "--", "--host"]
