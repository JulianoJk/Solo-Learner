FROM node:16-alpine


# sets working directory
WORKDIR /usr/src/app/front_end

# copy the package
COPY package.json .

# runs yarn install
RUN yarn install

RUN yarn add @tabler/icons-react

RUN yarn 

COPY . .

# exposes port 3000
EXPOSE 3000

# runs the comand yarn start
CMD ["yarn", "start"]