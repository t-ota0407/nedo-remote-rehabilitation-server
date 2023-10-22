FROM node:16-alpine3.15
ENV NODE_ENV production

WORKDIR /app

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

COPY --chown=node:node package.json yarn.lock ./
RUN npm install --prod --frozen-lockfile

COPY --chown=node:node . .

USER node
CMD ["npm", "start"]