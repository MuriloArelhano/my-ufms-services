FROM node:14-alpine as builder

WORKDIR /app
COPY . .

RUN npm install --production

EXPOSE 4445

CMD node ./src/app.js