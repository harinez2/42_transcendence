# DATA := /home/ft_trans/data

all : buildup

buildup :
	docker-compose up --build

dev : build up

# makedir : build up
# 	sudo mkdir -p \
# 	$(DATA)/db

build :
	docker-compose build --no-cache

up :
	docker-compose up -d

frontend :
	cd frontend && docker-compose exec frontend /bin/bash

format_frontend :
	docker-compose exec frontend npm run format

lint_frontend :
	docker-compose exec frontend npm run lint

backend :
	cd backend && docker-compose exec backend /bin/bash

format_backend :
	docker-compose exec backend npm run format

lint_backend :
	docker-compose exec backend npm run lint

down :
	docker-compose down

clean : down
	docker system prune -a -f

volume_clean :
	docker volume prune -f

image_clean:
	docker rmi $$(docker images -a -q) || true

fclean : clean volume_clean image_clean
# sudo rm -rf $(DATA)

re : fclean all

setup:
	@echo "Setting up git hooks..."
	git config --local commit.template .commit_template

.PHONY: all buildup frontend format_frontend lint_frontend backend format_backend lint_backend down clean volume_clean image_clean fclean re setup
