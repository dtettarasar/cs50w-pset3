.PHONY: help dev dev-detach dev-build down down-v reset-db \
        migrations migrate superuser lock ps logs df clean

DB := db.sqlite3
DJANGO := docker compose exec -T web uv run manage.py

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	  awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-14s\033[0m %s\n", $$1, $$2}'

dev:        ## Démarrer en foreground (logs inline)
	docker compose up

dev-detach: ## Démarrer en arrière-plan
	docker compose up -d

dev-build:  ## Rebuild image + démarrer
	docker compose up --build

down:       ## Stopper proprement (garde la BDD)
	docker compose down

down-v:     ## Stopper + supprimer les volumes Docker
	docker compose down -v

reset-db:   ## Repartir d'une base totalement vierge
	docker compose down
	rm -f $(DB) $(DB)-journal $(DB)-wal $(DB)-shm
	docker compose up -d --wait
	$(DJANGO) migrate
	@echo "✔ Base recréée de zéro."

migrations: ## Générer les migrations
	$(DJANGO) makemigrations

migrate:    ## Appliquer les migrations
	$(DJANGO) migrate

superuser:  ## Créer un compte admin
	$(DJANGO) createsuperuser

lock:       ## Régénérer uv.lock
	docker compose exec -T web uv lock

ps:         ## Conteneurs actifs
	docker compose ps

logs:       ## Logs en direct
	docker compose logs -f

df:         ## Place prise par Docker
	docker system df

clean:      ## Ménage léger
	docker system prune -f