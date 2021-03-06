import { Injectable } from "@angular/core";

export const Itype = new Map<string, number>([
    ["normal",1 ],
    ["fire",2 ],
    ["water",3 ],
    ["grass",4 ],
    ["electric",5 ],
    ["ice",6 ],
    ["fighting",7 ],
    ["poison",8 ],
    ["ground",9 ],
    ["flying",10 ],
    ["psychic",11 ],
    ["bug",12 ],
    ["rock",13 ],
    ["ghost",14 ],
    ["dragon",15 ],
    ["dark",16 ],
    ["steel",17 ],
    ["fairy",18]
]);

@Injectable({
    providedIn: 'root'
})
export class TypesService { 
    multi:number[][] = [
        [1,1,1,1,1,1,1,1,1,1,1,1,0.5,0,1,1,0.5,1],
        [1,0.5,0.5,2,1,2,1,1,1,1,1,2,0.5,1,0.5,1,2,1],
        [1,2,0.5,0.5,1,1,1,1,2,1,1,1,2,1,0.5,1,1,1],
        [1,0.5,2,0.5,1,1,1,0.5,2,0.5,1,0.5,2,1,0.5,1,0.5,1],
        [1,1,2,0.5,0.5,1,1,1,0,2,1,1,1,1,0.5,1,1,1],
        [1,0.5,0.5,2,1,0.5,1,1,2,2,1,1,1,1,2,1,0.5,1],
        [2,1,1,1,1,2,1,0.5,1,0.5,0.5,0.5,2,0,1,2,2,0.5],
        [1,1,1,2,1,1,1,0.5,0.5,1,1,1,0.5,0.5,1,1,0,2],
        [1,2,1,0.5,2,1,1,2,1,0,1,0.5,2,1,1,1,2,1],
        [1,1,1,2,0.5,1,2,1,1,1,1,2,0.5,1,1,1,0.5,1],
        [1,1,1,1,1,1,2,2,1,1,0.5,1,1,1,1,0,0.5,1],
        [1,0.5,1,2,1,1,0.5,0.5,1,0.5,2,1,1,0.5,1,2,0.5,0.5],
        [1,2,1,1,1,2,0.5,1,0.5,2,1,2,1,1,1,1,0.5,1],
        [0,1,1,1,1,1,1,1,1,1,2,1,1,2,1,0.5,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,0.5,0],
        [1,1,1,1,1,1,0.5,1,1,1,2,1,1,2,1,0.5,1,0.5],
        [1,0.5,0.5,1,0.5,2,1,1,1,1,1,1,2,1,1,1,0.5,2],
        [1,0.5,1,1,1,1,2,0.5,1,1,1,1,1,1,2,2,0.5,0]
      ]
}