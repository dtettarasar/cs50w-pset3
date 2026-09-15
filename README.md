# cs50w-pset3

Source code for the third Problem set Mail for CS50w

More info here: https://cs50.harvard.edu/web/projects/3/mail/

## Quick note about UV

The UV package manager is installed in the project. 

More info here: https://docs.astral.sh/uv/

You can launch the project using uv, with the following command: 

~~~
$ uv sync
$ uv run python manage.py makemigrations
$ uv run python manage.py migrate
$ uv run python manage.py runserver
~~~