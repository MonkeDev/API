module.exports = class Manager {
    constructor(schema) {
        this.schema = schema;
        this.cache = new Map();
    }

    async get(FOR) {
        let data = await this.cache.get(FOR);
        if (!data) {
            data = await this.schema.findOne({ for: FOR }).lean();
            this.cache.set(FOR, data);
        }
        return data;
    }
};