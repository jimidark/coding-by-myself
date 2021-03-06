import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import template from './../template'

import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

// modules for server side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import StaticRouter from 'react-router-dom/StaticRouter'

import {SheetsRegistry} from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {MuiThemeProvider, createMuiTheme, createGenerateClassName} from '@material-ui/core/styles'
import {indigo, pink} from '@material-ui/core/colors'

import devBundle from './devBundle'

const app = express()

devBundle.compile(app)

const CURRENT_WORKING_DIR = process.cwd()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use("/", userRoutes)
app.use("/", authRoutes)

app.get('*', (req, res) => {
    const sheetsRegistry = new SheetsRegistry()
    const theme = createMuiTheme({
        palette: {
          primary: {
          light: '#757de8',
          main: '#3f51b5',
          dark: '#002984',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ff79b0',
          main: '#ff4081',
          dark: '#c60055',
          contrastText: '#000',
        },
          openTitle: indigo['400'],
          protectedTitle: pink['400'],
          type: 'light'
        },
   })
   const generateClassName = createGenerateClassName()
   const context = {}
   const markup = ReactDOMServer.renderToString(
       <StaticRouter location={req.url} context={context}>
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                    <MainRouter />
                </MuiThemeProvider>
            </JssProvider>
       </StaticRouter>
   )
   if (context.url) {
       return res.redirect(303, context.url)
   }
   const css = sheetsRegistry.toString()
   res.status(200).send(template({
       markup: markup,
       css: css
   }))
})

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error": err.name + ": " + err.message})
    }
})

// app.get("/", (req, res) => {
//     res.status(200).send(template())
// })

export default app
