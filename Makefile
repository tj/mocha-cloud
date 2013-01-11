
build: client.js
	component build --standalone cloud

test:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter spec

.PHONY: test
