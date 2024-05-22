## 1.1 usersByFirstName and variable

```bash
query ($namePart: String!) {
  usersByFirstName(namePart: $namePart) {
    firstname
    email
  }
}
```
Query Variables:
```json
{
  "namePart": "a"
}
```

## 1.2 blogsByFilter and variable

```bash
query ($input: BlogsFilterInput!) {
  blogsByFilter(input: $input) {
    title
    content
    published
  }
}
```
Query Variables:
```json
{
  "input": {
    "content": "Blog",
    "published": true
  }
}
```

## 2.9 createUser and variable

```bash
mutation ($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    firstname
    email
    yearOfBirth
    blogs {
      title
    }
  }
}
```
Query Variables:
```json
{
  "input": {
    "firstname": "Francis",
    "email": "francis@live.com",
    "yearOfBirth": 1992
  }
}
```
