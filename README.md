# ip-utools-plugin

Get the utools plug-in of Intranet IP and public IP

# Steps

1. `pnpm install`

2. `pnpm build`

3. 使用`utools开发者工具` 并将 `plugin.json`相关信息进行替换即可

# Demo

![https://raw.githubusercontent.com/hb0730/ip-utools-plugin/main/docs/uTools_1650782429263.png](https://raw.githubusercontent.com/hb0730/ip-utools-plugin/main/docs/uTools_1650782429263.png)

![https://raw.githubusercontent.com/hb0730/ip-utools-plugin/main/docs/uTools_1650782479900.png](https://raw.githubusercontent.com/hb0730/ip-utools-plugin/main/docs/uTools_1650782479900.png)

# 关于preload.js

项目采用[vite-plugin-utools](https://github.com/13enBi/vite-plugin-utools)可以自动生成`preload.js`，并填充相关`plugin.json`,与普通的`vite vue3 ts`没有什么不同,要使用`utools API`可以直接使用

```typeScript
utools.copyText(data.address);
utools.showNotification("复制成功");
```

要是用`preload.js`函数

```typeScript
 window.preload.networkInterfaces();
```

`preload`可替换成挂载到Window的前缀

```json
   preload: {
      path: './src/preload.ts',
      watch: true,
      name: 'window.preload',
    },
````
