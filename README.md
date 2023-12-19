## 概述

作用：当需要维护的工程过多时，时间一长就容易忘记这个工程跟什么项目关联。可以通过此工具设置工程的中文名称，方便打开。

## 安装
```
npm install
```

## 运行
```
npm run start
```

## 打包
```
npm run package
```

## 报错解决
```shell
⨯ Get "https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-resources-3.4.1/nsis-resources-3.4.1.7z": dial tcp 20.205.243.166:443: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.
github.com/develar/app-builder/pkg/download.(*Downloader).follow.func1
        /Volumes/data/Documents/app-builder/pkg/download/downloader.go:206
github.com/develar/app-builder/pkg/download.(*Downloader).follow
        /Volumes/data/Documents/app-builder/pkg/download/downloader.go:234
github.com/develar/app-builder/pkg/download.(*Downloader).DownloadNoRetry
        /Volumes/data/Documents/app-builder/pkg/download/downloader.go:128
github.com/develar/app-builder/pkg/download.(*Downloader).Download
        /Volumes/data/Documents/app-builder/pkg/download/downloader.go:112
github.com/develar/app-builder/pkg/download.DownloadArtifact
        /Volumes/data/Documents/app-builder/pkg/download/artifactDownloader.go:107
github.com/develar/app-builder/pkg/download.ConfigureArtifactCommand.func1
        /Volumes/data/Documents/app-builder/pkg/download/artifactDownloader.go:27
github.com/alecthomas/kingpin.(*actionMixin).applyActions
        /Volumes/data/go/pkg/mod/github.com/alecthomas/kingpin@v2.2.6+incompatible/actions.go:28
github.com/alecthomas/kingpin.(*Application).applyActions
```
解决办法：https://zhuanlan.zhihu.com/p/248742896
