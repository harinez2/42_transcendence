FROM debian:bookworm

WORKDIR /api

ENV PORT=5000
EXPOSE 5000

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

RUN npm i -g @nestjs/cli \
    && npm i --save-dev @types/node \
    && npm i --save-dev @types/bcrypt \
    && npm i --save-dev webpack 

RUN npm i @prisma/client \
    # && npm i -g npx \
    # && npx prisma generate  \
    # && npx prisma migrate dev --name test \
    && npm i

# RUN npm ci --only=production \
#     && npm cache clean --force \
#     && npm run build

CMD ["npm", "run", "start"]
