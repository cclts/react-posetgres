FROM node:alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 8080
RUN npm ci --only=production && npm cache clean --force
CMD [ "node", "index.js" ]