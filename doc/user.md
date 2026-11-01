# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "anya123",
  "password": "rahasia",
  "name": "Anya Forger"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "anya123",
    "name": "Anya Forger"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username must not blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "anya123",
  "password": "rahasia"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "anya123",
    "name": "Anya Forger",
    "token": "uuid"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username or password wrong, ..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

- Authorization : token

Response Body (Success) :

```json
{
  "data": {
    "username": "anya123",
    "name": "Anya Forger"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- Authorization : token

Request Body :

```json
{
  "password": "rahasia", // tidak wajib
  "name": "Anya Forger" // tidak wajib
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "anya123",
    "name": "Anya Forger"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

- Authorization : token

Response Body (Success) :

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized, ..."
}
```
