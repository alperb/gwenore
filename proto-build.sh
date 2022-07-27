#!/bin/bash

yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=src/grpc/proto.output/ proto/*.proto
cp proto/*.proto src/grpc/