FROM python

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /protracker

COPY requirements.txt .

RUN python -m pip install --upgrade pip

RUN pip install -r requirements.txt

RUN python manage.py makemigrations

RUN python manage.py migrate

COPY . .