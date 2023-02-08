import { Form, Input, message, Modal, Select } from 'antd';
import workSpaceApi from '@/service/workSpaceApi';
import ProjectApi from '@/service/projectApi';
import { WorkSpace } from '@/Types/workSpaceType';
import { useEffect, useState } from 'react';
const { Option } = Select;
type Props = {
  visiable: boolean;
  setVisiable: (visiable: boolean) => void;
  initVal?: WorkSpace;
  saveCallBack: (path: string) => void;
};

type optionType = { label: string; value: string };

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const ProjectForm = (props: Props) => {
  const { visiable, setVisiable, initVal, saveCallBack } = props;
  const [options, setOptions] = useState<optionType[]>([]);
  const [form] = Form.useForm<WorkSpace>();

  const queryOptions = async () => {
    const { data } = await workSpaceApi.getList();
    const newOptions = data.map((item) => ({
      label: item.path,
      value: item.path,
      ...item,
    }));
    setOptions(newOptions);
  };

  const handleSave = async () => {
    const data = await form.validateFields();
    if (data?.path) {
      await ProjectApi.save(data.path, data.workCachePath);
      saveCallBack(data.workCachePath);
      message.success('读取成功');
    }
  };

  useEffect(() => {
    queryOptions();
  }, []);

  return (
    <Modal
      open={visiable}
      title="读取工作区"
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
          <Select
            options={options}
            onChange={(val, exrt: any) => {
              form.setFieldValue('workCachePath', exrt?.workCachePath);
            }}
          ></Select>
        </Form.Item>
        <Form.Item name="workCachePath" label="工作区缓存路径">
          <Input readOnly />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectForm;
