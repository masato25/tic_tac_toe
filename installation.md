require:
* golang v.1.9 above
* node & npm (yarn [optional])

# golang installation for mac
```
brew install go
export GOPATH="/path"
```

# install project dependency
```

go get -u github.com/golang/dep/cmd/dep
go get -u -v github.com/gobuffalo/buffalo/buffalo
go get github.com/masato25/tic_tac_toe
cd $GOPATH/src/github.com/masato25/tic_tac_toe
`yarn` or `npm install`
-- start with dev mode
$GOPATH/bin/bufflo dev

-- build binary, will pick all including css & html & js into one binary
$GOPATH/bin/bufflo dev
./bin/tic_tac_toe

```
