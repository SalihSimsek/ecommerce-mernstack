const AddressService = require('../services/address-service')
const UserService = require('../services/user-service')
const StoreService = require('../services/store-service')

const createAddressForUser = async (req, res) => {
    try {
        const user = await UserService.find({ _id: req.user })
        const address = await AddressService.add(req.body)
        user.address.push(address)
        await user.save()
        res.status(200).send(address)

    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
}

const createAddressForStore = async (req, res) => {
    try {
        const store = await StoreService.find({ _id: req.user })
        const address = await AddressService.add(req.body)
        store.address = address
        await store.save()
        res.status(200).send(address)

    } catch (e) {
        res.status(400).send({ 'message': 'Server error' })
    }
}

const deleteAddressFromUser = async (req, res) => {
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
}

const deleteAddressFromStore = async (req, res) => {
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
}

module.exports = { createAddressForUser, createAddressForStore, deleteAddressFromUser, deleteAddressFromStore }