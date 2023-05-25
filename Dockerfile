# Base image
FROM node:18

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY yarn.lock package.json ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["bash", "-c", "sleep 10 && yarn run typeorm:run-migrations && yarn run start:dev"]