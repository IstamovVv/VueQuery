FROM node:latest as builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . ./

FROM builder as dev

ENV RUN_COMMAND="npm run start"
CMD $RUN_COMMAND