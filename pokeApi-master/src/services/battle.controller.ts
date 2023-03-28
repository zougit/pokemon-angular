import { resolve } from "node:path";
import { Pokemon } from "../models";
import { Move } from "../models";



export class BattleController{
    pokemon:Pokemon[];

    constructor(pokemon: Pokemon[]){
        this.pokemon = pokemon;
    }

    async battle(){
        let winner: Pokemon | null = null;
                winner = await this.fight();
                console.log(`${this.pokemon[0].name} : ${this.pokemon[0].hp}/${this.pokemon[0].hpMax}`);
                console.log(`${this.pokemon[1].name} : ${this.pokemon[1].hp}/${this.pokemon[1].hpMax}`);
                console.log();

                if(winner == null){
                    this.battle();
                }
                else{
                    console.log(winner.name + " win !!!");
                }
    }

    async fight(): Promise<Pokemon | null>{
        const first = this.whoIsMoreSpeed();
        const second = first === this.pokemon[0] ? this.pokemon[1] : this.pokemon[0];
        await this.asyncAttack(first, second, first.choseRandomMove());

        if(second.isDead()){
            return first;
        }

        await this.asyncAttack(second, first, second.choseRandomMove());

        if(first.isDead()){
            return second;
        }


        return null;

    }

    attack(attacker: Pokemon, defender: Pokemon, move: Move){
            let damage = this.calculDamage(attacker, defender, move);
            defender.hp -= damage;

            console.log(attacker.name + " attack " + defender.name + " with " + move.name + ".");
            console.log(defender.name + " lose " + damage + " hp.");
    }

    asyncAttack(attacker: Pokemon, defender: Pokemon, move: Move){
        return new Promise(resolve => {
            setTimeout(() =>
                resolve(this.attack(attacker, defender, move)),
                1000
            )
        });
    }

    calculDamage(attacker: Pokemon, defender: Pokemon, move: Move): number{
        let damage: number = 0;
        if(move.power !== null){
            damage = Math.floor(move.power * 0.01 * attacker.atk * 0.01 * defender.def);
            damage = damage < 0 ? 0 : damage;
        }

        return damage;
    }

    whoIsMoreSpeed(random = Math.random){
        if(this.pokemon[0].speed !== this.pokemon[1].speed){
            return this.pokemon[0].speed > this.pokemon[1].speed ? this.pokemon[0] : this.pokemon[1];
        }else{
            return random() < 0.5 ? this.pokemon[0]  : this.pokemon[1];
        }
    }

}