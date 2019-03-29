FROM epages/bob:node10 as base

# create workspace for/as `node` user
USER node
ENV WORKSPACE='/home/node/workspace'
RUN mkdir -p ${WORKSPACE}
WORKDIR ${WORKSPACE}

# Run build
FROM base as builder

COPY --chown=node . .

# ENV NODE_ENV=production

RUN npm ci
RUN node_modules/.bin/webpack -p
# RUN npm i --production

FROM node:10.15.3-alpine as runner

USER node

COPY --chown=node --from=builder /home/node/workspace/node_modules /home/node/node_modules
COPY --chown=node --from=builder /home/node/workspace /home/node/

ENV NODE_ENV="production"

WORKDIR /home/node/
CMD ./node_modules/.bin/babel-node app.js
EXPOSE 3000
