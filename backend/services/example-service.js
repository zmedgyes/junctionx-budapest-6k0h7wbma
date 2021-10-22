module.exports = class ExampleService {
    static get $inject() { return ['db']; };
    constructor(db) {
        this.db = db;
    }

    async getExamples() {
        return this.db.query(`SELECT * FROM example`);
    }

    async addExample(example) {
        return this.db.query(`INSERT INTO example (value) VALUES ('${example}')`);
    }
}