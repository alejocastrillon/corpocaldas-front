import { Layer } from "./Layer";
import { Serializable } from "./Serializable";

export class WorkSpaceDto extends Serializable {
    
    public id: number;
    public name: string;
    public parentId: number;
    public nameParent: string;
    public workspaceChildrens: Array<WorkSpaceDto> = [];
    public hasChildren: boolean;
    public layers: Array<Layer> = [];
    
}