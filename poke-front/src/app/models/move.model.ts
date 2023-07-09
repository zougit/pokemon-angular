export interface MoveProps{
  name: string;
  accuracy: number;
  power: number;
  pp: number;
  type: string
}

export class Move implements MoveProps{
  name: string;
  accuracy: number;
  power: number;
  pp: number;
  type: string

  constructor(move: MoveProps){
      this.name = move.name;
      this.accuracy = move.accuracy;
      this.power = move.power;
      this.pp = move.pp;
      this.type = move.type
  }

}
