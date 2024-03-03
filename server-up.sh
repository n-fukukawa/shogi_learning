docker compose up -d && \
docker compose exec app bash -c "composer install" && \
cd src && npm run dev