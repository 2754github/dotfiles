init:
	go install golang.org/x/tools/cmd/goimports@latest
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.57.2
	go install golang.org/x/pkgsite/cmd/pkgsite@latest

tidy:
	go mod tidy

format: tidy
	goimports -local github.com/@@@org/@@@repo -w .

lint: format
	go vet ./...
	golangci-lint run --disable-all -E megacheck

test: lint
	go clean -testcache
	go test -v ./...

doc:
	open http://localhost:8080/github.com/@@@org/@@@repo
	pkgsite

.PHONY: init tidy format lint test doc
