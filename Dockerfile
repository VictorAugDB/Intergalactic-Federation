FROM node
WORKDIR /usr/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
EXPOSE 3333
CMD ["npm","run","dev"]
