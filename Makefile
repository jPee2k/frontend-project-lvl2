install:
	npm i

reinstall:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

link:
	npm link
