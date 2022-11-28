FROM node:16-alpine

WORKDIR /app/back-end

COPY package.json .

RUN yarn 

RUN npm i bcryptjs && npm i @types/express && npm install express

RUN yarn add nodemon && yarn add dotenv && yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
