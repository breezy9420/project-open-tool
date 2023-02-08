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
      case ProjectTypeEnum.vue:
        return '#87d068';
      case ProjectTypeEnum.react:
        return '#2db7f5';
      case ProjectTypeEnum.dir:
        return 'orange';
      default:
        return 'orange';
    }
  }, [type]);

  return <Tag color={color}>{type?.toUpperCase()}</Tag>;
};

export default MyTag;
