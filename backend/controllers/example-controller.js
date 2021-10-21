module.exports = class ExampleController {
    static get $inject () { return ['exampleService']; };
    
    constructor(exampleService) {
        this.exampleService = exampleService;
    }

    getExample(req, res) {
        const data = this.exampleService.getExample();
        res.json({ data });
    }
}