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

# RUN npm install -g typescript@latest
# RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
# RUN apt-get install -y nodejs

WORKDIR /api

ENV PORT=5000

COPY . .

RUN npm install

COPY --chmod=755 docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 5000

CMD ["npm", "run", "start"]
