# Step 1: Use official Node.js image as base image
FROM node:18 AS builder

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the Next.js app for production
RUN npm run build

# Step 7: Prepare the production environment
FROM node:18-alpine AS production

# Set working directory for production
WORKDIR /app

# Step 8: Copy only necessary files from the builder image
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Step 9: Expose the port your app will run on
EXPOSE 3000

# Step 10: Run the app in production mode
CMD ["npm", "start"]
