import express = require('express');
import { Company } from './modules/company';

const app: express.Application = express();
const company: Company = new Company();
company.init();
//company.onTimerInterval(); will not work because it is set to private in company.ts file


app.get('/', (req:express.Request, res:express.Response) => {
    res.send("Hello World");
});

app.get('/api/log', (req:express.Request, res:express.Response) => {
    res.send(company.getFullHistory());
});

app.get('/api/salary/total', (req:express.Request, res:express.Response) => {
    res.send({ total_salary: company.getTotalSalary() });
});

app.get('/api/employee/current', (req:express.Request, res:express.Response) => {
    res.send(company.getEmployees());
});

app.listen(3000, () => {
    console.log(`TypeScript Company listening on port: 3000`);
})