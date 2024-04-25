# Stage 1: Build the React application (slim Node.js environment)
FROM node:alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production image (lightweight Nginx)
FROM nginx:alpine

# Copy build artifacts from stage 1
COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
