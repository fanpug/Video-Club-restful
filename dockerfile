FROM node 
LABEL author = "Humberto Navarro"
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD npm start