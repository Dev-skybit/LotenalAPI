const express = require('express')
const router = express.Router()
const { Purchases } = require('../models')
const { User } = require('../models')
const { Ticket } = require('../models')

router.post(`/`, async (req, res) => {
  const { UserId, TicketId } = req.body
  await Purchases.create({ TicketId: TicketId, UserId: UserId })
  res.json("Success")
})

router.get('/:UserId', async (req, res) => {
  const UserId = req.params.UserId
  let i = 0
  let tickets = []

  const purchase = await Purchases.findAll({ where: { UserId: UserId } })
  
  for (i; i < purchase.length; i++) {
    let ticketId = purchase[i].TicketId
    const ticket = await Ticket.findByPk(ticketId)
    tickets.push(ticket)
  }

  res.json(tickets)
})

module.exports = router