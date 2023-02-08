import fs from 'fs';
import path from 'path';

import { app } from 'electron';
import { timeFormat } from '../util';
import { CacheType, CacheEnum } from '../../Types/cacheType';
import { ProjectType } from '@/Types/projectType';

const BASE_PATH = path.join(app.getPath('appData'), 'projectOpenTool');
// 缓存保存路径
const CACHE_PATH = path.join(BASE_PATH, 'cache.json');

// 创建 appData 文件夹
const createAppDir = async () => {
  if (checkCache(BASE_PATH)) return;
  await fs.promises.mkdir(BASE_PATH);
  if (checkCache(CACHE_PATH)) return;
  await writeCache();
};

// 缓存文件是否存在
const checkCache = (filePath: string) => {
  return fs.existsSync(filePath);
};

// 读取缓存
const readCache = async (e?: any, type?: CacheEnum) => {
  const cache: CacheType = JSON.parse(
    await fs.promises.readFile(CACHE_PATH, 'utf8')
  );
  if (type && cache[type]) {
    return cache[type];
  }
  return cache;
};
// 删除缓存
const removeCache = () => {};

// 写入缓存
const writeCache = async (writeData?: CacheType) => {
  const cache: CacheType = {
    workSpaceList: [],
    ...writeData,
    lastUpdateTime: timeFormat(),
  };
  await fs.promises.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2), {
    flag: 'w+',
    encoding: 'utf8',
  });
};

// 更新缓存
const updateCache = async (e: any, type: CacheEnum, values: any) => {
  const cache = (await readCache()) as CacheType;
  writeCache({
    ...cache,
    [type]: values,
  });
};

// 维护workSpaceCache
const workSpaceCache = async (e: any, args: any) => {
  const [workCachePath, projectList] = args;

  if (fs.existsSync(workCachePath) && projectList) {
    await fs.promises.writeFile(workCachePath, JSON.stringify(projectList), {
      encoding: 'utf8',
      flag: 'w+',
    });
  } else if (workCachePath && !projectList?.length) {
    return JSON.parse(
      await fs.promises.readFile(workCachePath, {
        encoding: 'utf8',
      })
    );
  }
};

export default {
  readCache,
  writeCache,
  removeCache,
  updateCache,
  createAppDir,
  workSpaceCache,
};
