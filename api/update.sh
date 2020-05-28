protoc \
    --include_imports \
    --include_source_info \
    --proto_path=. \
    --descriptor_set_out=../gateway/api_descriptor.pb \
    --go_out=plugins=grpc:. \
    ephemeral_notes.proto