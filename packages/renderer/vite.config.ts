import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import resolve, { lib2esm } from 'vite-plugin-resolve';
import electron from 'vite-plugin-electron/renderer';
import pkg from '../../package.json';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import polyfillExports from 'vite-plugin-electron/polyfill-exports';

// https://vitejs.dev/config/
export default defineConfig({
	mode: process.env.NODE_ENV,
	root: __dirname,
	base: './',
	build: {
		outDir: '../../dist/renderer',
		emptyOutDir: true,
		sourcemap: true,
	},
	server: {
		host: pkg.env.VITE_DEV_SERVER_HOST,
		port: pkg.env.VITE_DEV_SERVER_PORT,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'~/': `${path.resolve(__dirname, 'src')}/`,
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "~/styles/element/index.scss" as *;`,
			},
		},
	},
	plugins: [
		vue(),
		electron(),
		resolve(
			/**
			 * Here you can specify other modules
			 * 🚧 You have to make sure that your module is in `dependencies` and not in the` devDependencies`,
			 *    which will ensure that the electron-builder can package it correctly
			 */
			{
				// If you use the following modules, the following configuration will work
				// What they have in common is that they will return - ESM format code snippets

				// ESM format string
				'electron-store': 'export default require("electron-store");',
				// Use lib2esm() to easy to convert ESM
				// Equivalent to
				/**
				 * sqlite3: () => `
				 * const _M_ = require('sqlite3');
				 * const _D_ = _M_.default || _M_;
				 * export { _D_ as default }
				 * `
				 */
				sqlite3: lib2esm('sqlite3', { format: 'cjs' }),
				serialport: lib2esm(
					// CJS lib name
					'serialport',
					// export memebers
					['SerialPort', 'SerialPortMock'],
					{ format: 'cjs' }
				),
				// extensions: ['.mjs', '.ts', '.vue'],
			}
		),
		AutoImport({
			// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
			imports: ['vue', 'vue-router', 'pinia'],
			// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
			resolvers: [
				ElementPlusResolver(),
				// 自动导入图标组件
				IconsResolver({
					prefix: 'Icon',
				}),
			],

			dts: path.resolve(__dirname, 'auto-imports.d.ts'),
		}),
		Components({
			resolvers: [
				// 自动注册图标组件
				// https://icones.js.org/  collection的名字
				IconsResolver({
					enabledCollections: ['ep', 'radix-icons', 'fe'],
				}),
				// 自动导入 Element Plus 组件
				ElementPlusResolver(),
			],

			dts: path.resolve(__dirname, 'components.d.ts'),
		}),
		Icons({
			autoInstall: true,
		}),
		polyfillExports(),
	],
});
