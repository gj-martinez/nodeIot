'use strict'

module.exports = function setupAgent (AgentModels) {
  async function createOrUpdate (agent) {
    const cond = {
      where: {
        uuid: agent.uuid
      }
    }
    const existingAgent = await AgentModels.findOne(cond)

    if (existingAgent) {
      const updated = await AgentModels.update(agent, cond)
      return updated ? AgentModels.findOne(cond) : existingAgent
    }

    const result = await AgentModels.create(agent)
    return result.toJSON()
  }
  function findById (id) {
    return AgentModels.findById(id)
  }

  function findByUuid (uuid) {
    return AgentModels.findOne({
      where: {
        uuid
      }
    })
  }

  function findAll () {
    return AgentModels.findAll()
  }

  function findConnected () {
    return AgentModels.findAll({
      where: {
        connected: true
      }
    })
  }

  function findByUsername (username) {
    return AgentModels.findAll({
      where: {
        username,
        connected: true
      }
    })
  }
  return {
    createOrUpdate,
    findById,
    findByUuid,
    findAll,
    findConnected,
    findByUsername
  }
}
