'use strict'

const db = require('../')

async function run(){
    const config = {
        database: process.env.DB_NAME || 'nodeiot',
        username: process.env.DB_USERNAME || 'gonzalo',
        password: process.env.DB_PASS || 'platzi',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        setup: true
    }

    const {Agent, Metric} = await db(config).catch(handleFatalError)

    const agent = await Agent.createOrUpdate({
        uuid: 'yyy',
        name:'test',
        username: 'test',
        hostName: 'test',
        pid:1,
        connected: true
    }).catch(handleFatalError)

    console.log("--agent--")
    console.log(agent)

    const agentAll = await Agent.findAll().catch(handleFatalError)
    console.log("--agentAll--")
    console.log(agentAll)

    const metrics = await Metric.findByAgentUuid(agent.uuid).catch(handleFatalError)
    console.log("--metrics--")
    console.log(metrics)
}

function handleFatalError (err) {
    console.error(err.message)
    console.error(err.stack)
    process.exit(1)
}
run()