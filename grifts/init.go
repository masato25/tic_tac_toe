package grifts

import (
	"github.com/gobuffalo/buffalo"
	"github.com/masato25/tic_tac_toe/actions"
)

func init() {
	buffalo.Grifts(actions.App())
}
