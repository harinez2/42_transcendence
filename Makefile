.DEFAULT_GOAL=setup


.PHONY: setup
setup:
	@echo "Setting up git hooks..."
	git config commit.template .commit_template
