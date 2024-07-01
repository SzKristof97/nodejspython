# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
# Including development dependencies for Express and Mocha
RUN npm install

# If your app has a build step, you can run it here
# RUN npm run build

# Make port 3000 available to the world outside this container
EXPOSE 3001

# Define environment variable
ENV NODE_ENV=production

# Run the app using nodemon for development
# You might want to change the command for production
CMD ["npm", "run", "start"]