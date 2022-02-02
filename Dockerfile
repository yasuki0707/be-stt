FROM node:12-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install --production
RUN npm run build

EXPOSE 3000

# TODO secretに入れたい
ENV API_KEY_STT=SKMDll1_JQnoyiU5stiJ77VC3RVKKlQlGW6rUyhIoWHG
ENV API_ENDPOINT_STT=https://api.jp-tok.speech-to-text.watson.cloud.ibm.com/instances/c7162bc0-5926-48de-a6c7-1fe93d8e0e65
ENV AUDIO_FILE_SIZE_MAX=100

CMD [ "npm", "start" ]