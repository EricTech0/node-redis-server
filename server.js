import express from 'express'

/* import routers */
import { router as personRouter } from './routers/person-router.js'
import { router as searchRouter } from './routers/search-router.js'
import { router as locationRouter } from './routers/location-router.js'


/* create an express app and use JSON */
const app = new express()
app.use(express.json())

/* routers */
app.use('/person', personRouter, locationRouter)
app.use('/persons', searchRouter)

/* start the server */
app.listen(8080)
