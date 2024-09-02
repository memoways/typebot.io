.PHONY: build

build: deps
	pnpm run build:apps

.PHONY: deps

deps:
	pnpm install


.PHONY: clean

ENV:=$(file < .env)

clean: delete-git .WAIT write-env

.PHONY: delete-git

delete-git:
	git clean -d -f -X

.PHONY: write-env

write-env:
	$(file > .env,${ENV})

