const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "server",
    entry: [
        "./server/server.js"
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR, "/dist"),
        filename: "server.generated.js",
        publicPath: "/dist/"
    },
    target: "node",
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader"
                ]
            }
        ]
    }
}

module.exports = config
