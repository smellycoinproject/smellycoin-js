FROM node:6

VOLUME /smellycoin

WORKDIR /smellycoin

ENTRYPOINT node bin/smellycoin.js -a 0.0.0.0

EXPOSE 3001
