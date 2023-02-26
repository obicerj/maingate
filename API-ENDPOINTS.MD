# API Endpoints 

### Base URL
```
localhost:3000/api/v1
```

<br>

### AUTH

#### REGISTER
```
/register
```
```
{
    "fullName":"User Test",
    "email":"user@gmail.com",
    "password":"password"
}
```

#### LOGIN
```
/login
```
```
{
    "email":"user@gmail.com",
    "password":"password"
}
```

### LOGOUT
```
/logout
```

<br>

### USER

#### GET all user
```
/user
```
#### POST create user
```
/user
```

#### GET by ID
```
/user/id
```

#### PUT update by ID
```
/user/id
```

#### DELETE by ID
```
/user/id
```