FROM node:alpine

# Also exposing VSCode debug ports
EXPOSE 8000 9929 9230

RUN apk add --no-cache python make g++ \
    && apk add vips-dev fftw-dev build-base \
    --update-cache \
    --repository https://alpine.global.ssl.fastly.net/alpine/v3.10/community \
    --repository https://alpine.global.ssl.fastly.net/alpine/v3.10/main \
    && rm -fR /var/cache/apk/*

RUN npm install -g gatsby-cli

WORKDIR /app
COPY ./package.json .
RUN yarn install && yarn cache clean
#gatsby build first makes HMR work... don't ask me why
RUN gatsby build
CMD ["gatsby", "develop", "-H", "0.0.0.0" ]