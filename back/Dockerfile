FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install pm2 -g
EXPOSE 4000
CMD ["pm2-runtime", "ecosystem.config.js"]
