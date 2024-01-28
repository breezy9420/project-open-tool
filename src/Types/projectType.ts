export enum ProjectTypeEnum {
  vue = 'vue',
  react = 'react',
  dir = 'dir',
  javascript = 'javascript',
  go = 'go',
  python = 'python',
  java = 'java',
  c = 'c',
}

export interface ProjectType {
  name: string;
  zname?: string;
  path: string;
  type?: ProjectTypeEnum;
  version?: string;
}
