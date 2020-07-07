//引入node路径模块
const path = require('path');

//拼接路径
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
    //配置路径
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('src')) //src目录
			.set('assets', resolve('src/assets')) //src->assets目录
			.set('components', resolve('src/components')) //src->views目录
			.set('network', resolve('src/network')) //src->network目录
			.set('router', resolve('src/router')) //src->router目录
            .set('store', resolve('src/store')) //src->store目录
            .set('tools', resolve('src/tools')) //src->tools目录
            .set('views', resolve('src/views')) //src->views目录
	},
}