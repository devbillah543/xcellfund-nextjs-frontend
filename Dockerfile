FROM node:20.19.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (only production if needed)
RUN npm install

# Copy the rest of the project
COPY . .

# Build the optimized Next.js app
RUN npm run build

# Expose Next.js production port
EXPOSE 3000

# Start the production server
CMD ["npm", "run", "start"]
