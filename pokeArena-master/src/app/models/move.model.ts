export interface MoveProps{
  name: string;
  accuracy: number;
  power: number;
  pp: number;
}

export class Move implements MoveProps{
  name: string;
  accuracy: number;
  power: number;
  pp: number;

  constructor(move: MoveProps){
      this.name = move.name;
      this.accuracy = move.accuracy;
      this.power = move.power;
      this.pp = move.pp;
  }

}
