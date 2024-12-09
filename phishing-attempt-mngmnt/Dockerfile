FROM node:18-alpine as builder

WORKDIR /app
EXPOSE 3000

COPY /phishing-attempt-mngmnt/package.json ./

RUN npm install

COPY /phishing-attempt-mngmnt/ .

RUN npm run build

CMD ["npm", "run", "start"]
