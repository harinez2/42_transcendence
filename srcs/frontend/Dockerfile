FROM node:20.2-alpine3.16

WORKDIR /app

COPY package*.json ./
RUN npm ci # --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
