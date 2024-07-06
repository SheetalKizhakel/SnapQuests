FROM node:14
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]

#docker build -t nameofimage
#docker run bindmount --name nameofcontainer --rm -p 3000:3000 -it image
