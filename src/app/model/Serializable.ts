export class Serializable {
    fromJSON(json) {
        for (const propName in json)
            this[propName] = json[propName];
        return this;
    }
}