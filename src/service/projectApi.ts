import BaseApi from '@/service/model/BaseApi';
import { ProjectType } from '@/Types/projectType';

enum ProjectApiEnum {
  getProjectList = 'getProjectList',
  writeProjectList = 'writeProjectList',
  openProjectDir = 'openProjectDir',
  clearProjectList = 'clearProjectList',
  openProjectVscode = 'openProjectVscode',
  saveProject = 'saveProject',
  openProjectWebStorm = 'openProjectWebStorm',
  openProjectBySoft = 'openProjectBySoft'
}

class ProjectApi extends BaseApi {
  async getList(workSpaceCache: string) {
    const workSpaceList: ProjectType[] = await this.ipcRenderer.invoke(
      ProjectApiEnum.getProjectList,
      workSpaceCache
    );
    return {
      data: workSpaceList
    };
  }

  // 工作区读取
  async save(workSpacePath: string, workCachePath: string) {
    await this.ipcRenderer.invoke(
      ProjectApiEnum.writeProjectList,
      workSpacePath,
      workCachePath
    );
  }

  // 项目编辑baocun
  async saveProject(project: ProjectType, workCachePath: string) {
    await this.ipcRenderer.invoke(
      ProjectApiEnum.saveProject,
      project,
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

  async openWebStorm(path: string) {
    await this.ipcRenderer.invoke(ProjectApiEnum.openProjectWebStorm, path);
  }

  async openSoft(params: any) {
    await this.ipcRenderer.invoke(ProjectApiEnum.openProjectBySoft, params);
  }

  async openDir(path: string) {
    await this.ipcRenderer.invoke(ProjectApiEnum.openProjectDir, path);
  }
}

export default new ProjectApi();
