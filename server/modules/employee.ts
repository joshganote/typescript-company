import { Position } from "../enums/Position";


export class Employee {

    private firstName: string;
    private lastName: string;
    private salary: number;
    private position: Position;

    constructor(firstName: string, lastName: string, salary: number, position: Position) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.position = position;
    }
}