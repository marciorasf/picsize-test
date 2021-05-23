FROM node:14.16.1-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

ENV PORT=3100

EXPOSE 3100

CMD ["node", "./src/index"]