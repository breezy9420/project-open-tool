export enum ProjectTypeEnum {
  vue = 'vue',
  react = 'react',
  dir = 'dir',
  js = 'js',
  go = 'go',
  python = 'python',
  java = 'java',
  c = 'C',
}

export interface ProjectType {
  name: string;
  zname?: string;
  path: string;
  type?: ProjectTypeEnum;
  version?: string;
}
