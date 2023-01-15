FROM node:16-alpine

WORKDIR /usr/src/app/back-end

COPY package.json .

RUN yarn 

RUN npm i bcryptjs && npm install express && npm i --save-dev @types/express && npm i nodemon && npm i dotenv

RUN yarn add nodemon && yarn add dotenv && yarn

COPY . .

EXPOSE 3001

CMD ["yarn", "start"]
