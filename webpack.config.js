var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPathAssetsFix = require('html-webpack-plugin-assets-fix');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');


const baseConfig = {
    entry: {
        elec: './elec/src/app.js',
        optical: './optical/src/app.js'
    },
    output: {
        publicPath: '',
        filename: '[name]/dist/[name].js'
    },
    module: {
    },
    plugins: [
        new HtmlWebpackPathAssetsFix(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            },
            sourceMap: false,
        }),

        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['//css/bootstrap.min.css', '//some.domain.com.js'],
            append: false
        })
    ]

}

const htmlArray = Object.keys(baseConfig.entry);
console.log(htmlArray);

htmlArray.forEach((element) => {
    const chunkArray = [element];
    const newHtmlPlugin = new HtmlWebpackPlugin({
        template: `${element}/src/index.ejs`,
        filename: `${element}/dist/index.html`,
        chunks: chunkArray,
        fixAssets: true
    });

    baseConfig.plugins.push(newHtmlPlugin);
});

module.exports = baseConfig;