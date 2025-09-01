serve:
	python3 -m http.server -d web 8080

open:
	xdg-open http://localhost:8080 || open http://localhost:8080 || true

