import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { GwenoreClient as _GwenorePackage_GwenoreClient, GwenoreDefinition as _GwenorePackage_GwenoreDefinition } from './GwenorePackage/Gwenore';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  GwenorePackage: {
    GetProgressRequest: MessageTypeDefinition
    GetProgressResponse: MessageTypeDefinition
    Gwenore: SubtypeConstructor<typeof grpc.Client, _GwenorePackage_GwenoreClient> & { service: _GwenorePackage_GwenoreDefinition }
    QuestProgress: MessageTypeDefinition
  }
}

