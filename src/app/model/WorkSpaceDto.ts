import { Layer } from "./Layer";
import { Serializable } from "./Serializable";

export class WorkSpaceDto extends Serializable {
    
    public id: number;
    public name: string;
    public idParent: number;
    public nameParent: string;
    public childrens: Array<WorkSpaceDto> = [];
    public layers: Array<Layer> = [];
    
}