import BaseApi from '@/service/model/BaseApi';
import { ProjectType } from '@/Types/projectType';

enum ProjectApiEnum {
  getProjectList = 'getProjectList',
  writeProjectList = 'writeProjectList',
  openProjectDir = 'openProjectDir',
  clearProjectList = 'clearProjectList',
  openProjectVscode = 'openProjectVscode',
<<<<<<< HEAD
=======
  saveProject = 'saveProject',
  openProjectWebStorm = 'openProjectWebStorm',
>>>>>>> 9d1ba90... 添加webstorm64打开、编辑项目功能
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

<<<<<<< HEAD
=======
  // 工作区读取
>>>>>>> 9d1ba90... 添加webstorm64打开、编辑项目功能
  async save(workSpacePath: string, workCachePath: string) {
    await this.ipcRenderer.invoke(
      ProjectApiEnum.writeProjectList,
      workSpacePath,
      workCachePath
    );
  }

<<<<<<< HEAD
=======
  // 项目编辑baocun
  async saveProject(project: ProjectType, workCachePath: string) {
    await this.ipcRenderer.invoke(
      ProjectApiEnum.saveProject,
      project,
      workCachePath
    );
  }

>>>>>>> 9d1ba90... 添加webstorm64打开、编辑项目功能
  async clear(workCachePath: string) {
    await this.ipcRenderer.invoke(
      ProjectApiEnum.clearProjectList,
      workCachePath
    );
  }

  async openVscode(path: string) {
    await this.ipcRenderer.invoke(ProjectApiEnum.openProjectVscode, path);
  }

<<<<<<< HEAD
=======
  async openWebStorm(path: string) {
    await this.ipcRenderer.invoke(ProjectApiEnum.openProjectWebStorm, path);
  }

>>>>>>> 9d1ba90... 添加webstorm64打开、编辑项目功能
  async openDir(path: string) {
    await this.ipcRenderer.invoke(ProjectApiEnum.openProjectDir, path);
  }
}

export default new ProjectApi();
