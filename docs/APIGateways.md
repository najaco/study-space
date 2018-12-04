# API Methods
### Link:
https://2vdx6dl0a1.execute-api.us-east-1.amazonaws.com/prod

### /locations
#### Get Information By Short Name
```
"command": "get"
"shortName": "WALC"
```

#### Add Location
```
"command": "add"
"street": "1090 3rd Street"
"city": West Lafayette"
"state": "IN"
"zipcode": "47906"
"name": "Bechtel Innovation Design Center"
"shortname": "BIDC"
```

#### List Locations
```
"command": "list"
```

### /users

#### Get User
```
"command": "get"
"username": "john.doe"
```

#### Add User
```
"command": "add"
"username": "john.doe"
"password": "p@ssword"
"email": "john.doe@email.com"
"picpath": "path/a.png"
```


### /reviews

#### Get Review
```
"command": "get"
"shortLocation": "BIDC"
```

#### Submit Review
```
"command": "add"
"loc": "BIDC"
"username": "john.doe"
"header": "I love it"
"body": "This place is awesome! There is so much room!"
"timestamp": "18-3-12"
"rating": "9"
```
