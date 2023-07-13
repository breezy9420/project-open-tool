import { CacheEnum } from '../../Types/cacheType';
import { ProjectType, ProjectTypeEnum } from '../../Types/projectType';
import { shell, Notification } from 'electron';
import fs from 'fs';
import path from 'path';
import Cache from './cacheIpc';
import { exec } from 'child_process';
import { promisify } from 'util';

const getProjectList = async (e: any, workSpaceCache: string) => {
  return (await Cache.workSpaceCache(e, [workSpaceCache])) as ProjectType[];
};

const writeProjectList = async (
  e: any,
  workSpacePath: string,
  workCachePath: string
) => {
  const originList = await getProjectList(e, workCachePath);
  const dirs = await fs.promises.readdir(workSpacePath);
  const caches: ProjectType[] = [];
  for (const item of dirs) {
    const dirPath = path.join(workSpacePath, item);
    const state = await fs.promises.stat(dirPath);
    if (state.isDirectory()) {
      const dirContent = await fs.promises.readdir(dirPath);
      const cacheObj: ProjectType = {
        path: dirPath,
        name: item,
        zname: item,
      };
      try {
        if (dirContent.includes('package.json')) {
          // 工程文件夹
          const jsonPath = path.join(dirPath, 'package.json');
          const jsonFile = JSON.parse(
            await fs.promises.readFile(jsonPath, 'utf8')
          );
          // 判断是vue 还是 react项目
          if (jsonFile?.dependencies) {
            const dependencies = jsonFile.dependencies;
            if (dependencies.vue) {
              cacheObj.type = ProjectTypeEnum.vue;
              cacheObj.version = dependencies.vue;
            } else if (dependencies.react) {
              cacheObj.type = ProjectTypeEnum.react;
              cacheObj.version = dependencies.react;
            }
          } else {
            // 其他工程
            cacheObj.type = ProjectTypeEnum.dir;
            cacheObj.version = '^0.0.0';
          }
        } else {
          // 普通文件夹
          cacheObj.type = ProjectTypeEnum.dir;
          cacheObj.version = '^0.0.0';
        }
      } catch (error) {
        // 普通文件夹
        cacheObj.type = ProjectTypeEnum.dir;
        cacheObj.version = '^0.0.0';
      }
      originList?.forEach((item) => {
        if (item.path == cacheObj.path) {
          cacheObj.zname = item.zname;
          cacheObj.type = item.type;
        }
      });
      caches.push(cacheObj);
    }
  }
  await Cache.workSpaceCache(e, [workCachePath, caches]);
  return caches;
};

const clearProjectList = async (e: any, workCachePath: string) => {
  await Cache.workSpaceCache(e, [workCachePath, []]);
};

const openProjectDir = async (e: any, projectPath: string) => {
  await shell.openPath(projectPath);
};

const openProjectVscode = async (e: any, projectPath: string) => {
  const execUtil = promisify(exec);
  await execUtil(`code ${projectPath}`);
};

const openProjectWebStorm = async (e: any, projectPath: string) => {
  const execUtil = promisify(exec);
  await execUtil(`webstorm64 ${projectPath}`);
};

const saveProject = async (
  e: any,
  project: ProjectType,
  workCachePath: string
) => {
  const { path } = project;
  const list = (await Cache.workSpaceCache(e, [
    workCachePath,
  ])) as ProjectType[];
  const newList = list.map((item) => {
    if (item.path == path) {
      return {
        ...project,
        path,
      };
    }
    return item;
  });
  await Cache.workSpaceCache(e, [workCachePath, newList]);
};

export default {
  getProjectList,
  writeProjectList,
  clearProjectList,
  openProjectDir,
  openProjectVscode,
  saveProject,
  openProjectWebStorm,
};
