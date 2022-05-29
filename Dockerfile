FROM node:16.13.2

ENV PORT = 5533
ENV NODE_ENV = development
ENV CONNECTION_STRING = mongodb://root:root@192.168.1.5:27017

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --development

COPY . .

EXPOSE  5533

CMD ["node", ".\src\index.js"]`