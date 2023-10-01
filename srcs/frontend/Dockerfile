FROM node:18.18.0-alpine3.18

WORKDIR /app

COPY package*.json ./
RUN npm ci # --only=production

COPY --chmod=755 docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
