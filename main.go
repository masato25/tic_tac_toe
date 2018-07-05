package main

import (
	"log"

	"github.com/masato25/tic_tac_toe/actions"
)

func main() {
	app := actions.App()
	if err := app.Serve(); err != nil {
		log.Fatal(err)
	}
}
