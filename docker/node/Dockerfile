FROM node:latest
WORKDIR /usr/src/app
#COPY ../../package*.json ./
COPY . /usr/src/app
#RUN yarn install -g nodemon
RUN yarn global add nodemon
RUN yarn global add typescript
RUN yarn global add concurrently
RUN yarn install

