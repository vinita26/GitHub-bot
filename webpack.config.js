const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
 entry: './src/js/index.js',
 output: {
   path: __dirname + '/dist',
   filename: 'bundle.js'
 },
 module: {
   rules: [
     { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
     { test: /\.css$/, loader: ['style-loader','css-loader'], exclude: /node_modules/ }
   ]
 },
 plugins: [
   new HtmlWebpackPlugin({
     template: './index.html'
   })
 ],
 watch:true,
 mode: 'development'
};
