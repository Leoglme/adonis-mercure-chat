import Route from "@ioc:Adonis/Core/Route"
import got from "got"
import jws from "jws"

Route.get("/", async () => {
  return { hello: "world" }
})

Route.get("/auth/:id", async () => {
  return await computedToken({
    mercure: { subscribe: [`/alert`] }
  })
})

Route.get("/public", () => {
  const data = { foo: "bar" }

  new Update(["/alert"], data).send()

  return { status: "Ok" }
})

Route.get("/private", () => {
  const data = { foo: "bar" }

  new Update(["/alert"], data, true).send()

  return { status: "Ok" }
})


class Update {
  constructor(
    private topics: string[],
    private data: Record<string, string> = {},
    private isPrivate: boolean = false
  ) {
  }

  send() {
    return got.post("http://localhost:1405/.well-known/mercure", {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.obDjwCgqtPuIvwBlTxUEmibbBf0zypKCNzNKP7Op2UM"
      },
      form: [
        ...this.topics.map((topic) => ["topic", topic]),
        ["data", JSON.stringify(this.data)]
      ].concat(this.isPrivate ? ["private", "on"] : [])
    })
  }
}


function computedToken(payload) {
  return new Promise((resolve, reject) => {
    jws.createSign({
      payload,
      secret: "!ChangeMe!",
      header: { alg: "HS256" }
    })
      .on("error", reject)
      .on("done", resolve)
  })
}
