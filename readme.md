# Backend Challenge Picpay

This is a challenge project proposed by the picpay-desafio-backend repository, created to enhance and practice skills in backend development. Below are the main paths (endpoints) available in the API.

## Endpoints

### GET /api-docs

Swagger Interface

### GET /users

Retrieve the list of all registered users.

### GET /users/{id}

Retrieve information about a specific user based on the provided ID.

### POST /users

Create a new user (common or merchant) based on the data provided in the payload.

#### Payload:

Common user

```json
{
    "fullName": "Gabriel o Comum",
    "email": "gabrielcomum@hotmail.com",
    "password": "comum",
    "cpf": "17364509720",
}
```

Merchant user

```json
{
    "fullName": "Gabriel o Lojistta",
    "email": "gabrielojista@gmail.com",
    "password": "lojista",
    "cpf": "95018069791",
    "cnpj": "54483691000150"
}
```

### PUT /users/{id}

Update the information of a specific user based on the provided ID.

### DELETE /users/{id}

Remove a specific user based on the provided ID.

### POST /transaction

Perform a transaction between two users.

#### Payload:

```json
{
    "senderId": 15,
    "recipientId": 4,
    "amount": 15
}
```

## Technologies Used

### Node.js

### Express

### Nodemon

### Typescript

