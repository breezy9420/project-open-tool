import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import PageComp from '@r/components/PageComp';

const Home = () => {
  return (
    <PageComp>
      <h5>
        介绍：对于开发者而言，管理过多的工程会存在工程名称和工程git仓库名称混淆问题。从而导致想找到某个工程时，不是非常的快捷。此工具用于解决该类问题
      </h5>
      <h5>作者：Breezy</h5>
      <h5>邮箱：manbreezy1937@gmail.com</h5>
    </PageComp>
  );
};

export default Home;
