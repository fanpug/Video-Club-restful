FROM node 
MAINTAINER Humberto Navarro
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD npm start