deploy_admin:
	git subtree push --prefix admin dokku master

deploy_admin_force:
	git push dokku `git subtree split --prefix admin master`:master --force
