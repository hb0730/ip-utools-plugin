import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import nodePolyfills from 'rollup-plugin-polyfill-node';
import utools from 'vite-plugin-utools';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),utools({
    external: 'uTools',
    preload: {
      path: './src/preload.ts',
      watch: true,
      name: 'window.preload',
    },
    buildUpx: {
      pluginPath: './plugin.json',
      outDir: 'upx',
      outName: 'ip-utools-plugin_1.0.0-beta.upx',
    },
  })
],
  resolve:{
    alias:{
    },
  },  
  optimizeDeps:{
  },
  build:{
    rollupOptions:{
      plugins:[
        nodePolyfills()
      ]
    }
  }
})
