FROM node
WORKDIR /app
COPY . .
COPY fullchain-key.pem .
RUN yarn --immutable
RUN chmod +x ./custom-build.sh
RUN ./custom-build.sh
ENTRYPOINT [ "yarn", "start" ]