# Awesome List v2
Awesome List v2 is here everyone!<br/>
Code refactored with the help of great odeskconf community.<br/>
PM me if you want your name here.<br/>

### Checkout Instructions
In order to start the App on your local machine, please consider creating the `db.json` file in the App's root folder.<br/>
Its contents should look like this:
```
{
  "todos": [
    {
      "id": "0",
      "label": "Visit Awesome List main page",
      "checked": true
    },
    {
      "id": "1",
      "label": "Add my own item which will not be saved anywhere",
      "checked": false
    }
  ]
}
```
The `"todos"` array can be empty, but it must be present.


### Starting-up Instructions
1. Run `json-server -p 8080 -w db.json` in order to start json-server on port 8080 and make it watch the changes to the db.json file.
2. Run `npm start` in order to serve React files.