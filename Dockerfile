FROM node:12

COPY package*.json ./

RUN npm i

COPY . .

ADD . . 

EXPOSE 3069

CMD npm run start
