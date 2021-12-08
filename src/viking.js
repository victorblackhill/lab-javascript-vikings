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
    //call the parent method
    super.receiveDamage(damage);

    if (this.health > 0) {
      return `${this.name} has received ${damage} points of damage`;
    } else {
      return `${this.name} has died in act of combat`;
    }
  }

  battleCry() {
    return 'Odin Owns You All!';
  }
}

// Saxon
class Saxon extends Soldier {
  //constructor inherited from soldier, no need to reimplement it

  receiveDamage(damage) {
    this.health += -damage;
    return this.health > 0
      ? `A Saxon has received ${damage} points of damage`
      : `A Saxon has died in combat`;
  }
}

// a function that will help me pick random soldiers from one army or the other
function randomSoldier(list) {
  randIndex = Math.floor(Math.random() * list.length);
  //console.log(typeof list, randIndex,list.length)
  //console.log(list[randIndex])
  return list[randIndex];
}

// a function that will remove the dead soldiers from an army

function removeDead(army) {
  return army.filter((x) => x.health > 0);
}

function attack(defendingArmy, attackingArmy) {
  //an attack is only possible with both armies having soldiers
  if (attackingArmy.length > 0 && defendingArmy.length > 0) {
    //an attack is

    // a random soldier from the defending army
    let damaged = randomSoldier(defendingArmy);

    //receiving an attack from a random soldier of the attacking
    let attacker = randomSoldier(attackingArmy);

    //we keep the result and return it
    let result = damaged.receiveDamage(attacker.strength);

    return result;
  }
}

// War
class War {
  constructor() {
    (this.vikingArmy = []), (this.saxonArmy = []);
  }

  //The methods of the Class War
  addViking(viking) {
    this.vikingArmy.push(viking);
  }
  addSaxon(saxon) {
    this.saxonArmy.push(saxon);
  }

  vikingAttack() {
    //attack the saxon Army with the Viking army
    let res = attack(this.saxonArmy, this.vikingArmy);

    //clean the battlefield
    this.saxonArmy = removeDead(this.saxonArmy);

    return res;
  }

  saxonAttack() {
    //attack the viking army with the saxon army
    let res = attack(this.vikingArmy, this.saxonArmy);

    //clean the battlefield
    this.vikingArmy = removeDead(this.vikingArmy);

    return res;
  }

  showStatus() {
    if (this.saxonArmy.length === 0) {
      return 'Vikings have won the war of the century!';
    } else if (this.vikingArmy.length === 0) {
      return 'Saxons have fought for their lives and survived another day...';
    } else return 'Vikings and Saxons are still in the thick of battle.';
  }
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = { Soldier, Viking, Saxon, War };
}

/*Test cases
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
