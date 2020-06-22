package main

import (
	"app/routers"
	"app/db"
)

func main() {
	db.Init()

	router  := routes.InitRouter()
	router.Run(":8080")

	defer db.CloseDb() // close mysql connection
}
