const router = require('express').Router()

const AddressService = require('../services/address-service')
const UserService = require('../services/user-service')
const StoreService = require('../services/store-service')

const Auth = require('../middlewares/auth-middleware')

router.post('/user', Auth, async (req, res) => {
    try {
        const user = await UserService.find({ _id: req.user })
        const address = await AddressService.add(req.body)
        user.address.push(address)
        await user.save()
        res.status(200).send(address)

    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
})

router.post('/store', Auth, async (req, res) => {
    try {
        const store = await StoreService.find({ _id: req.user })
        const address = await AddressService.add(req.body)
        store.address = address
        await store.save()
        res.status(200).send(address)

    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
})

router.delete('/user/:id', Auth, async (req, res) => {
    try {
        const user = await UserService.find({ _id: req.user })
        const deletedAddress = await AddressService.delete(req.params.id)
        if (deletedAddress.deletedCount !== 1)
            return res.status(400).send({ 'message': 'Address not found' })

        user.address.remove(req.params.id)
        await user.save()
        res.status(200).send({ 'message': 'Succesfully deleted' })
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
})

router.delete('/store/:id', Auth, async (req, res) => {
    try {
        const store = await StoreService.find({ _id: req.user })
        const deletedAddress = await AddressService.delete(req.params.id)
        if (deletedAddress.deletedCount !== 1)
            return res.status(404).send({ 'message': 'Address not found' })

        store.address.remove(req.params.id)
        await store.save()
        res.status(200).send({ 'message': 'Succesfully deleted' })
    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
})

module.exports = router