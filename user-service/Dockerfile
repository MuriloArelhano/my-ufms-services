FROM node:14-alpine as builder

WORKDIR /app
COPY . .
COPY ./production/* .

RUN npm install
RUN npx tsc

EXPOSE 3334

CMD ./docker-start.sh