FROM python:3.11-alpine3.22

WORKDIR /api

RUN apk add --no-cache bash curl

RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.local/bin:${PATH}"

COPY . .

RUN chmod u+x -R ./scripts

RUN bash ./scripts/setup.sh

EXPOSE 8000

ENTRYPOINT ["./scripts/start.sh"]
