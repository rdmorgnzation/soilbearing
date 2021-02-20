# Use the official Python image from the Docker Hub
FROM python:3.8.2

# These two environment variables prevent __pycache__/ files.
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Make a new directory to put our code in.
RUN mkdir /code
RUN mkdir /code/django

# Change the working directory. 
# Every command after this will be run from the /code directory.
WORKDIR /code/django

# Upgrade pip
RUN pip install --upgrade pip

# Copy the requirements.txt file.
# Install the requirements.
COPY ./blcalc/requirements.txt /code/django
RUN pip install -r requirements.txt
COPY ./django/requirements.txt /code/django
RUN pip install -r requirements.txt

# Copy the rest of the code. 
COPY ./blcalc /code/blcalc
COPY ./django /code/django
COPY ./media/nepal_districts.zip /code/media/nepal_districts.zip

