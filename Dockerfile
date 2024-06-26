FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm i -g ts-node typescript

COPY . .

EXPOSE 8888

CMD ["ts-node", "--require", "./instrumentation.ts", "app.ts"]