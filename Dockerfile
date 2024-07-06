FROM node:14
WORKDIR /app
COPY package.json .
RUN npm install
RUN COPY ..
EXPOSE 5000
CMD ["npm","start"] 
#if nodemon not added as dependency ["node","app.js"]

#docker build -t nameofimage
#docker run --name nameofcontainer --rm -d -p 5000:5000 nameofimage

#to dockerise mongodb use prebuilt monngo image
