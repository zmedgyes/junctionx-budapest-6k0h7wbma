module.exports = class ExampleController {
    static get $inject () { return ['exampleService']; };
    
    constructor(exampleService) {
        this.exampleService = exampleService;
    }

    getExamples(req, res) {
        this.exampleService.addExample(new Date().getTime())
            .then(() => this.exampleService.getExamples())
            .then((data) => {
                res.json({ data });
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    }
}