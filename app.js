function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      playerSurrender: false,
      logMessages: [],
      counter: 0,
    };
  },
  computed: {
    playerHealthStyle() {
      return { width: this.playerHealth + "%" };
    },
    monsterHealthStyle() {
      return { width: this.monsterHealth + "%" };
    },
    result() {
      if (this.playerSurrender) return 3;
      if (this.playerHealth === 0 && this.monsterHealth === 0) return -1;
      else if (this.monsterHealth === 0) return 1;
      else if (this.playerHealth === 0) return 2;
      else return null;
    },
  },
  methods: {
    monsterAttack() {
      monsterDamage = getRandomDamage(8, 12);
      if (this.playerHealth - monsterDamage < 0) this.playerHealth = 0;
      else this.playerHealth -= monsterDamage;
      this.addLogMessages("Monster", "Attack", monsterDamage);
    },
    attack() {
      this.counter++;
      playerDamage = getRandomDamage(6, 10);
      if (this.monsterHealth - playerDamage < 0) this.monsterHealth = 0;
      else this.monsterHealth -= playerDamage;
      this.addLogMessages("Player", "Attack", playerDamage);
      console.log(this.logMessages);
      this.monsterAttack();
    },
    specialAttack() {
      if (this.counter % 3 === 0) {
        this.counter++;
        playerSpecialDamage = getRandomDamage(9, 14);
        if (this.monsterHealth - playerSpecialDamage < 0)
          this.monsterHealth = 0;
        else this.monsterHealth -= playerSpecialDamage;
        this.addLogMessages("Player", "Attack", playerSpecialDamage);
        this.monsterAttack();
      }
    },
    heal() {
      this.counter++;
      healing = getRandomDamage(10, 15);
      if (this.playerHealth + healing > 100) this.playerHealth = 100;
      else this.playerHealth += healing;
      this.addLogMessages("Player", "Heals", healing);
      this.monsterAttack();
    },
    surrender() {
      this.playerSurrender = true;
    },
    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.playerSurrender = false;
    },
    addLogMessages(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
