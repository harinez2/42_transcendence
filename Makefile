# **************************************************************************** #
#   _ _ ___   _____ ___    _   _  _ ___  ___ ___ _  _ ___  ___ _  _  ___ ___   #
#  | | |_  ) |_   _| _ \  /_\ | \| / __|/ __| __| \| |   \| __| \| |/ __| __|  #
#  |_  _/ /    | | |   / / _ \| .` \__ \ (__| _|| .` | |) | _|| .` | (__| _|   #
#    |_/___|   |_| |_|_\/_/ \_\_|\_|___/\___|___|_|\_|___/|___|_|\_|\___|___|  #
# **************************************************************************** #

NAME		:= transcendence

PROJECT_DIR	:= ./
DOCKER_COMP	:= docker compose -p $(NAME) --project-directory $(PROJECT_DIR)

HEADER		:= header.txt
RM			:= rm -f
UNAME		:= $(shell uname)

# **************************************************************************** #

ifeq ($(UNAME), Darwin)
	# mac
endif

GR	= \033[32;1m
RE	= \033[31;1m
YE	= \033[33;1m
CY	= \033[36;1m
RC	= \033[0m

ifeq ($(DEBUG_MAKE), 1)
PRINT_INFO = $(warning [$@] <- [$?] ($^))
else
PRINT_INFO :=
endif

# **************************************************************************** #

all: notice
	$(DOCKER_COMP) up --build

notice:
	@printf "$(GR)"
	@cat $(HEADER) 2>/dev/null || printf "$(RC)"
	@printf "\n$(CY)Make sure to configure $(YE).envrc.private$(CY)!$(RC)\n"

up: notice
ifeq ($(DETACH), 1)
	$(DOCKER_COMP) up --detach --wait
else
	$(DOCKER_COMP) up
endif

build: notice
	$(DOCKER_COMP) build --no-cache

.PHONY: all notice up build

# **************************************************************************** #

db:
ifeq ($(DETACH), 1)
	$(DOCKER_COMP) up db --detach --wait
else
	$(DOCKER_COMP) up db
endif

studio:
	docker exec backend npm run studio

.PHONY: db studio

# **************************************************************************** #

logs:
ifeq ($(DETACH), 1)
	$(DOCKER_COMP) logs
else
	$(DOCKER_COMP) logs -f
endif

down:
	$(DOCKER_COMP) down

clean:
	$(DOCKER_COMP) down --volumes --remove-orphans

cleanimage:
	$(DOCKER_COMP) down --rmi all --remove-orphans

fclean: clean cleanimage

re: fclean all

dockerclean:
	@printf "$(RE)docker container rm -f \`docker container ls -aq\` || true$(RC)\n"
	@docker container rm -f `docker container ls -aq` || true
	@printf "$(RE)docker volume rm -f \`docker volume ls -q\` || true$(RC)\n"
	@docker volume rm -f `docker volume ls -q` || true
	@printf "$(RE)docker network rm -f \`docker network ls -q\` || true$(RC)\n"
	@docker network rm -f `docker network ls -q` || true
	@printf "$(RE)docker image rm -f \`docker image ls -aq\` || true$(RC)\n"
	@docker image rm -f `docker image ls -aq` || true
	@printf "$(RE)docker system prune -af$(RC)\n"
	@docker system prune -af

db-up:
	docker-compose up -d db

front-dev-local:
	npm --prefix ./srcs/frontend run dev

backend-dev-local:
	npm --prefix ./srcs/backend run start:dev


frontend:
	cd srcs/frontend && docker-compose exec -it frontend sh

backend:
	cd srcs/backend && docker-compose exec -it backend sh

setup:
	@printf "$(GR)Setting up git hooks...$(RC)\n"
	git config --local commit.template .commit_template

.PHONY: logs down clean cleanimage fclean re setup db-up front-dev-local backend-dev-local
