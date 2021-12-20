'use strict'

const debug = require('debug')('nodeIot:db')
const inquirer = require('inquirer')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  const answers = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?'
    }
  ])

  if (!answers.setup) {
    return console.log('Nothing happened :)')
  }
  const config = {
    database: process.env.DB_NAME || 'nodeiot',
    username: process.env.DB_USERNAME || 'gonzalo',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }
  await db(config).catch(handleFatalError)
  console.log('Success!!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()
