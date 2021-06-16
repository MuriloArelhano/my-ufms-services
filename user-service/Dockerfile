FROM node:14-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm install pm2 -g
RUN npx tsc

EXPOSE 3334 3333

CMD ./docker-start.sh