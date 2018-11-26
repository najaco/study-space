# User
* Username: string
* Password: string
* Email: string
* image: string
* review: Review []

# Review
* rating: int
* header: string
* body: string
* timestamp: string
* Location: Location
* User

# Location
* Street Address:
    * Street: string
    * City: string
    * State: string
    * Zip: string
* Name: string
* Short-Name: string

# Methods
* get listOfLocations
* post reviewToLocation
* post newUser
* get user
* get validateUser
