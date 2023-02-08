import WorkSpaceIpc from './workSpaceIpc';
import CacheIpc from './cacheIpc';
import ProjectIpc from './projectIpc';
import { ipcMain } from 'electron';

export const register = () => {
  const ipcObj: any = [WorkSpaceIpc, CacheIpc,ProjectIpc];

  for (const item of ipcObj) {
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const element = item[key];
        ipcMain.handle(key, element);
      }
    }
  }
};
