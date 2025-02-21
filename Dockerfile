FROM node:23-slim AS builder

RUN apt-get update && apt-get install -y \
    procps \
    libaio1 \
    wget \
    unzip && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g @nestjs/cli

WORKDIR /opt/oracle

RUN wget https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linuxx64.zip && \
    unzip instantclient-basiclite-linuxx64.zip && \
    rm -f instantclient-basiclite-linuxx64.zip && \
    mv instantclient_* instantclient_21_11 && \
    cd instantclient_21_11 && \
    rm -f *jdbc* *occi* *mysql* *mql1* *ipc1* *jar uidrvci genezi adrci && \
    echo /opt/oracle/instantclient_21_11 > /etc/ld.so.conf.d/oracle-instantclient.conf && ldconfig

USER node

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY --chown=node:node . .

RUN npm run build

COPY --chown=node:node src/@core/crm/customers/infra/db/files/channels.xlsx /app/dist/@core/crm/customers/infra/db/files/channels.xlsx
COPY --chown=node:node src/@core/@shared/application/utils/email/sufix-emails.txt /app/dist/@core/@shared/application/utils/email/sufix-emails.txt

FROM node:23-slim AS production

COPY --from=builder /opt/oracle/instantclient_21_11 /opt/oracle/instantclient_21_11

RUN apt-get update && apt-get install -y \
    libaio1 \
    tzdata && \
    rm -rf /var/lib/apt/lists/*

ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_21_11
ENV NODE_ENV=production
ENV APP_PORT=3000
ENV TZ=America/Sao_Paulo

USER node

WORKDIR /app

RUN mkdir -p /app/temp

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/dist/ ./dist/

CMD ["node", "dist/main.js"]
