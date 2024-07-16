function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
    };
  },
  computed: {
    playerHealthStyle() {
      return { width: this.playerHealth + "%" };
    },
    monsterHealthStyle() {
      return { width: this.monsterHealth + "%" };
    },
  },
  methods: {
    monsterAttack() {
      monsterDamage = getRandomDamage(8, 12);
      if (this.playerHealth - monsterDamage < 0) this.playerHealth = 0;
      else this.playerHealth -= monsterDamage;
    },
    attack() {
      playerDamage = getRandomDamage(6, 10);
      if (this.monsterHealth - playerDamage < 0) this.monsterHealth = 0;
      else this.monsterHealth -= playerDamage;
      this.monsterAttack();
    },
    specialAttack() {
      playerSpecialDamage = getRandomDamage(9, 14);
      if (this.monsterHealth - playerSpecialDamage < 0) this.monsterHealth = 0;
      else this.monsterHealth -= playerSpecialDamage;
      this.monsterAttack();
    },
    heal() {
      healing = getRandomDamage(10, 15);
      if (this.playerHealth + healing > 100) this.playerHealth = 100;
      else this.playerHealth += healing;
      this.monsterAttack();
    },
    surrender() {},
  },
});

app.mount("#game");
