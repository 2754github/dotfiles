init:
	go install golang.org/x/tools/cmd/godoc@latest
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/HEAD/install.sh | sh -s -- -b $$(go env GOPATH)/bin @@@linter

doc:
	open http://localhost:6060/pkg/github.com/@@@org/@@@repo/
	godoc

format:
	go mod tidy
	go fmt ./...
	$$(go env GOPATH)/bin/golangci-lint fmt

lint: format
	go run golang.org/x/tools/gopls/internal/analysis/modernize/cmd/modernize@latest -fix -test ./...
	go vet ./...
	$$(go env GOPATH)/bin/golangci-lint run

test: lint
	go clean -testcache
	go test -v ./...

.PHONY: init doc format lint test
