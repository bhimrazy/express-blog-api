# Makefile
SHELL = /bin/bash

.PHONY: help
help:
	@echo "Commands:"
	@echo "lint    : executes eslint."
	@echo "clean   : cleans all docker images"
	@echo "test    : execute tests"
	@echo "serve   : run server"

# Styling
.PHONY: lint
lint:
	npm run lint

# Cleaning
.PHONY: clean
clean: 
	rm -rf dist
	docker image prune --all --force

# docker compose up
up:
	npm run build
	docker-compose up -d

# docker compose down
down:
	docker-compose down

#docker ps
ps:
	docker ps

# Serve
.ONESHELL:
serve:
	npm run dev

# test
.ONESHELL:
test:
	npm run test