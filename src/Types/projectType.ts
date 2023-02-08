export enum ProjectTypeEnum {
  vue = 'vue',
  react = 'react',
  dir = 'dir',
}

export interface ProjectType {
  name: string;
  zname?: string;
  path: string;
  type?: ProjectTypeEnum;
  version?: string;
}
