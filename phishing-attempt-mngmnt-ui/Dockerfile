FROM node:18 AS builder

WORKDIR /app

COPY /phishing-attempt-mngmnt-ui/package*.json ./

RUN npm install

COPY /phishing-attempt-mngmnt-ui/ .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY phishing-attempt-mngmnt-ui/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

