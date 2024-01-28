import PageComp from '@r/components/PageComp';
import { ProList } from '@ant-design/pro-components';
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  MenuProps,
  message,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
} from 'antd';
import MyTag from '@/renderer/components/MyTag';
import ProjectApi from '@/service/projectApi';
import { useEffect, useMemo, useState } from 'react';
import ProjectForm from './ProjectForm';
import { ProjectType } from '@/Types/projectType';
import styles from './style.module.less';
import workSpaceApi from '@/service/workSpaceApi';
import EditForm from './EditForm';

type OptionType = {
  label: string;
  value: string;
};

const Project = () => {
  const [visiable, setVisiable] = useState(false);
  const [editVisiable, setEditVisiable] = useState(false);
  const [dataSource, setDataSource] = useState<ProjectType[]>([]);
  const [workCachePath, setWorkCachePath] = useState('');
  const [options, setOptions] = useState<OptionType[]>([]);
  const [queryName, setQueryName] = useState('');
  const [editObj, setEditObj] = useState<ProjectType>();

  const queryWorkSpace = async () => {
    const { data = [] } = await workSpaceApi.getList();
    const arr = data.map((item) => ({
      label: item.name,
      value: item.workCachePath,
    }));
    setOptions(arr);
  };

  const queryList = async () => {
    try {
      if (workCachePath) {
        const { data } = await ProjectApi.getList(workCachePath);
        setDataSource(data);
      }
    } catch (error) {
      message.error(error + '');
    }
  };

  const delAll = async () => {
    try {
      await ProjectApi.clear(workCachePath);
      message.success('删除成功');
      queryList();
    } catch (error) {
      message.error(error + '');
    }
  };

  const handleAdd = () => {
    setVisiable(true);
  };

  const handleOpenDir = async (path: string) => {
    await ProjectApi.openDir(path);
  };

  const handleOpenVscode = async (path: string) => {
    try {
      await ProjectApi.openVscode(path);
    } catch (error) {
      message.error(error + '');
    }
  };

  const handleOpenWebStorm = async (path: string) => {
    try {
      await ProjectApi.openWebStorm(path);
    } catch (error) {
      message.error(error + '');
    }
  };

  const handleEdit = (item: ProjectType) => {
    setEditVisiable(true);
    setEditObj(item);
  };

  const items: MenuProps['items'] = [
    {
      label: 'vscode',
      key: 'code',
    },
    {
      label: 'webstorm64',
      key: 'webstorm64',
    },
    {
      label: 'pycharm64',
      key: 'pycharm64',
    },
    {
      label: 'goland64',
      key: 'goland64',
    },
    {
      label: 'IDEA64',
      key: 'idea64',
    },
  ];

  const open = async (e: any, path: string) => {
    const { key } = e;
    message.info(`${key}_${path}`);
    try {
      await ProjectApi.openSoft({
        type: key,
        path,
      });
    } catch (error) {
      message.error(error + '');
    }
  };

  const list = useMemo(() => {
    return dataSource
      .filter((item) => {
        if (
          item.name.includes(queryName) ||
          item.zname?.includes(queryName) ||
          item.type?.includes(queryName) ||
          queryName == ''
        )
          return item;
      })
      .map((item) => ({
        title: item?.zname,
        subTitle: <MyTag type={item?.type} />,
        actions: [
          <a
            key="delete"
            onClick={() => {
              handleOpenDir(item.path);
            }}
          >
            打开文件夹
          </a>,

          <a
            key="delete"
            onClick={() => {
              handleEdit(item);
            }}
          >
            编辑配置
          </a>,
          <Dropdown menu={{ items, onClick: (e) => open(e, item.path) }}>
            <a onClick={(e) => e.preventDefault()}>打开方式</a>
          </Dropdown>,
        ],
        content: (
          <Row gutter={[0, 6]}>
            <Col span={24}>
              <Tooltip title={item.name}>
                <div className={styles.text}>工程：{item.name}</div>
              </Tooltip>
            </Col>
            <Col span={24}>
              <Tooltip title={item.path}>
                <div className={styles.text}>路径：{item.path}</div>
              </Tooltip>
            </Col>
          </Row>
        ),
      }));
  }, [queryName, dataSource]);

  useEffect(() => {
    if (workCachePath) {
      queryList();
    }
  }, [workCachePath]);

  useEffect(() => {
    queryWorkSpace();
  }, []);

  return (
    <PageComp>
      <Space>
        <Select
          placeholder="查询工作区"
          options={options}
          onChange={(value) => {
            setWorkCachePath(value);
          }}
          allowClear
          style={{ width: 160 }}
        />
        <Input
          placeholder="输入中英文名称或类型"
          onChange={(e) => {
            setQueryName(e.target.value);
          }}
        />
      </Space>
      <ProList
        dataSource={list}
        showActions="hover"
        // rowSelection={{}}
        toolBarRender={() => [
          <Button key="refresh" type="primary" onClick={queryList}>
            查询
          </Button>,
          <Button key="delAll" type="primary" onClick={delAll}>
            全部删除
          </Button>,
          <Button key="create" type="primary" onClick={handleAdd}>
            读取工作区
          </Button>,
        ]}
        grid={{ gutter: 16, column: 3 }}
        metas={{
          title: {},
          subTitle: {},
          content: {},
          actions: {
            cardActionProps: 'actions',
          },
        }}
      ></ProList>

      {visiable && (
        <ProjectForm
          saveCallBack={() => {
            queryList();
            setVisiable(false);
            setEditVisiable(false);
          }}
          visiable={visiable}
          setVisiable={setVisiable}
        />
      )}

      {editVisiable && (
        <EditForm
          saveCallBack={() => {
            queryList();
            setVisiable(false);
            setEditVisiable(false);
          }}
          editObj={editObj}
          editVisiable={editVisiable}
          setEditVisiable={setEditVisiable}
          workCachePath={workCachePath}
        />
      )}
    </PageComp>
  );
};

export default Project;
