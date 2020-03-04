import { Employee } from "./employee";
import { Position } from "../enums/Position";
import randomNumber from "../uitls/randomNumber"
import * as data from "./data/names.json";
import { HistoryLog } from "../uitls/HistoryLog";

class EmployeeObjectIndex {
    public employee: Employee;
    public index: number;
    
    constructor(employee: Employee, index: number) {
        this.employee = employee;
        this.index = index;
    }
}
export class Company {

    private timer: Object = {};
    //timer: NodeJS.Timeout = {};
    private timerCount: number = 0;
    private employees: Employee[];
    private historyLog: HistoryLog = new HistoryLog();
    private readonly NUM_OF_STARTING_EMPLOYEES: number = 15;
    private readonly INTERVAL_TICK: number = 0.01 * 1000;
    constructor() {
        this.timerCount = 0;
        this.employees = [];
    }

    public init(): void {
        while (this.employees.length < this.NUM_OF_STARTING_EMPLOYEES) {
            this.createEmployee();
        }
        this.timer = setInterval(
            this.onTimerInterval.bind(this),
            this.INTERVAL_TICK);
        //this.createEmployee();
        //console.log(this.historyLog.getLog());
        //console.log(this.employees);
        //bind.this will transfer the scope from one function to the next
    }

    // private is an access modifier
    private onTimerInterval(): void {
        this.timerCount++;
        this.randomEvent();
        //console.log("suh dude?");
        //console.log(this.timerCount);
    }

    private randomEvent(): void {
        // Some random event happens here!
        const randomChance = randomNumber(1, 100);

        switch (randomChance) {
            case 1 || 5 || 6 || 7 || 8 || 9:
                // new hire
                this.createEmployee();
                break;
            case 2:
                // promote
                this.promoteEmployee();
                break;
            case 3:
                // quit
                this.removeEmployee(true);
                break;
            case 4:
                // fire
                this.removeEmployee(false);
                break;
        }
    }

    private createEmployee(): void {
        const newEmployee = new Employee();
        newEmployee.promote();
        newEmployee.promote();
        this.employees.push(newEmployee);
        this.historyLog.addNewEmployee(newEmployee);
    }

    private promoteEmployee(): void {
        const employeeObject: EmployeeObjectIndex = this.getRandomEmployee();
        const randomEmployee: Employee = employeeObject.employee;
        randomEmployee.promote();
        this.historyLog.promoteEmployee(randomEmployee);
    }

    private removeEmployee(quit?: boolean): void {
        if(this.employees.length <= 1) return;

        const employeeObject: EmployeeObjectIndex = this.getRandomEmployee();
        // const randomEmployee: Employee = employeeObject.employee;
        // const randomIndex: number = employeeObject.index;

        if(quit){
            this.historyLog.quitEmployee(employeeObject.employee);
        } else {
            this.historyLog.fireEmployee(employeeObject.employee);
        }

        this.employees.splice(employeeObject.index, 1);
    }

    private getRandomEmployee(): EmployeeObjectIndex {
        const randomNum = randomNumber(0, this.employees.length - 1)
        return new EmployeeObjectIndex(this.employees[randomNum], randomNum);
    }

    public getFullHistory(): string[] {
       return this.historyLog.getLog();
    }
}