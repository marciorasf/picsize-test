FROM node:14.16.1-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["node", "./src/index"]