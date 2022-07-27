// Original file: proto/gwenore.proto

import type { QuestProgress as _GwenorePackage_QuestProgress, QuestProgress__Output as _GwenorePackage_QuestProgress__Output } from '../GwenorePackage/QuestProgress';

export interface GetProgressResponse {
  'status'?: (string);
  'error'?: (string);
  'progress'?: (_GwenorePackage_QuestProgress)[];
  '_error'?: "error";
}

export interface GetProgressResponse__Output {
  'status'?: (string);
  'error'?: (string);
  'progress'?: (_GwenorePackage_QuestProgress__Output)[];
}
