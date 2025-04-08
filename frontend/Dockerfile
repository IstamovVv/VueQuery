FROM node:latest as builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . ./

FROM builder as dev

ENV RUN_COMMAND="npm run dev -- --host 0.0.0.0"
CMD $RUN_COMMAND

