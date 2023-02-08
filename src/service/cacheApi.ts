import BaseApi from '@/service/model/BaseApi';
import { CacheType } from '@/Types/cacheType';

enum CacheApiEnum {
  readCache = 'readCache',
  writeCache = 'writeCache',
  saveCache = 'updateCache',
}

class CacheApi extends BaseApi {
  async readCache(type?: string) {
    return await this.ipcRenderer.invoke(CacheApiEnum.readCache, type);
  }

  async writeCache() {
    return await this.ipcRenderer.invoke(CacheApiEnum.writeCache);
  }

  async saveCache() {}
}

export default new CacheApi();
