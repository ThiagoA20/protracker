## Preview
---

gif

---
## About
---

what's the purpose of this application?

Imagine that you are building a system to deliver packages with drones, how hard it would be to manage the supply chain if you need to remember every single
place that you visited to send the drones over there? well, with the protracker now this problem was solved! you can easily store the latitude, longitude and the
time that the packages has arrived at some place.

---
## Getting Started
---

How to run it in your machine?

first you need to install docker, on linux type on the terminal: `sudo apt-get install docker`

go to the project folder and change the name of the file ".env.example" to ".env"

on the terminal, in the same folder, type: `docker-compose up`, then the server should start on your machine and
if you access "https://127.0.0.1:8000" on your browser you will can see the application running.

---
## Code Structure
---

What are the design patterns?

The design pattern used was the factory. This means that every component (function) of the project are inside another component, but every thing
was builded in the same way. They have less jobs to do and can call features from other components. So, this will make the code easy to understand and maintain, testing and adding features.

---
