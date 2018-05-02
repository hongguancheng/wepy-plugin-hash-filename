# wepy 用哈希重命名文件


## 安装

```
npm install wepy-plugin-hash-filename --save-dev
```

## 配置`wepy.config.js`

```
module.exports.plugins = {
    'hash-filename': {
        replaceFilter: /\.(js|wxss|wxml)$/,
        fileFolder: 'web-files'
    },
};
```

## 文件引用

在 js|wxss|wxml 内应用文件时是未重命名的文件名，比如

```
<image src="web-files/image.png"/>
```

代码中的 web-files 是 配置中的 fileFolder，这样引用后 wepy-plugin-hash-filename 会把文件名替换成用哈希重命名后的文件名，配置中的 fileFolder 不会生成到 dist 文件夹中，因为一般 fileFolder 里面的文件是要上次 cdn 的。

## 结合 replace 插件使用

```
module.exports.plugins = {
    'hash-filename': {
        replaceFilter: /\.(js|wxss|wxml)$/,
        fileFolder: 'web-files',
    },
    'replace': [{
        filter: /\.(js|wxss|wxml)$/,
        config: {
            find: /web-files/g,
            replace: 'https://cdn.xxxxxxx' // cdn 地址
    }]
};
```

替换完哈希文件名后，把目录替换成 cdn 地址