FROM node:17-alpine
WORKDIR /todos-app
ENV PATH="./node_modules/.bin:$PATH"
COPY . . 
RUN yarn install
CMD ["yarn", "start"]