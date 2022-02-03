FROM node:12-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install --production
RUN npm run build

EXPOSE 3000

# TODO: APIシークレットはsecretに入れたい
ENV AUDIO_FILE_SIZE_MAX=100

CMD [ "npm", "start" ]