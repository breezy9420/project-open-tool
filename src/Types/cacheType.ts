import WorkSpace from '@/renderer/views/WorkSpace';
import { ProjectType } from './projectType';

export enum CacheEnum {
  workSpaceList = 'workSpaceList',
}

export interface CacheType {
  [CacheEnum.workSpaceList]: WorkSpace[];
  lastUpdateTime: string;
}
