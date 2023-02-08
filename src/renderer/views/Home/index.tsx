import { Button, message } from 'antd';
import { useNavigate, Route, MemoryRouter as Router } from 'react-router-dom';
import DrawerComp from 'renderer/components/DrawerComp';
import PageComp from 'renderer/components/PageComp';
import Project from '../Project';
import ProjectDetail from '../Project/ProjectDetail';
import WorkSpace from '../WorkSpace';

const Home = () => {
  const navigate = useNavigate();

  const handleGoPath = (path: string) => {
    navigate(path);
  };

  return <PageComp title="首页">
    <p>介绍：对于前端开发者而言，管理过多的工程会存在工程名称和工程git仓库名称混淆问题。从而导致想找到某个工程时，不是非常的快捷。此工具用于解决该类问题</p>
  </PageComp>;
};

export default Home;
