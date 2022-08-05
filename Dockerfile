FROM node
WORKDIR /app
COPY . .
RUN yarn --immutable
RUN chmod +x ./custom-build.sh
RUN ./custom-build.sh
ENTRYPOINT [ "yarn", "start" ]