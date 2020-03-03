import { Employee } from "./employee";
import { Position } from "../enums/Position";
import randomNumber from "../uitls/randomNumber"
import * as data from "./data/names.json";

export class Company {

    private timer: Object = {};
    //timer: NodeJS.Timeout = {};
    private timerCount: number = 0;
    private employees: Employee[];

    constructor() {
        this.timerCount = 0;
        this.employees = [];
    }

    public init():void {
        console.log("I'm a company");

        while(this.employees.length < 10){
            this.createEmployee();
        }
        console.log(this.employees);
        //bind.this will transfer the scope from one function to the next
        this.timer = setInterval(this.onTimerInterval.bind(this), 5000);
        this.createEmployee();
    }

    // private is an access modifier
    private onTimerInterval():void {
        console.log("suh dude?");
        this.timerCount++;
        this.randomEvent();
        console.log(this.timerCount);
    }

    private randomEvent():void {
        // Some random event happens here!
    }

    private createEmployee():Employee {
        const randomNum: number = randomNumber(0,10);
        const firstName: string = data.first_names[0];

        const newEmployee = new Employee(firstName, "Ganote", 10000, Position.PRESIDENT);
        this.employees.push(newEmployee); // {firstName: 'Josh', ...}
        return newEmployee;
    }
}