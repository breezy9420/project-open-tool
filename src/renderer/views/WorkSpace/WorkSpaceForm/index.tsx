import { Button, Col, Form, Input, message, Modal, Row, Space } from 'antd';
import workSpaceApi from '@/service/workSpaceApi';
import { WorkSpace } from '@/Types/workSpaceType';
type Props = {
  visiable: boolean;
  setVisiable: (visiable: boolean) => void;
  initVal?: WorkSpace;
  saveCallBack: () => void;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const WorkSpaceForm = (props: Props) => {
  const { visiable, setVisiable, initVal, saveCallBack } = props;
  const [form] = Form.useForm<WorkSpace>();

  const handleSave = async () => {
    const values = await form.validateFields();
    try {
      await workSpaceApi.save(values);
      saveCallBack();
    } catch (error) {
      message.error('保存失败' + error);
    }
  };

  const readPath = async () => {
    const path = form.getFieldValue('path');
    if (path) {
      // WorkSpaceApi.getList(path);
      try {
        const values = await workSpaceApi.getInfoByPath(path);
        form.setFieldsValue({
          ...values,
          workCachePath: `${path}\\workspace_cache.json`,
        });
      } catch (error) {
        message.error('路径读取错误:' + error);
      }
    }
  };

  return (
    <Modal
      open={visiable}
      title={initVal?.name ? '编辑工作区' : '新建工作区'}
      onOk={handleSave}
      onCancel={() => {
        setVisiable(false);
      }}
      width={800}
    >
      <Form form={form} {...layout}>
        <Form.Item
          name="path"
          label="工作区路径"
          rules={[{ required: true, message: '请输入路径' }]}
        >
          <Row gutter={12}>
            <Col span={16}>
              <Input />
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={readPath}>
                读取路径
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item name="name" label="工作区名称">
          <Input disabled />
        </Form.Item>
        <Form.Item name="lastUpdateTime" label="最后一次更新时间">
          <Input disabled />
        </Form.Item>
        <Form.Item name="workCachePath" label="设置工作区文件存储路径">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WorkSpaceForm;
