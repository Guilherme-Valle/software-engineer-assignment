up:
	./install-deps.sh
	cd backend && ./vendor/bin/sail up -d
	cd backend && ./vendor/bin/sail artisan migrate
	cd frontend && docker build . -t sparkhire-frontend && docker run --name sparkhire-react-front -p 3000:3000 -d sparkhire-frontend
down:
	docker stop backend_mysql_1 backend_laravel.test_1
	docker stop sparkhire-react-front && docker rm sparkhire-react-front
