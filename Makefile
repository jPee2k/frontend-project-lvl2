install:
	npm ci

test:
	npm test

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
