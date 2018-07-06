<template lang="pug">
  el-row
    div(style="margin: 50px;")
    el-col(:span="6")
      | &nbsp;
    el-col(:span="12")
      el-card
        .clearfix(slot="header")
          | Tic Tac Toe
          div(id="header-info" v-if="!finished")
            | Trun:
            el-tag(:type="whosTrun == 'X' ? 'danger' : 'success'")
              | {{whosTrun == "X" ? "Computer" : "Human"}} [{{whosTrun}}]
            i(class="el-icon-loading")
          div(id="header-info" v-if="finished")
            el-tag
              | Winer: {{winer}} !!

        .cardbody
          el-row(class="graph-contain")
            el-row
              el-col(:span="3")
                | &nbsp;
              el-col(:span="6" id="block" @click.native="selectBlockClick('a')")
                span(v-if="a !== 0")
                  | {{a}}
              el-col(:span="6" id="block" @click.native="selectBlockClick('b')")
                span(v-if="b !== 0")
                  | {{b}}
              el-col(:span="6" id="block" @click.native="selectBlockClick('c')")
                span(v-if="c !== 0")
                  | {{c}}
              el-col(:span="3")
                | &nbsp;
            el-row
              el-col(:span="3")
                | &nbsp;
              el-col(:span="6" id="block" @click.native="selectBlockClick('d')")
                span(v-if="d !== 0")
                  | {{d}}
              el-col(:span="6" id="block" @click.native="selectBlockClick('e')")
                span(v-if="e !== 0")
                  | {{e}}
              el-col(:span="6" id="block" @click.native="selectBlockClick('f')")
                span(v-if="f !== 0")
                  | {{f}}
              el-col(:span="3")
                | &nbsp;
            el-row
              el-col(:span="3")
                | &nbsp;
              el-col(:span="6" id="block" @click.native="selectBlockClick('g')")
                span(v-if="g !== 0")
                  | {{g}}
              el-col(:span="6" id="block" @click.native="selectBlockClick('h')")
                span(v-if="h !== 0")
                  | {{h}}
              el-col(:span="6" id="block" @click.native="selectBlockClick('i')")
                span(v-if="i !== 0")
                  | {{i}}
              el-col(:span="3")
                | &nbsp;
    el-col(:span="6")
      | &nbsp;
</template>

<script>
import _ from 'lodash';

export default {
  name: "MainGraph",
  data() {
    return {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      g: 0,
      h: 0,
      i: 0,
      human: "O",
      computer: "X",
      whosTrun: "O",
      finished: false,
      winer: "",
      blockList: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
      cornerList: ["a", "c", "g", "i"],
      freeBlock: 9,
    }
  },
  created(){
    //if start from compuer's trun
    if(this.whosTrun === this.computer){
      let pickOne = this.getNextMove(Object.assign({}, this));
      console.log(pickOne);
      this.selectBlock(pickOne);
    }
  },
  methods: {
    // only accept monue click with "O"
    selectBlockClick(index){
      if(this.whosTrun !== "X"){
        this.selectBlock(index);
      }
    },
    selectBlock(index){
      // if it's not a avaible click, block move
      if(this[index] === 0 && !this.finished){
        this[index] = this.whosTrun;
        // check winning & end game conditions
        this.finished = this.isWinner(Object.assign({}, this), this.whosTrun);
        this.freeBlock = this.freeBlock - 1;
        if(this.freeBlock == 0 && !this.finished){
          this.finished = true;
          this.winer = "no one win this game";
          return false;
        }

        // make next trun
        if(this.whosTrun === "X"){
          this.whosTrun = "O";
        } else {
          this.whosTrun = "X";
          // ai do next move
          let pickOne = this.getNextMove(Object.assign({}, this));
          this.selectBlock(pickOne);
        }

      }
    },
    checkWin(data, symbol){
      return _.uniq([data.a, data.b, data.c, symbol]).length === 1 ||
      _.uniq([data.d, data.e, data.f, symbol]).length === 1||
      _.uniq([data.g , data.h , data.i , symbol]).length === 1||
      _.uniq([data.a , data.d , data.g , symbol]).length === 1||
      _.uniq([data.b , data.e , data.h , symbol]).length === 1||
      _.uniq([data.c , data.f , data.i , symbol]).length === 1||
      _.uniq([data.a , data.e , data.i , symbol]).length === 1||
      _.uniq([data.c , data.e , data.g , symbol]).length === 1;
    },
    isWinner(data, symbol){
      if (this.checkWin(data, symbol)){
        this.$message({
          message: `${symbol} win`,
          type: 'success'
        });
        this.winer = (this.whosTrun == "X" ? "Computer" : "Human");
        return true;
      }
      return false;
    },
    getNextMove(data){
      let freeBlocks = _.filter(data.blockList, (d) => {
        return data[d] === 0;
      })
      let winMove = _.filter(freeBlocks, (d) => {
        let dataTmp = Object.assign({}, data);
        dataTmp[d] = "X";
        return this.checkWin(dataTmp, "X");
      })
      // if found next move can win this game, return this move
      if(winMove.length != 0){
        return winMove[0];
      } else {
        // if found next move human will win this game, return this move
        let blockMove = _.filter(freeBlocks, (d) => {
          let dataTmp = Object.assign({}, data);
          dataTmp[d] = "O";
          return this.checkWin(dataTmp, "O");
        })

        if(blockMove.length != 0){
          return blockMove[0];
        } else {
          //  pick center block first
          if(data.e === 0){
            return "e";
          }
          //  if center block all is selected, select corner
          let getCornerFreeList = _.filter(freeBlocks, (d) => {
            return _.includes(data.cornerList, d);
          })
          console.log(getCornerFreeList);
          if(getCornerFreeList.length != 0){
            console.log("getCornerFreeList");
            return this.getRandom(data, getCornerFreeList);
          }
          // if all center also selected, randomly pick one.
          return this.getRandom(data, freeBlocks);
        }
      }
    },
    getRandom(data, freeBlocks){
      if(freeBlocks.length == 1){
        return freeBlocks[0];
      }
      let randomnumber = Math.floor(Math.random() * (freeBlocks.length));
      console.log("randomnumber", randomnumber, freeBlocks.length);
      let answer = freeBlocks[randomnumber];
      console.log("value", data[freeBlocks[randomnumber]]);
      console.log("answer", answer);
      return answer;
    }
  },
}
</script>

<style type="text/scss">
#header-info {
  font-size: 15px;
  font-weight: 600;
}

#header-info .el-tag {
  position: relative;
  left: 10px;
}
#header-info i {
  position: relative;
  left: 12px;
}
.graph-contain {
  color: rgb(85, 67, 186);
  width: 50%;
  margin: 0 auto;
}
.graph-contain #block {
  border-color: black;
  border-style: groove;
  height: 100px;
  font-size: 3em;
  text-align: center;
  vertical-align: center;
  line-height: 100px;
}
</style>
