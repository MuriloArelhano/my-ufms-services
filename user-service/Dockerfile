FROM node:14-alpine as builder

WORKDIR /app
COPY . .
COPY ./production/* .

RUN npm install
RUN npm install pm2 -g
RUN npx tsc
RUN rm -rf src

EXPOSE 3334

CMD ./docker-start.sh