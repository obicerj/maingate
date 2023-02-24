FROM node:14

WORKDIR /server

# COPY package*.json ./
COPY ./server/package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]