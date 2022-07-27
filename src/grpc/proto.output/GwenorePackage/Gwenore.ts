// Original file: proto/gwenore.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetProgressRequest as _GwenorePackage_GetProgressRequest, GetProgressRequest__Output as _GwenorePackage_GetProgressRequest__Output } from '../GwenorePackage/GetProgressRequest';
import type { GetProgressResponse as _GwenorePackage_GetProgressResponse, GetProgressResponse__Output as _GwenorePackage_GetProgressResponse__Output } from '../GwenorePackage/GetProgressResponse';

export interface GwenoreClient extends grpc.Client {
  getProgress(argument: _GwenorePackage_GetProgressRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GwenorePackage_GetProgressResponse__Output>): grpc.ClientUnaryCall;
  getProgress(argument: _GwenorePackage_GetProgressRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GwenorePackage_GetProgressResponse__Output>): grpc.ClientUnaryCall;
  getProgress(argument: _GwenorePackage_GetProgressRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GwenorePackage_GetProgressResponse__Output>): grpc.ClientUnaryCall;
  getProgress(argument: _GwenorePackage_GetProgressRequest, callback: grpc.requestCallback<_GwenorePackage_GetProgressResponse__Output>): grpc.ClientUnaryCall;
  getProgress(argument: _GwenorePackage_GetProgressRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GwenorePackage_GetProgressResponse__Output>): grpc.ClientUnaryCall;
  getProgress(argument: _GwenorePackage_GetProgressRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GwenorePackage_GetProgressResponse__Output>): grpc.ClientUnaryCall;
  getProgress(argument: _GwenorePackage_GetProgressRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GwenorePackage_GetProgressResponse__Output>): grpc.ClientUnaryCall;
  getProgress(argument: _GwenorePackage_GetProgressRequest, callback: grpc.requestCallback<_GwenorePackage_GetProgressResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface GwenoreHandlers extends grpc.UntypedServiceImplementation {
  getProgress: grpc.handleUnaryCall<_GwenorePackage_GetProgressRequest__Output, _GwenorePackage_GetProgressResponse>;
  
}

export interface GwenoreDefinition extends grpc.ServiceDefinition {
  getProgress: MethodDefinition<_GwenorePackage_GetProgressRequest, _GwenorePackage_GetProgressResponse, _GwenorePackage_GetProgressRequest__Output, _GwenorePackage_GetProgressResponse__Output>
}
