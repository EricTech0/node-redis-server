import { Router } from 'express'

import { personRepository } from '../om/person.js'
import { connection } from '../om/client.js'

export const router = Router()


router.patch('/:id/location/:lng,:lat', async (req, res) => {

  /* extract parameters */
  const { id, lng, lat } = req.params;
  const longitude = Number(lng)
  const latitude = Number(lat)

  /* set the updated date time to now */
  const locationUpdated = new Date()

  /* update the location using Redis OM */
  const person = await personRepository.fetch(id)
  person.location = { longitude, latitude }
  person.locationUpdated = locationUpdated
  await personRepository.save(person)

  /* log the location update to a stream using Node Redis */
  await connection.xAdd(`${person.keyName}:locationHistory`, '*', person.location)

  /* return the changed field */
  res.send({ id, locationUpdated, location: { longitude, latitude } })
})

