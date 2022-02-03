FROM node:12.22.7-alpine
WORKDIR /cloud_project
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]