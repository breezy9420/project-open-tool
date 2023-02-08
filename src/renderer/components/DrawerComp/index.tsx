import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.less';
const DrawerComp = (props: any) => {
  const { children } = props;
  const [visiable, setVisiable] = useState(true);

  const toogleModa = () => {
    setVisiable(!visiable);
  };

  return (
    <div>
      <div
        className={styles.modal}
        style={visiable ? { padding: 20 } : { height: 0 }}
      >
        <Space>{children}</Space>
      </div>
      <div className={styles.step} onClick={toogleModa}>
        <Button type="primary">
          {visiable ? '折叠功能面板' : '展开功能面板'}
        </Button>
      </div>
    </div>
  );
};

export default DrawerComp;
