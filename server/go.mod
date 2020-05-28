module github.com/agonper/multi-client-grpc/server

go 1.14

replace github.com/agonper/multi-client-grpc/api => ../api

require (
	github.com/agonper/multi-client-grpc/api v0.0.0-00010101000000-000000000000
	github.com/golang/protobuf v1.4.2
	google.golang.org/grpc v1.29.1
	google.golang.org/protobuf v1.24.0 // indirect
)
