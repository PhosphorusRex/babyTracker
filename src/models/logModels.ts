import { Schema, model, connect, Document } from 'mongoose'
import * as dotenv from 'dotenv'

// Enables variables from .env file as process.env
dotenv.config()

// const port = process.env.DB_PORT || 27017

interface IOptions {
  user?: string
  pass?: string
  dbName?: string
}

let uri: string
const options: IOptions = {}
if (process.env.NODE_ENV === 'production') {
  options.user = process.env.DB_USER
  options.pass = process.env.DB_PASS
  options.dbName = process.env.DB_NAME
  // options.host = process.env.DB_HOST
  // options.port = process.env.DB_PORT
  uri = `mongodb+srv://${options.user}:${options.pass}@cluster0.vsohc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
} else if (process.env.NODE_ENV === 'development') {
  uri = 'mongodb://localhost/babyTracker'
}

export interface ILog extends Document {
  day: string
  time: string
  feedAmount: number
}

console.log(`NODE_ENV = ${process.env.NODE_ENV}`)

const logSchema = new Schema<ILog>({
  day: { type: String, required: true },
  time: { type: String, required: true },
  feedAmount: { type: Number, required: true }
})

const Log = model<ILog>('Log', logSchema)

main().catch((err) => console.log(err))

async function main(): Promise<void> {
  await connect(uri, options)
}

export default Log
