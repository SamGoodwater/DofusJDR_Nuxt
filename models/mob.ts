import { Creature } from './creature';

export class Mob extends Creature {
    official_id: string | null = null;
    dofusdb_id: string | null = null;
    hostility: number = 2;
    size: number = 2;
    trait: string | null = null;
    other_info: string | null = null;
    dofus_version: string = '2';

    constructor(data: Partial<Mob>) {
        super(data);
        this.hydrate(data);
    }
}