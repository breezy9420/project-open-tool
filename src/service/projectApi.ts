import BaseApi from '@/service/model/BaseApi';
import { ProjectType } from '@/Types/projectType';

enum ProjectApiEnum {
  getProjectList = 'getProjectList',
  writeProjectList = 'writeProjectList',
  openProjectDir = 'openProjectDir',
  clearProjectList = 'clearProjectList',
  openProjectVscode = 'openProjectVscode',
}

class ProjectApi extends BaseApi {
  async getList(workSpaceCache: string) {
    const workSpaceList: ProjectType[] = await this.ipcRenderer.invoke(
      ProjectApiEnum.getProjectList,
      workSpaceCache
    );
    return {
      data: workSpaceList,
    };
  }

  async save(workSpacePath: string, workCachePath: string) {
    await this.ipcRenderer.invoke(
      ProjectApiEnum.writeProjectList,
      workSpacePath,
      workCachePath
    );
  }

  async clear(workCachePath: string) {
    await this.ipcRenderer.invoke(
      ProjectApiEnum.clearProjectList,
      workCachePath
    );
  }

  async openVscode(path: string) {
    await this.ipcRenderer.invoke(ProjectApiEnum.openProjectVscode, path);
  }

  async openDir(path: string) {
    await this.ipcRenderer.invoke(ProjectApiEnum.openProjectDir, path);
  }
}

export default new ProjectApi();
