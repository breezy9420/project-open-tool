import { CacheEnum } from '../../Types/cacheType';
import { WorkSpace } from '../../Types/workSpaceType';
import { shell } from 'electron';
import fs from 'fs';
import path from 'path';

import { timeFormat } from '../util';
import Cache from './cacheIpc';

// 检测路径
const readInfo = async (
  e: Electron.IpcMainInvokeEvent,
  workSpacePath: string
) => {
  const workSpaceName = path.basename(workSpacePath);
  const state = await fs.promises.stat(workSpacePath);

  return {
    name: workSpaceName,
    lastUpdateTime: timeFormat(state.mtime),
  };
};

const getWorkSpaceList = async () => {
  return (await Cache.readCache(
    CacheEnum,
    CacheEnum.workSpaceList
  )) as WorkSpace[];
};

const saveWorkSpace = async (e: any, values: WorkSpace) => {
  const workSpaceList = await getWorkSpaceList();
  if (values.name) {
    workSpaceList.push(values);
  } else {
    const findIndex = workSpaceList.findIndex(
      (item) => (item.name = values.name)
    );
    if (~findIndex) {
      workSpaceList[findIndex] = values;
    }
  }
  if (!fs.existsSync(values.workCachePath)) {
    await fs.promises.writeFile(values.workCachePath, JSON.stringify([]), {
      encoding: 'utf8',
      flag: 'a+',
    });
  }
  await Cache.updateCache(e, CacheEnum.workSpaceList, workSpaceList);
};

const removeWorkSpace = async (e: any, name: string) => {
  const workSpaceList = await getWorkSpaceList();
  const newWorkSpaceList =
    workSpaceList.filter((item) => item.name != name) ?? [];
  await Cache.updateCache(e, CacheEnum.workSpaceList, newWorkSpaceList);
};

const openWorkSpace = async (e: any, workSpacePath: string) => {
  await shell.openPath(workSpacePath);
};

export default {
  getWorkSpaceList,
  saveWorkSpace,
  readInfo,
  removeWorkSpace,
  openWorkSpace,
};
