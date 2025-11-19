FROM node:24.11.1-alpine3.22

RUN apk add --no-cache bash curl libc6-compat
RUN npm install -g pnpm@latest-10

WORKDIR /app

COPY . .

RUN chmod u+x -R ./scripts

RUN bash ./scripts/setup.sh

EXPOSE 8080

ENTRYPOINT [ "./scripts/start.sh" ]
