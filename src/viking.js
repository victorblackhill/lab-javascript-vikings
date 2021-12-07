// Soldier
class Soldier {
  constructor(health, strength) {
    (this.health = health), (this.strength = strength);
  }

  attack() {
    return this.strength;
  }

  receiveDamage(damage) {
    this.health += -damage;
  }
}

// Viking
class Viking extends Soldier {
  constructor(name, health, strength) {

    //health and rest are inherited from the soldier class
    super(health, strength);

    //adds the name
    this.name = name;
  }

  //No need to re-implement the attack, it is inherited

  receiveDamage(damage) {
    
    //I would like to use the method of the parenting class soldier but can't apparently
    /*
    this.Soldier.receiveDamage(damage);
    console.log(this.Soldier.receiveDamage(damage),"viking")
    */

    this.health += -damage;

    if (this.health > 0) {
      return `${this.name} has received ${damage} points of damage`;
    } else {return `${this.name} has died in act of combat`;
    }
  }

  battleCry() {
    return 'Odin Owns You All!';
  }
}

// Saxon
class Saxon extends Soldier {


  //constructor inherited from soldier, no need to reimplement it

  receiveDamage(damage){
    this.health += -damage;
    return this.health > 0 ? `A Saxon has received ${damage} points of damage` :`A Saxon has died in combat` 
  }

}

// a function that will help me pick random soldiers from one army or the other
function randomSoldier (list){

  randIndex = Math.floor(Math.random() * list.length) ;
  //console.log(typeof list, randIndex,list.length)
  //console.log(list[randIndex])
  return list[randIndex];
}

// a function that will remove the dead soldiers from an army
/*
function removeDead(army){
  console.log("before", army);
 
  army = army.filter(x => {x.health>=0})
  console.log("after",army)
  return army
  
}
*/

// War
class War {
  
  constructor(){
    this.vikingArmy = [],
    this.saxonArmy = []
  }
  

  //The methods of the Class War
  addViking(viking){
    this.vikingArmy.push(viking);
  };
  addSaxon(saxon){
    this.saxonArmy.push(saxon);
  };
  vikingAttack(){
    if(this.vikingArmy.length > 0 && this.saxonArmy.length > 0){
    //a viking attach is a random soldier from the saxon army
    let damaged = randomSoldier(this.saxonArmy)
    //receiving an attack from a random soldier of the viking army
    let attacker = randomSoldier(this.vikingArmy)
    //compute damage
    console.log("attacker",attacker)
    let result = damaged.receiveDamage(attacker.strength)

    //clean the battlefield
    this.saxonArmy = this.saxonArmy.filter(x=> x.health>0)
    console.log("saxon after viking attack",this.saxonArmy)
    return result
    }
  
  };
  saxonAttack(){
    if(this.vikingArmy.length > 0 && this.saxonArmy.length > 0){
    //a saxon attack is a random soldier from the viking army
    let damaged = randomSoldier(this.vikingArmy)
    //receiving an attack from a random soldier of the saxon army
    let attacker = randomSoldier(this.saxonArmy)
    //compute damage 
    let result1 = damaged.receiveDamage(attacker.strength)


    //clean the battlefield (a dead viking should not reply back)
    this.vikingArmy = this.vikingArmy.filter(x=> x.health>0)
    console.log("saxon after viking attack",this.saxonArmy)




    return result1
  }
  
  };
  showStatus(){
 
    if (this.saxonArmy.length === 0){return 'Vikings have won the war of the century!'}
    else if (this.vikingArmy.length === 0){return "Saxons have fought for their lives and survived another day..."}
    else return 'Vikings and Saxons are still in the thick of battle.'
  };

}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = { Soldier, Viking, Saxon, War };
}



let viking, saxon, war;

function generateViking() {
  const name = 'Harald';
  const strength = 150;
  const health = 50;
  return new Viking(name, health, strength);
}

function generateViking2() {
  const name = 'Ragnar';
  const strength = 150;
  const health = 250;
  return new Viking(name, health, strength);
}
function generateSaxon() {
  const health = 500;
  const strength = 105;
  return new Saxon(health, strength);
}



/*Test cases
viking = generateViking();
viking2 = generateViking2()
saxon1 = generateSaxon();
saxon2 = generateSaxon();
war = new War();
war.addSaxon(generateSaxon());
war.addSaxon(generateSaxon());
war.addSaxon(generateSaxon());
war.addSaxon(generateSaxon());
war.addSaxon(generateSaxon());
war.addSaxon(generateSaxon());
war.addSaxon(generateSaxon());
war.addSaxon(generateSaxon());
war.addSaxon(generateSaxon());
war.addSaxon(generateSaxon());
war.addSaxon(generateSaxon());




console.log(war.showStatus())


//console.log("before",war.vikingArmy.length,war.vikingArmy)
for (let i = 0; i < 12; i++) {
  war.saxonAttack();
}

console.log(war.showStatus())


//console.log("after",war.vikingArmy.length,war.vikingArmy)




//console.log(war.vikingArmy)
*/