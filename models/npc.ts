import { Creature } from './creature';

export class Npc extends Creature {
    classe: string = '';
    location: string | null = null;
    story: string | null = null;
    historical: string | null = null;
    alignment: string | null = null;
    age: string | null = null;
    size: string | null = null;
    weight: string | null = null;

    constructor(data: Partial<Npc>) {
        super(data);
        this.hydrate(data);
    }
}