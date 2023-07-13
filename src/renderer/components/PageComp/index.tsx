import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import DrawerComp from '../DrawerComp';
import styles from './style.module.less';

type Props = {
  children: any;
  title?: string;
};

const PageComp = (props: Props) => {
  const { children, title } = props;
  const navigate = useNavigate();

  const handleGoPath = (path: string) => {
    navigate(path);
  };
  return (
    <div className={styles.pageContent}>
      <DrawerComp>
        <Button
          type="primary"
          onClick={() => {
            handleGoPath('/');
          }}
        >
          首页
        </Button>
        <Button
          onClick={() => {
            handleGoPath('/project');
          }}
          type="primary"
        >
          项目管理
        </Button>
        <Button
          onClick={() => {
            handleGoPath('/WorkSpace');
          }}
          type="primary"
        >
          工作区管理
        </Button>
        {/* <Button
          onClick={() => {
            message.warning('待开发中');
          }}
          type="primary"
        >
          上网工具
        </Button> */}
      </DrawerComp>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default PageComp;
