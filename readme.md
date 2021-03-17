# REST API

# HTTP verbs (methods)

1. GET - read data
2. POST - create data
3. PUT - update whole object
4. PATCH - update part object
5. DELETE - DELETE data
6. OPTIONS - get methods from endpoint/source that are avaliable
7. HEAD - get headers from endpoint

# HTTP status codes:

2.x.x = sucess
3.x.x = redirect
4.x.x = client errors
5.x.x = server errors

200 - ok
201 - created
304 - not modified

400 - bad request
401 - anuthorsied
403 - forbidden
404 - not found
402 - peyment required
418 - I am teapot

500 - internal error
502 - bad gateway
503 - service is unavaliable

# Domain:

https://dupa.google.com/search?title=bieszczady&city=warsaw

https:// - protocl (secure layer - s)
dupa - dubdomain
google - domain
com - TLD (top level domain)
/search - endpoint/source/path
? - query
po ? domena nie jest interpretowany
title=bieszczady - variable key=value
& - separete key val pairs

# REST API / RESTful API

- enpoints

/users example (plural liczba mnoga)

get all users
GET /users

get one user
GET/users/<id> (/users/1)

create one user
POST /users (body)

update full one user
PUT /users/<id> (body)

update partially one user
PATCH /users/<id>

delete one users
DELETE /users/<id>

get all methods from endpoint
OPTIONS /users
OPTIONS /users/<id>

get all headers from endpoint
HEAD /users
HEAD /users/<id>

MVC pattern - wzorzec architektoniczny
Model - model - data - html
View - View - presentation layer - CSS
C - controller - logic - JS
