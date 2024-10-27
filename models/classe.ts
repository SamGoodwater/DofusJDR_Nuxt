import { Content } from './content';

export class Classe extends Content {
    official_id: string | null = null;
    dofusdb_id: string | null = null;
    name: string = '';
    description_fast: string | null = null;
    description: string | null = null;
    life: string | null = null;
    life_dice: number = 10;
    specificity: string | null = null;
    weapons_of_choice: number | null = null;
    trait: string | null = null;
    dofus_version: string = '1';

    constructor(data: Partial<Classe>) {
        super(data);
        this.hydrate(data);
    }
}