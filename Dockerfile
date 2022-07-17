FROM node:lts

WORKDIR /usr/app

COPY . .
RUN yarn

CMD ["yarn",  "dev" ]