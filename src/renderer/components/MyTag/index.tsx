import { ProjectTypeEnum } from '@/Types/projectType';
import { Tag } from 'antd';
import { useMemo } from 'react';

type Props = {
  type?: ProjectTypeEnum;
};

const MyTag = (props: Props) => {
  const { type = ProjectTypeEnum.dir } = props;

  const color = useMemo(() => {
    switch (type) {
      case ProjectTypeEnum.python:
        return '#87d068';
      case ProjectTypeEnum.go:
      case ProjectTypeEnum.c:
        return '#2db7f5';
      case ProjectTypeEnum.dir:
      case ProjectTypeEnum.js:
        return 'orange';
      case ProjectTypeEnum.c:
        case ProjectTypeEnum.java:
        return 'red';
      default:
        return 'orange';
    }
  }, [type]);

  return <Tag color={color}>{type?.toUpperCase()}</Tag>;
};

export default MyTag;
