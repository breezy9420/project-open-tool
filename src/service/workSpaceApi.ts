import BaseApi from '@/service/model/BaseApi';
import { WorkSpace } from '@/Types/workSpaceType';

enum WorkSpaceEnum {
  getList = 'getWorkSpaceList',
  getInfoByPath = 'readInfo',
  saveWorkSpace = 'saveWorkSpace',
  removeWorkSpace = 'removeWorkSpace',
  openWorkSpace = 'openWorkSpace',
}

class WorkSpaceApi extends BaseApi {
  async getList() {
    const workSpaceList: WorkSpace[] = await this.ipcRenderer.invoke(
      WorkSpaceEnum.getList
    );
    return {
      data: workSpaceList,
    };
  }

  async getInfoByPath(workSpacePath: string) {
    return await this.ipcRenderer.invoke(
      WorkSpaceEnum.getInfoByPath,
      workSpacePath
    );
  }

  async save(values: WorkSpace) {
    await this.ipcRenderer.invoke(WorkSpaceEnum.saveWorkSpace, values);
  }

  async removeWorkSpace(name: string) {
    await this.ipcRenderer.invoke(WorkSpaceEnum.removeWorkSpace, name);
  }

  async openWorkSpace(path: string) {
    await this.ipcRenderer.invoke(WorkSpaceEnum.openWorkSpace, path);
  }
}

export default new WorkSpaceApi();
