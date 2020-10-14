FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY ./outdated-browser.html /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
