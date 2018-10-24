首先，cnpm install

然后 找到node_modeules下面的react-script/config/...dev这个配置文件
然后 在css的部分复制如下
{
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
},

然后yarn start就可以了
