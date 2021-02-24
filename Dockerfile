FROM node:12.10.0-slim

USER node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --unsafe-perm

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "start"]