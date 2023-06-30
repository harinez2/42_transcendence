FROM debian:bookworm

WORKDIR /api

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

COPY tsconfig.json ./
COPY package.json package-lock.json ./
COPY . .

# RUN npm i -g @nestjs/cli \
#     && npm i --save-dev @types/node \
#     && npm i --save-dev @types/bcrypt \
#     && npm i --save-dev webpack \
#     && npm i @prisma/client \
#     # && rm -rf node_modules \
#     && npm i

# RUN npx prisma migrate dev --name init \
#     && npm i @prisma/client

# RUN npm ci --only=production \
#     && npm cache clean --force \
#     && npm run build

# RUN npm run build
RUN npm i

ENV PORT=5000
EXPOSE 5000

CMD ["npm", "run", "start"]
# CMD ["npm", "run", "start:dev"]