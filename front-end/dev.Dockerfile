FROM node:12
WORKDIR /front-end
COPY package.json yarn.lock ./
RUN yarn