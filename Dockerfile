FROM node:buster-slim

ENV NODE_ENV=production
ENV PORT=8080
ENV MODELURL='https://storage.googleapis.com/submissionmlgc_mdaffaraihans/model.json'
ENV PROJECT_ID='gleaming-block-427906-d7'
ENV DATABASE_ID='predictions'
ENV COLLECTION='predictions'

COPY . .

RUN apt-get update && \
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \
    libc6-dev

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "prod" ]
