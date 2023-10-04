FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build --production
RUN npm install -g serve
EXPOSE 3000
ENV NODE_ENV=production
CMD serve -s build