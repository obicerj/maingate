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

#### GET ALL
```
/user
```

#### GET BY ID
```
/user/id
```

#### UPDATE BY ID
```
/user/id
```

#### DELETE BY ID
```
/user/id
```