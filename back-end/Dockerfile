FROM node:16-alpine

WORKDIR /app/back-end

COPY package.json .

RUN yarn 

RUN npm i bcryptjs && npm i @types/express && npm install express

RUN yarn add nodemon && yarn add dotenv && yarn

COPY . .

EXPOSE 3000

# ENV MONGO_CONN="mongodb+srv://Juliano:kiankon12@sololearner.n7xae7g.mongodb.net/?retryWrites=true&w=majority"

# ENV JWT_KEY="A8B855EA15FE2E24DAA6659F6F3DC"
# ENV JWT_EXPIRES_IN="3h"
# ENV TEACHER_EMAIL=["niovits@gmail.com"]

CMD ["yarn", "start"]