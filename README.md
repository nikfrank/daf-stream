# daf streamer

bootstrapped with npm/express-generator

## daf model

- id
- raw_text
- plain_text
- html
- md
- tractate, book, chapter, section, page
- url

## routes

POST /daf

send

```
{
  payload: {...daf},
}
```

GET /daf/:id

GET /daf/:id/html

GET /daf/:id/md

GET /daf/:id/raw

GET /daf/:id/plain


## env vars

expects process.env.POSTGRES_...