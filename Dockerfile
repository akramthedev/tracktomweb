FROM node:latest as build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 7: Install a simple server to serve the app (e.g., `serve`)
RUN npm install -g serve

# Step 8: Expose the port the app will run on
EXPOSE 3000

# Step 9: Command to run the app
CMD ["serve", "-s", "build", "-l", "3000"]

