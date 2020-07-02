const CracoLessPlugin = require('craco-less');
const path = require('path')

const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
    webpack: {
        alias: {
            '@@': pathResolve('.'),
            '@': pathResolve('src'),
            'assets': pathResolve('src/assets'),
            'containers': pathResolve('src/containers'),
            'components': pathResolve('src/components'),
            'services': pathResolve('src/services'),
            'interfaces': pathResolve('src/interfaces'),
            'store': pathResolve('src/store'),
            'utils': pathResolve('src/utils')
        }
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};