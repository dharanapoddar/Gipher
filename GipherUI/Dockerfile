FROM node:9.6.1
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4200
CMD npm run start