First set-up the enviroment [python -m venv venv]

Install django and django DRF [pip install django, pip install djangorestframework django-cors-header]

Set-up the django project [django-admin stratproject (name) , python manage.py startapp (name)]

Configure settings.py (add rest_framework, corsheaders, and your store app to INSTALLED_APPS and set up CORS_ALLOWED_ORIGINS).

Create the models in models.py
Create a serializer
