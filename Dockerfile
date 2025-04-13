FROM node:21-alpine as build

WORKDIR /app

COPY package.json yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx as production

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./selfsigned.crt /etc/ssl/certs/selfsigned.crt
COPY ./selfsigned.key /etc/ssl/private/selfsigned.key

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
