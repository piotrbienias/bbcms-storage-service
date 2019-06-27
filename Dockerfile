FROM node:10.16-alpine

WORKDIR /opt/storage-service

COPY . .

RUN npm ci --quiet

CMD ["npm", "start"]