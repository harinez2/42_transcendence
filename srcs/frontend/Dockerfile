FROM debian:bookworm

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

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]