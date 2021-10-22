# Docker setup

Build as: `docker build -f docker/prodrun.dockerfile -t jx21 .`
Then it's runnable as `docker run -d -p 3000:3000 jx21 jx21`.

Run PostgresDB: 'docker run --name postgres-jx21 -e POSTGRES_PASSWORD=jx21 -e POSTGRES_USER=jx21 -p 5432:5432 -d postgres'
Run Redis: 'docker run --name redis-jx21 -p 6379:6379 -d redis'
