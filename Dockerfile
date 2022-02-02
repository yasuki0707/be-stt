FROM node:12-alpine

WORKDIR /usr/src/app

COPY . .
#COPY package*.json tsconfig.json

RUN npm install --production
RUN npm run tsc


EXPOSE 3000

CMD [ "npm", "start" ]