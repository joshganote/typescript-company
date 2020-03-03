import { Position } from "../enums/Position";
import randomNumber from "../uitls/randomNumber"
import * as data from "./data/names.json";
import { MeritIncrease } from "../enums/MeritIncrease";
import { Person } from "./person";


export class Employee implements IPERSON {
    // ? let's us use a name if we already have one, if not pick a random one
    private firstName: string;  //extending the Person already has first and last name
    private lastName: string;
    private salary: number;
    private position: Position;

    constructor(
        firstName?: string, 
        lastName?: string, 
        salary?: number, 
        position?: Position
    ) {
        //super(firstName, lastName)super calls the parent construcor in Person class
        // this reads.. hey if you have a first name use this, if not then use this
        this.firstName = firstName ? firstName: this.createFirstName();
        this.lastName = lastName ? lastName : this.createLastName();
        this.salary = salary ? salary : 10000;
        this.position = position ? position : Position.ASSOCIATE;
    }

    private createFirstName(): string {
        return data.first_names[randomNumber(0, data.first_names.length - 1)];
    }
    private createLastName(): string {
        return data.last_names[randomNumber(0, data.last_names.length - 1)];
    }
    public promote(): void {
        // if(this.position === Position.ASSOCIATE){
        //     this.position = Position.ANALYST
        // }
        switch(this.position){
            case Position.ASSOCIATE: 
                this.position = Position.ANALYST;
                this.salary = this.meritIncrease(MeritIncrease.ANALYST);
                break;
                case Position.ANALYST:
                this.position = Position.SENIOR_ANALYST;
                this.salary = this.meritIncrease(MeritIncrease.SENIOR_ANALYST);
                break;
                case Position.SENIOR_ANALYST:
                this.position = Position.MANAGER;
                this.salary = this.meritIncrease(MeritIncrease.MANAGER);
                break;
                case Position.MANAGER:
                this.position = Position.SENIOR_MANAGER;
                this.salary = this.meritIncrease(MeritIncrease.SENIOR_MANAGER);
                break;
                case Position.SENIOR_MANAGER:
                this.position = Position.DIRECTOR;
                this.salary = this.meritIncrease(MeritIncrease.DIRECTOR);
                break;
                case Position.DIRECTOR:
                this.position = Position.VICE_PRESIDENT;
                this.salary = this.meritIncrease(MeritIncrease.SENIOR_ANALYST);
                break;
                case Position.VICE_PRESIDENT:
                this.position = Position.SENIOR_VICE_PRESIDENT;
                this.salary = this.meritIncrease(MeritIncrease.VICE_PRESIDENT);
                break;
                case Position.SENIOR_VICE_PRESIDENT:
                this.position = Position.PRESIDENT;
                this.salary = this.meritIncrease(MeritIncrease.PRESIDENT);
                break;
        }
    }
    private meritIncrease(percentage: number): number {
        // 10000 * 1 = 10000
        // 10000 * 1.05 = 10500
        return Math.floor(this.salary * (1 + percentage));
    }

    // Getter and Setters
    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getSalary(): number {
        return this.salary;
    }

    public getPosition(): Position {
        return this.position;
    }

    public getFullName(): string {
        return this.firstName + ' ' + this.lastName;
    }
}