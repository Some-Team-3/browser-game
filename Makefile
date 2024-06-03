install:
	npm ci
lint:
	npx eslint .
build:
	rm -rf dist
	npm run build
start:
	npm run start