import { Client } from 'redis-om'
import { createClient } from 'redis'

export const connection = createClient({
    password: '',
    socket: {
        host: '',
        port: 0
    }
});

await connection.connect()

const client = await new Client().use(connection)

export default client
