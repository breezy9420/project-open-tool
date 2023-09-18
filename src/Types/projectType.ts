export enum ProjectTypeEnum {
  vue = 'vue',
  react = 'react',
  dir = 'dir',
  javascript = "javascript",
  go = "go"
}

export interface ProjectType {
  name: string;
  zname?: string;
  path: string;
  type?: ProjectTypeEnum;
  version?: string;
}
