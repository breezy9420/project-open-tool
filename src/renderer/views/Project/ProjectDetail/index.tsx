import { useLocation, useNavigate } from 'react-router-dom';

const ProjectDetail = () => {
  const location = useLocation();
  console.log(location.state);

  return <>ProjectDetail</>;
};

export default ProjectDetail;
