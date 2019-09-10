let app = new Vue({
  el:'#app',
  data:{
    title:'hello',
    startGame:false,
    humanHealth:100,
    monsterHealth:100,
    turns:[]
  },
  methods: {
    gameStart(){
      this.startGame = true;
      this.humanHealth =100;
      this.monsterHealth=100;
      this.turns = [];
    },
    attack(){
      let damage = this.calculateDamage(3,10);
      this.monsterHealth -= damage;

      this.turns.unshift({
        isHuman:true,
        msg:'Human hits Monster for '+ damage
      })

      if(this.winner()){
        return; 
      }
       this.monsterAttack();
    },
    monsterAttack(){
      let damage = this.calculateDamage(5,12)
      this.humanHealth -= damage ;
      this.winner();

      this.turns.unshift({
        isHuman:false,
        msg:'Monster hits Human for '+ damage
      })
    },
    specialAttack(){
      let damage = this.calculateDamage(10,20);
      this.monsterHealth -= damage;

      this.turns.unshift({
        isHuman:true,
        msg:'Human hits Monster hard for '+ damage
      })

      if(this.winner()){
        return; 
      }
     this.monsterAttack();
    },
    heal(){
      if(this.humanHealth <=90){
        this.humanHealth +=10;
        
        this.turns.unshift({
          isHuman:true,
          msg:'Human heals by 10. '
        })
      }
      else{
        this.humanHealth = 100;
      }
  
      this.monsterAttack();
    },
    calculateDamage(min,max){
      return Math.max(Math.floor(Math.random()*max)+1,min)
    },
    winner(){
      if(this.monsterHealth <=0){
        if(confirm('You Won!! Do play again?')){
          this.gameStart();
        }
        else{
          this.gameStart = false;
        }
        return true;
      } else if(this.humanHealth <=0){
        if(confirm('You Lost!! Do play again?')){
          this.gameStart();
        }
        else{
          this.gameStart = false;
        }
        return true;
      }
      return false; 
    },
    giveup(){
    this.startGame = false;
    this.turns=[];
    }
  },
 
})