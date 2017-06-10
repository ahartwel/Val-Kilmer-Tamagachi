import { Injectable } from '@angular/core';

@Injectable()
export class Kilmer {

  public name = 'Val Kilmer';
  public isHappy = true;
  public isHungry = false;
  public isTired = false;
  public age = 0;

  private hungerAcceleration = 1;
  private tiredAcceleration = 0.2;

  private isSleeping = false;
  private sleepTime = 0;
  private maxSleepTime = 100;

  private happinessLevel = 100;
  private hungerLevel = 0;
  private tiredLevel = 0
  private weight = 150;

  private isAlive = true;

  constructor(

  ) {}

public runFrame() {
    this.hungerLevel += this.hungerAcceleration;
    this.tiredLevel += this.tiredAcceleration;
    this.age += 1;

    this.manageHunger();
    this.managerTiredness();
    this.manageHappines();

}

private manageHunger() {
    if (this.hungerLevel > 50) {
        this.happinessLevel -= 1;
    }
    if (this.hungerLevel > 50) {
        this.isHungry = true;
        this.weight -= 1;
    } else if (this.hungerLevel < 0) {
        this.weight += 1;
    }

    if (this.hungerLevel > 600 || this.weight < 80 || this.weight > 1000 || this.hungerLevel < -1000) {
        this.isAlive = false;
    }
}

private managerTiredness() {
    if (this.tiredLevel > 50) {
        this.happinessLevel -= 1;
    }

    if (this.tiredLevel > 50) {
        this.isTired = true;
    }

    if (this.isSleeping) {
        this.sleepTime += 1;
        this.happinessLevel += 4;
        if (this.sleepTime > this.maxSleepTime || Math.random() > 0.99) {
            this.wakeUp();
        }
    }

    if (this.tiredLevel > 300) {
        this.isAlive = false;
    }
}
private manageHappines() {
    if (this.happinessLevel > 50) {
        this.isHappy = true;
    }
}

public feedKilmer() {
    if (this.isSleeping) {
        return;
    }
    this.hungerLevel -= 25;
}

public feedKilmerUnhealthyFood() {
    this.feedKilmer();
    this.weight += 5;
}

public putKilmerToSleep() {
    if (this.isSleeping) {
        return;
    }
    this.isSleeping = true;
    this.hungerAcceleration = 0.1;
    this.tiredAcceleration = -0.2;
}

private wakeUp() {
    this.isSleeping = false;
    this.sleepTime = 0;
    this.hungerAcceleration = 1;
    this.tiredAcceleration = 0.1;
}

public petKilmer() {
    this.happinessLevel += 25;
}



  public getData() {
      if (this.isAlive == false) {
          return {
              isDead: true
          }
      }
      return {
        isHappy: this.isHappy,
        isHungry: this.isHungry,
        isTired: this.isTired,
        happinessLevel: this.happinessLevel,
        hungerLevel: this.hungerLevel,
        tiredLevel: this.tiredLevel,
        weight: this.weight,
        isSleeping: this.isSleeping,
        age: this.age
      };
  }

}
