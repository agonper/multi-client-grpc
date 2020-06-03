protoc \
    --include_imports \
    --include_source_info \
    --proto_path=. \
    --descriptor_set_out=../gateway/api_descriptor.pb \
    --go_out=plugins=grpc:. \
    --js_out=import_style=commonjs:../clients/web/src/api-client/ \
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:../clients/web/src/api-client/ \
    ephemeral_notes.proto

cp ephemeral_notes.proto ../clients/android/app/src/main/proto/