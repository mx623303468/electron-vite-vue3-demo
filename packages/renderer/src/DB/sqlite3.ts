// const sqlite3 = require('sqlite3').verbose();
// const path = require('path')

// const dbPath = 'base.db'

// let db: { open: any; prepare: any; serialize: Function; run: Function; all: Function } | null = null;

// console.log(dbPath);


// // 连接数据库
// function conn() {
// 	if (!db || !db.open) {
// 		db = new sqlite3.Database(dbPath, function (err: any) {
// 			if (!err) {
// 				console.log('create success');
// 			} else {
// 				console.log(err);
// 			}
// 		});
// 	}
// 	return db;
// }

// // 初始化数据表
// export const initTable = () => {
// 	return new Promise<void>((resolve, reject) => {
// 		let db = conn();
// 		db.serialize(() => {
// 			db.run(
// 				'CREATE TABLE if not exists TreeTable (id int primary key, name varchar(64), fatherId int)'
// 			);
// 			db.run('CREATE TABLE IF NOT EXISTS ProductTable (id int primary key, name varchar(64))');
// 			resolve();
// 		});
// 	});
// };

// export const queryAllTree = () => {
// 	return new Promise((resolve, reject) => {
// 		let db = conn();
// 		db.all('select id, name, fatherId from TreeTable order by fatherId', (err: any, rows: any) => {
// 			if (err) reject(err);
// 			resolve(rows || []);
// 		});
// 	});
// };

// export const queryAllProduct = () => {
// 	return new Promise((resolve, reject) => {
// 		let db = conn();
// 		db.all('select id, name from ProductTable', (err: any, rows: any) => {
// 			if (err) reject(err);
// 			resolve(rows || []);
// 		});
// 	});
// };

// export const insertProduct = (product: { id: any; name: any; }) => {
// 	return new Promise<void>((resolve, reject) => {
// 		let db = conn();
// 		let prepare = db.prepare('replace into ProductTable (id, name) values (?, ?)');
// 		prepare.run(product.id, product.name);
// 		prepare.finalize((err: any) => {
// 			if (!err) resolve();
// 		});
// 	});
// };
