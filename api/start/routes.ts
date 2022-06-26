import Route from "@ioc:Adonis/Core/Route"
import got from "got"

Route.get("/", async () => {
  return { hello: "world" }
})

/* Jwt.io payload =>
*
* {
  "mercure": {
    "publish": [
      "*"
    ]
  }
}
* */

Route.get("/alert", () => {
  const data = { foo: "bar" }

  got.post("http://localhost:1405/.well-known/mercure", {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.obDjwCgqtPuIvwBlTxUEmibbBf0zypKCNzNKP7Op2UM'
    },
    form: [
      ["topic", "/alert"],
      ["data", JSON.stringify(data)]
    ]
  })
  return { status: "Ok" }
})
