# build proto files
yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=src/grpc/proto.output/ proto/*.proto

# build ts
yarn build

# copy proto files to dist
cp proto/*.proto dist/grpc/