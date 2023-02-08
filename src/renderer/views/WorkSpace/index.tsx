import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import { useRef, useState } from 'react';
import PageComp from '@r/components/PageComp';
import { WorkSpace } from '@/Types/workSpaceType';
import WorkSpaceForm from './WorkSpaceForm';
import workSpaceApi from '@/service/workSpaceApi';

const WorkSpace = () => {
  const [visiable, setVisiable] = useState(false);
  const actionRef = useRef<ActionType>();
  const handleAdd = () => {
    setVisiable(true);
  };
  const handleRemove = async (name: string) => {
    try {
      await workSpaceApi.removeWorkSpace(name);
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败' + error);
    }
  };

  const handleOpen = async (path: string) => {
    try {
      await workSpaceApi.openWorkSpace(path);
    } catch (error) {
      message.error('打开失败' + error);
    }
  };
  const columns: ProColumns<WorkSpace>[] = [
    {
      dataIndex: 'name',
      title: '工作区名称',
    },
    {
      dataIndex: 'path',
      title: '工作区路径',
    },
    {
      dataIndex: 'workCachePath',
      title: '缓存文件路径',
    },
    {
      dataIndex: 'lastUpdateTime',
      title: '最后一次更新时间',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => {
        return (
          <Space>
            <a
              key="remove"
              onClick={() => {
                handleRemove(record.name);
              }}
            >
              删除
            </a>
            <a
              key="openDir"
              onClick={() => {
                handleOpen(record.path);
              }}
            >
              打开文件夹
            </a>
          </Space>
        );
      },
    },
  ];

  return (
    <PageComp title="工作区管理">
      <ProTable<WorkSpace>
        actionRef={actionRef}
        request={workSpaceApi.getList.bind(workSpaceApi)}
        columns={columns}
        rowKey={(item) => item.name}
        search={false}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={handleAdd}
          >
            新建
          </Button>,
        ]}
      />

      {visiable && (
        <WorkSpaceForm
          saveCallBack={() => {
            actionRef.current?.reload();
            setVisiable(false);
          }}
          visiable={visiable}
          setVisiable={setVisiable}
        />
      )}
    </PageComp>
  );
};

export default WorkSpace;
