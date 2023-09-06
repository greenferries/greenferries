www-dev:
	cd www && npm run dev

datasette-dev:
	./venv/bin/datasette datasette --reload

full-data-pipeline:
	./venv/bin/python3 -m greenferries.full_pipeline

install-python:
	python3 -m venv venv && ./venv/bin/pip3 install -r greenferries/requirements.txt

install-node:
	cd www && npm install

notebooks-server:
	./venv/bin/jupyter notebook --notebook-dir=notebooks

install: install-python install-node
