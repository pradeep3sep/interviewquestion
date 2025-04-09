// To install the webpack in simple html and js file folder
// npm init -y
// npm i webpack webpack-cli --save-dev
// npm run webpack    this is to make the build through webpack


// Types of Asset Module : This help in exporting the file other than js
// 1. asset/resource
        // In this, the assests created seperately like new image file in build folder
// 2. asset/inline
        // It inlines a file into the bundle as data URI of base 64 string, basically it convert the image into the code file it makes bundle JS file size bigger. This type of module doesn't generate a new file in the output directory
        // advantage of inline over resource is that let suppose we have 10 big image file, then it is better to use the resouce because if we mad that code as URI in js file. The bunle become much heavier, better to call 10 new http request to server to get the image
        // if we have 10 image of smaller size let say svg, then it is better to use the inline because if we make 10 separate http request to get that file it would become more expensive
        // so then better to use inline, it make bundle little bit heaviour but its ok or good than calling 10 http request to get image  
// 3. asset
        // It is combination of above, if we use it, then webpack will decide which to use either resource or inline. if file size is less than 8kb then it will use the inline otherwise resource
        // If we provide the dataUrlCondition of parser, then we can update the threshold of 8kb to any value
// 4. asset/source
        // help to get the source code of the asset,This is to import or read the text file


// Loaders 
    // The loaders allow you to import all other kinds of files that you can't handle using asset modules like css, sass, less, handlebars, xml etc
    // We have used the style loader and css loader in below example of case of css
    // While using the 'asset' we dont need to install any additional package but we need the to install package while using the loaders
    // npm install css-loader style-loader --save-dev
    // we can use loaders for any preprocessors like scss or less, we have the example below
    // npm install sass-loader sass --save-dev
    // To install the babel in webpack
        // npm i @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties --save-dev

// Plugins 
    // The plugins are additional JS libraries that do everything that loaders can not do
    // We use the TERSER plugin to further reduce the bundle size
    // Webpack plugin usually provided as NPM packages that you can install from your terminal
    // Tercer plugin is already installed together with webpack, starting from webpack version 5. It reduces the bundle size at very much extent

    // If we combine css and JS togther to form a single file name bundle js. As code grows the size of this bundle js grows then it become problamatic
    // So we make different bundle for different format means 1 bundle for all js and 1 bundle for all css. The advantage of doing this is that faster to download
    // Key to note that in this exercise we have imported the css into the js file.
    // So we use the mini css extract plugin.
    // npm i mini-css-extract-plugin --save-dev

// Caching
    // Every time we make the build, if building starts from 0 then it takes time. If we go with caching ie if anything changes in particular section we will make build of that part and for rest we use the cache of the previous build
    // for this we update the filename with 'contenthash' in output for the js and minicss also
    // The problem comes when we make build when any changes happen then a new build file added up in the folder. Now we have to two build file, the old one and new one
    // So to remove the old or redudant build, we will use the clean-webpack plugin
        // npm i clean-webpack-plugin --save-dev

// Generating the HTML file automatically after build command
    // we will use the HtmlWebpackPlugin,
    // npm i html-webpack-plugin --save-dev

const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js', // This will be file name which will be read as entry or start file.
    output: {
        filename : 'bundle.[contenthash].js',  // This will be bundle file name or build name
        path: path.resolve(__dirname, './dist'),  // Here we provide the relative path where bundle need to be formed
        publicPath: ''  // It is the path from where it takes the assets or resource like images and fonts file, here we can also use the URL path also.
    },
    mode: 'none',
    module: {            // By default webpack use only JS file and don't use the resource like image and other thing. Module are used for the various type of assests eg image
        rules: [        // The rules is the array because we provide various condition in it
            
            // Assests
            {
                test: /\.(png|jpg)$/,    // Here we added the regex that any file that end with png or jpg
                type: 'asset/resource'   // It is the type of assets, The types of asset modules have mentioned above.
            },
            {
                test: /\.(svg)$/,    // Here we added the regex that any file that end with svg
                type: 'asset/inline'   // It is the type of assets, The types of asset modules have mentioned above.
            },
            {
                test: /\.(ttf)$/,    // Here we added the regex that any file that end with ttf
                type: 'asset'   // It is the type of assets, The types of asset modules have mentioned above.
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024  // ie 3kb
                    }
                }
            },
            {
                test: /\.txt$/,    // Here we added the regex that any file that end with txt
                type: 'asset/source'   // It is the type of assets, The types of asset modules have mentioned above.
            },

            // Loaders
            // Key note is that webpack reads from right to left or end to first in an array
            {
                test: /\.css$/,    // Here we added the regex that any file that end with css 
                use: [              // Reading/invoking start from the css-loader and end with style-loader
                    //'style-loader', // It takes the css and injects it into the page using the style tags 
                    MiniCssExtractPlugin.loader, // we have commneted the style-loader because we are extracing the css in separate bundle. Style-loader will combine the css in single js bundle file 
                    'css-loader',   // It reads the content of css file and returns the content
                ]
            },
            {
                test: /\.scss$/,
                use: [              // Reading/invoking start from the scss-loader and end with style-loader
                    'style-loader',
                    'css-loader',
                    'sass-loader'   
                ]
            },

            // Babel loader
            {
                test: /\.js$/,  // For selecting all the js file
                exclude: /node_modules/,
                use: [
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/env' ],   // It compiles a Ecma script 6,7,8,9,10 etc to ES5
                        plugins: [ '@babel/plugin-proposal-class-properties' ]   // This is use for handling the non-standard JS feature eg classes in JS. It can anything according to the need thats why its an array
                    }
                ]

            }
        ]
    },
    plugins: [  // Plugin are the extra package of webpack we needed in webpack
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'      // This is the bundle name of css file
        }),
        new CleanWebpackPlugin()  // This will help in cleaning/deleting the old build file
        new HtmlWebpackPlugin()   // This is to generate the HTML during the build, having the link of build css and build js
    ]
}





// To install the webpack in simple html and js file folder
// npm init -y
// npm i webpack webpack-cli --save-dev
// npm run webpack    this is to make the build through webpack


// Types of Asset Module : This help in exporting the file other than js
// 1. asset/resource
        // In this, the assests created seperately like new image file in build folder
// 2. asset/inline
        // It inlines a file into the bundle as data URI of base 64 string, basically it convert the image into the code file it makes bundle JS file size bigger. This type of module doesn't generate a new file in the output directory
        // advantage of inline over resource is that let suppose we have 10 big image file, then it is better to use the resouce because if we mad that code as URI in js file. The bunle become much heavier, better to call 10 new http request to server to get the image
        // if we have 10 image of smaller size let say svg, then it is better to use the inline because if we make 10 separate http request to get that file it would become more expensive
        // so then better to use inline, it make bundle little bit heaviour but its ok or good than calling 10 http request to get image  
// 3. asset
        // It is combination of above, if we use it, then webpack will decide which to use either resource or inline. if file size is less than 8kb then it will use the inline otherwise resource
        // If we provide the dataUrlCondition of parser, then we can update the threshold of 8kb to any value
// 4. asset/source
        // help to get the source code of the asset,This is to import or read the text file


// Loaders 
    // The loaders allow you to import all other kinds of files that you can't handle using asset modules like css, sass, less, handlebars, xml etc
    // We have used the style loader and css loader in below example of case of css
    // While using the 'asset' we dont need to install any additional package but we need the to install package while using the loaders
    // npm install css-loader style-loader --save-dev
    // we can use loaders for any preprocessors like scss or less, we have the example below
    // npm install sass-loader sass --save-dev
    // To install the babel in webpack
        // npm i @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties --save-dev

// Plugins 
    // The plugins are additional JS libraries that do everything that loaders can not do
    // We use the TERSER plugin to further reduce the bundle size
    // Webpack plugin usually provided as NPM packages that you can install from your terminal
    // Tercer plugin is already installed together with webpack, starting from webpack version 5. It reduces the bundle size at very much extent

    // If we combine css and JS togther to form a single file name bundle js. As code grows the size of this bundle js grows then it become problamatic
    // So we make different bundle for different format means 1 bundle for all js and 1 bundle for all css. The advantage of doing this is that faster to download
    // Key to note that in this exercise we have imported the css into the js file.
    // So we use the mini css extract plugin.
    // npm i mini-css-extract-plugin --save-dev

// Caching
    // Every time we make the build, if building starts from 0 then it takes time. If we go with caching ie if anything changes in particular section we will make build of that part and for rest we use the cache of the previous build
    // for this we update the filename with 'contenthash' in output for the js and minicss also
    // The problem comes when we make build when any changes happen then a new build file added up in the folder. Now we have to two build file, the old one and new one
    // So to remove the old or redudant build, we will use the clean-webpack plugin
        // npm i clean-webpack-plugin --save-dev

// Generating the HTML file automatically after build command
    // we will use the HtmlWebpackPlugin,
    // npm i html-webpack-plugin --save-dev


// Mode
    // Providing the mode configuration option tells webpack to use its built-in optimizations accordingly.
    // There are 3 types of Mode - none, development, production
    // development mode shows the error file easily to read form while the production mode its difficult to find the bug because it forms the condesnsed form of code which is difficult to read

// Development setup
    // Every time we make changes we need to rebuild to check the code the code is correct or not. we need to setup server running on some port
    // npm i webpack-dev-server --save-dev
    // Then we configure it, see the devServer below for reference 

// Module Federation
    // Module federation allows one application (not talking about the page or component) to dynamically load modules from another application at runtime not the buildtime. if needed more visit 'https://www.youtube.com/watch?v=D3XYAx30CNc'
    // It is available in version 5
    // We don't need this plugin to be installed separately
    // It is added in plugin section


const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
    //entry: './src/index.js', // This will be file name which will be read as entry or start file. This will be used when we want only one entry js file in the build
    entry: {  //This will be used when we want only 2 or more entry js file for the build. Multiple input file means multiple html file need to generate in the build
        'hello-world': './src/hello-world.js',
        'kiwi': './src/kiwi.js'
    },
    output: {
        filename : '[name].[contenthash].js',  // This will be bundle file name or build name. name means it will automatically set the entry file name as build file name
        path: path.resolve(__dirname, './dist'),  // Here we provide the relative path where bundle need to be formed
        publicPath: ''  // It is the path from where it takes the assets or resource like images and fonts file, here we can also use the URL path also.
    },
    mode: 'none', // none means we dont want any built in optimization
    optimization: {  // This helps in optimizing the package we installed like lodash, if we don't optimize it then whole loadash added to the each HTML file either we are using that package or not and file become bigger, if we use it then the file become smaller and package will be created into separate js file which will be chached
        splitChunks: {
            chunks: 'all',
            minSize: 3000  // It means check if by adding the package in html if its less than 3kb it can be added if not the package need to form it new js file
        }
    }
    devServer: {
        port: 9000,  // This is the port on which dev is running
        static: {
            directory: path.resolve(__dirname, './dist')  // The path where dev build to form 
        },
        devMiddleware: {
            index: 'index.html', // This is the entry file
            writeToDisk: true  // This is to allow to write in the drive not to store in the cache
        }
    },
    module: {            // By default webpack use only JS file and don't use the resource like image and other thing. Module are used for the various type of assests eg image
        rules: [        // The rules is the array because we provide various condition in it
            
            // Assests
            {
                test: /\.(png|jpg)$/,    // Here we added the regex that any file that end with png or jpg
                type: 'asset/resource'   // It is the type of assets, The types of asset modules have mentioned above.
            },
            {
                test: /\.(svg)$/,    // Here we added the regex that any file that end with svg
                type: 'asset/inline'   // It is the type of assets, The types of asset modules have mentioned above.
            },
            {
                test: /\.(ttf)$/,    // Here we added the regex that any file that end with ttf
                type: 'asset'   // It is the type of assets, The types of asset modules have mentioned above.
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024  // ie 3kb
                    }
                }
            },
            {
                test: /\.txt$/,    // Here we added the regex that any file that end with txt
                type: 'asset/source'   // It is the type of assets, The types of asset modules have mentioned above.
            },

            // Loaders
            // Key note is that webpack reads from right to left or end to first in an array
            {
                test: /\.css$/,    // Here we added the regex that any file that end with css 
                use: [              // Reading/invoking start from the css-loader and end with style-loader
                    //'style-loader', // It takes the css and injects it into the page using the style tags 
                    MiniCssExtractPlugin.loader, // we have commneted the style-loader because we are extracing the css in separate bundle. Style-loader will combine the css in single js bundle file 
                    'css-loader',   // It reads the content of css file and returns the content
                ]
            },
            {
                test: /\.scss$/,
                use: [              // Reading/invoking start from the scss-loader and end with style-loader
                    'style-loader',
                    'css-loader',
                    'sass-loader'   
                ]
            },

            // Babel loader
            {
                test: /\.js$/,  // For selecting all the js file
                exclude: /node_modules/,
                use: [
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/env' ],   // It compiles a Ecma script 6,7,8,9,10 etc to ES5
                        plugins: [ '@babel/plugin-proposal-class-properties' ]   // This is use for handling the non-standard JS feature eg classes in JS. It can anything according to the need thats why its an array
                    }
                ]

            }
        ]
    },
    plugins: [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'      // This is the bundle name of css file // Name is the file name of css which webpack detect automatically
        }),
        new CleanWebpackPlugin()  // This will help in cleaning/deleting the old build file
        new HtmlWebpackPlugin({   // This is to generate the HTML file during the build, having the link of build css and build js
            filename: 'hello-world.html',
            chunks: ['hello-world'],   // Chunks help to define which JS bundle need to be added in which html file. Chunks name specified in the entry file name
            title: 'Hello World', // This will be the title name of created html file
            filename: 'subfoldername/custom_filename.html', // This will be custom file name of html file along the custom folder name in which html file lies
            meta: {
                description: 'Hello World'
            }
        }),
        new HtmlWebpackPlugin({   // Above HtmlWebpackPlugin is enough if we want 1 html to form in build, but if we want 2 then we have to setup HtmlWebpackPlugin again
            filename: 'kiwi.html',
            chunks: ['kiwi']
            title: 'Kiwi', 
            filename: 'subfoldername/custom_filename.html', 
            meta: {
                description: 'Kiwi'
            }
        }),
        new ModuleFederationPlugin({
            name: 'HelloWorldApp',  // It is the current app name
            filename: 'remoteEntry.js',  // It is the file which webpack will generate a file that contains everything this application exports to outer world so that other application can use that 
            exposes: {  //It is the list of shared module exposed by this application for other application
                './HelloWorldButton': './src/components/hello-world-button/hello-world-button.js'   // It is the name along with path of file to be exposed
            },
            remotes: {  // It is the list of module it need to consume which is shared by the other
                HelloWorldApp: 'HelloWorldApp@http://localhost:9001/remoteEntry.js' // Here we need to add the application not the modules, application name and its url where it has been deployed
            }
        })
    ]
}