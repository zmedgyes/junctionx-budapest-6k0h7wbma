module.exports = class ExampleController {
    static get $inject () { return ['exampleService']; };
    
    constructor(exampleService) {
        this.exampleService = exampleService;
    }

    getExamples(req, res, next) {
        this.exampleService.addExample(new Date().getTime())
            .then(() => this.exampleService.getExamples())
            .then((data) => {
                res.json({ data });
            })
            .catch((err) => {
                next(err);
            });
    }
}