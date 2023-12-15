import callApi from '../helpers/apiHelper';

class FighterService {

    getFighterInfo(fighter){
        const info = fighter.fighterInfo;
    }

    fight() {
        const roundTime = 10000; 
        const fightRounds = 5;
        
        return new Promise((resolve, reject) => {
            for (let i = 0; i < fightRounds; i++) {
                const aKeyPressed = this.keyPressed('A');
                const jKeyPressed = this.keyPressed('J');
                const dKeyPressed = this.keyPressed('D');
                const lKeyPressed = this.keyPressed('L');
                const a3KeyPressed = this.keyPressed('A', 3);
                const j3KeyPressed = this.keyPressed('J', 3);

                if (aKeyPressed && !dKeyPressed) {
                    const hitPower = this.getHitPower(this.firstFighter);
                    this.secondFighter.health -= this.getDamage(this.secondFighter, hitPower);
                }

                if (jKeyPressed && !lKeyPressed) {
                    const hitPower = this.getHitPower(this.secondFighter);
                    this.firstFighter.health -= this.getDamage(this.firstFighter, hitPower);
                }

                if (a3KeyPressed && !dKeyPressed) {
                    const criticalHitPower = 2 * this.firstFighter.attack;
                    this.secondFighter.health -= this.getDamage(this.secondFighter, criticalHitPower);
                }

                if (j3KeyPressed && !lKeyPressed) {
                    const criticalHitPower = 2 * this.secondFighter.attack;
                    this.firstFighter.health += this.getDamage(criticalHitPower);
                }

                setTimeout(() => {
                    this.renderArena();
                    this.healthBar(this.firstFighter);
                    this.healthBar(this.secondFighter);
                }, roundTime);
            }
            
            const winner = this.firstFighter.health > this.secondFighter.health ? this.firstFighter : this.secondFighter;
            resolve(winner);
        });
    }

    getHitPower(fighter) {
        const attack = fighter.attack;
        const criticalHitChance = Math.random() * (2 - 1) + 1;
        const power = attack * criticalHitChance;
        return power;
    }

    getBlockPower(fighter) {
        const defense = fighter.defense;
        const dodgeChance = Math.random() * (2 - 1) + 1;
        const power = defense * dodgeChance;
        return power;
    }

    getDamage(fighter, hitPower) {
        const blockPower = this.getBlockPower(fighter);
        const damage = Math.max(0, hitPower - blockPower);
        return damage;
    }

    #endpoint = 'fighters.json';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        // todo: implement this method
        // endpoint - `details/fighter/${id}.json`;
    }
}

const fighterService = new FighterService();

export default fighterService;
