import { Serializable } from "./Serializable";

export class Layer extends Serializable {
    public id: number;
    public name: string;
    public url: string;
    public accessGranted: number;

    get accessType(): string {
        return this.accessGranted === 1 ? 'Publico' : 'Privado';
    }
}