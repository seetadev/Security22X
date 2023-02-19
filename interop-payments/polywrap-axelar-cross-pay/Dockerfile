FROM node:16.15.0-alpine3.14 as builder

# Create app directory
WORKDIR /app

RUN apk add --no-cache \
    make g++ git ca-certificates

RUN npm config set unsafe-perm true && npm install -g typescript

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

# nginx container
FROM nginx:1.19.10-alpine

COPY --from=builder /app/build /var/www/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
