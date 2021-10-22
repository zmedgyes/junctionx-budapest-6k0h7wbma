module.exports = class ExampleController {
    static get $inject () { return ['exampleService']; };
    
    constructor(exampleService) {
        this.exampleService = exampleService;
    }

    async getExamples(req, res, next) {
        await this.exampleService.addExample(new Date().getTime())
        const data = await this.exampleService.getExamples();
        res.json({ data });
    }
}