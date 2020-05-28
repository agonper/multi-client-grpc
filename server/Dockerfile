# Builder image
FROM golang:1.14-alpine as builder

WORKDIR /app

RUN mkdir server && mkdir api

COPY ./api/go.* ./api/
COPY ./server/go.* ./server/
RUN cd server && go mod download && cd ..

COPY ./api/* ./api/
COPY ./server/* ./server/

RUN cd server && go build -v -o server

# Server image
FROM alpine:latest

RUN apk --no-cache add ca-certificates

COPY --from=builder /app/server/server /server

CMD [ "/server" ]
