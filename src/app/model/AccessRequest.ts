import { Serializable } from "./Serializable";

export class AccessRequest extends Serializable {
    public id: number;
    public email: string;
    public name: string;
    public company: string;
    public description: string;
    public idLayer: number;
    public nameLayer: string;
    public accessGrantedLayer: number;

    get sensibility(): string {
        return this.accessGrantedLayer == 1 ? 'Información Corpocaldas' : 'Información de otras entidades';
    }
}