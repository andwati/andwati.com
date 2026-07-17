#!/usr/bin/make -f

.PHONY: all build

BUILD_DIR := public

all: clean build

clean:
	rm -rfd ./$(BUILD_DIR)

build:
	node scripts/generate-llms.mjs
	zola build

serve:
	node scripts/generate-llms.mjs
	zola serve

update-zola:
	@./bin/update-zola
