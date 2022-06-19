FROM node:lts

WORKDIR /usr/app

COPY . .

RUN yarn

EXPOSE 3000

CMD ["yarn", "dev"]