activate-venv:
	sh -c "source venv/bin/activate"

www-dev:
	cd www && npm run dev

datasette-dev:
	./greenferries/venv/bin/datasette dbs/*.db --metadata datasette/metadata.yml --static static:datasette/static/ --reload

full-data-pipeline:
	./greenferries/venv/bin/python3 -m greenferries.full_pipeline

install-python:
	python3 -m venv venv && source venv/bin/activate && pip3 install -r greenferries/requirements.txt

install-node:
	cd www && npm install

notebooks-server:
	sh -c "source greenferries/venv/bin/activate && jupyter notebook --notebook-dir=notebooks"

install: install-python install-node
