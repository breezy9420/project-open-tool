import { Form, Input, message, Modal, Select } from 'antd';
import workSpaceApi from '@/service/workSpaceApi';
import ProjectApi from '@/service/projectApi';
import { WorkSpace } from '@/Types/workSpaceType';
import { useEffect, useState } from 'react';
import { ProjectType } from '@/Types/projectType';
const { Option } = Select;
type Props = {
  editVisiable: boolean;
  setEditVisiable: (visiable: boolean) => void;
  editObj?: ProjectType;
  saveCallBack: (path?: string) => void;
  workCachePath: string;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const options = [
  { label: 'go', value: 'go' },
  { label: 'js', value: 'js' },
  { label: 'c', value: 'C' },
  { label: 'python', value: 'python' },
  { label: 'java', value: 'java' },
  { label: 'dir', value: 'dir' },
];

const EditForm = (props: Props) => {
  const {
    editVisiable,
    setEditVisiable,
    editObj = {},
    saveCallBack,
    workCachePath,
  } = props;
  //   const [options, setOptions] = useState<optionType[]>([]);
  const [form] = Form.useForm<ProjectType>();

  const handleSave = async () => {
    const data = await form.validateFields();
    if (data?.path) {
      await ProjectApi.saveProject(data, workCachePath);
      saveCallBack();
      message.success('读取成功');
    }
  };

  useEffect(() => {
    form.setFieldsValue(editObj);
    return () => form.resetFields();
  }, [editObj]);

  return (
    <Modal
      open={editVisiable}
      title="编辑项目"
      onOk={handleSave}
      onCancel={() => {
        setEditVisiable(false);
      }}
      width={800}
    >
      <Form form={form} {...layout}>
        <Form.Item name="path" label="项目路径">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="name" label="英文名称">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="zname" label="中文名称">
          <Input />
        </Form.Item>

        <Form.Item name="version" label="版本号">
          <Input />
        </Form.Item>
        <Form.Item name="type" label="类型">
          <Select
            options={options}
            onChange={(val) => {
              form.setFieldValue('type', val);
            }}
          ></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditForm;
