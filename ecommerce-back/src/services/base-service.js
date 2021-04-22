module.exports = class BaseService {
    async findAll() {
        return this.model.find()
    }

    async find(object) {
        return this.model.findOne(object)
    }

    async add(item) {
        return this.model.create(item)
    }

    async update(id, item) {
        return this.model.findByIdAndUpdate(id, item, { new: true })
    }

    async delete(id) {
        return this.model.deleteOne({ _id: id })
    }
}