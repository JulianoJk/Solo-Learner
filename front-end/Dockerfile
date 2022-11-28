FROM node:16-alpine


# sets working directory
WORKDIR /app/front_end

# copy the package
COPY package.json .

# runs npm install
RUN yarn install

RUN npm i @tabler/icons

RUN yarn 

COPY . .

# exposes port 3000
EXPOSE 3000

# runs the comand npm start
CMD ["yarn", "start"]