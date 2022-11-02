# Makefile
SHELL = /bin/bash

.PHONY: help
help:
	@echo "Commands:"
	@echo "venv    : creates a virtual environment."
	@echo "style   : executes style formatting."
	@echo "clean   : cleans all docker images"
	@echo "test    : execute tests"
	@echo "serve   : run server"

# Styling
.PHONY: style
style:
	black .
	# flake8
	python -m isort .

# Cleaning
.PHONY: clean
clean: 
	rm -rf dist
	# docker image prune --all --force
	docker rmi express-blog-api-node:latest

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
