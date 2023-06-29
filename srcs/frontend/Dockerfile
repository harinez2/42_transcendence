FROM debian:bookworm

WORKDIR /app

EXPOSE 3000

RUN set -ex \
    && apt update \
    && apt install -y  \
    npm \
    vim \
    curl \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

# ENV NODE_ENV=production
# COPY next.config.js ./
# COPY package.json package-lock.json ./
COPY . .

RUN npm i next react react-dom
RUN npm i

# RUN npm run build
# CMD ["npm", "run", "start"]

CMD ["npm", "run", "dev"]