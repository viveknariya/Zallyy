# This file is only suitable to be used during development, not production.
# It only sets up and installs the packages. 
# The source will be mounted as a volume by Docker compose.

FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci --audit=false --fund=false

CMD ["npm", "start"]