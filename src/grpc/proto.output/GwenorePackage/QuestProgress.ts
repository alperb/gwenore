// Original file: proto/gwenore.proto

import type { Long } from '@grpc/proto-loader';

export interface QuestProgress {
  'id'?: (string);
  'name'?: (string);
  'current'?: (number | string | Long);
}

export interface QuestProgress__Output {
  'id'?: (string);
  'name'?: (string);
  'current'?: (Long);
}
