import { Serializable } from "./Serializable";

export class Layer extends Serializable {
    public id: number;
    public name: string;
    public referenceName: string;
    public idWorkspace: number;
    public nameWorkspace: string;
    public accessGranted: number;
    public visible: boolean = true;
    public file: File;
    public metadataUrl: string;

    get accessType(): string {
        return this.accessGranted === 1 ? 'Información Corpocaldas' : 'Información de otras entidades';
    }

    get visibility(): string {
        return this.visible ? 'Visible' : 'No visible';
    }
}
