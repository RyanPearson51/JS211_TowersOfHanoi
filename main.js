'use strict';

const assert = require('assert');
const readline = require('readline');
const { start } = require('repl');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
/*this function is printing the current board to the console.
At the beginning of the came the output would look like:
a: 4, 3, 2, 1
b:
c:
if you moved piece 1 to stack c the output would then look like:
a: 4, 3, 2
b:
c: 1
*/
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
/*after it has been determined a move is legal, this function should move a token
off the end of startStack to the end of endStack (from one tower to another)
*/
const movePiece = (startStack, endStack) => {
  // Your code here
  //this function should move the last token of startStack to become the new last token of endStack
  //later in the code this function will only run if it is a legal move
  stacks[endStack].push(stacks[startStack].pop());
}

//this is a new function i created to prevent the code from crashing in the terminal if you enter an input that isnt allowed as the start or end stack
const preventCrash = (startStack, endStack) => {
  if (startStack === "a" && (endStack === "b" || endStack === "c")){
    return true;
  }
  else if (startStack === "b" && (endStack === "a" || endStack === "c")){
    return true;
  }
  else if (startStack === "c" && (endStack === "a" || endStack === "b")){
    return true;
  }
  else{
    return false;
  }
}
// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
/*this function should check that the desired move of a token is legal
if the token is moving from one stack to another the new stack must be empty or 
contain only a token with a higher value(bigger token). if those criteria are all met
the move is legal, otherwise a message should appear telling the user their desired move
is not allowed
 */
const isLegal = (startStack, endStack) => {
  // Your code here
  if (preventCrash(startStack, endStack)){
  //new variables for last token in startStack(the one that will be moving)
  //and last token in endStack(the one that the token will be moving to, might be empty)  
  let movingToken = stacks[startStack][stacks[startStack].length-1];
  let newTowerToken = stacks[endStack][stacks[endStack].length -1];

  
  //startStackTower is an array that holds the possible values of where the token will be moving from
  // this for loop will return true if the movingToken is smaller than the token at the new tower
  //or if the new tower is empty.  Otherwise it will return false and isLegal will not be true
    if (movingToken < newTowerToken || stacks[endStack].length === 0){
      console.log('legal move');
      return true;
    }
    else{
      console.log('illegal move');
      return false;
    }
  
}
}

// What is a win in Towers of Hanoi? When should this function run?
/* a win is when the blocks are stacked [4,3,2,1] on a different tower than the original.
With 4 tokens the minimum amount of moves to win is 15, so once the user hits move 15, it should run after every move
While unnecessary, it wouldn't hurt the code to run after every move from the beginning
 */
const checkForWin = () => {
  // Your code here
  //if stack b or stack c is equal to the win condition, then checkForWin will be true
  //can't compare two arrays, must convert them to strings like we did in class.
  //because there is only 4 numbers we dont have to worry about the possibility of a misread, the correct outcome of 4,3,2,1 (4321) can only come up one way
  if(stacks.b.toString() == [4, 3, 2, 1].toString() || stacks.c.toString() == [4, 3, 2, 1].toString()){
    return true;
  }
  else{
    return false;
  }
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
    checkForWin();
  }
  else{
    console.log ('not a legal move');
  }
  if (checkForWin()) {
    console.log('congratulations! you won!');
    console.log(stacks);
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}


/*
startStack = startStack.trim().toLowerCase();
  endStack = endStack.trim().toLowerCase();
  let legalMove = isLegal(startStack, endStack);
  if(legalMove = true){
    movePiece(startStack, endStack)
    console.log(legalMove);
  }
    else {
      console.log('ILLEGAL MOVE');
    }
  if (checkForWin()) {
    
        console.log("You WIN!!!");
        console.log(stacks);
        stacks = {
          a: [4, 3, 2, 1],
          b: [],
          c: []
        };
      }
      else{
        console.log(stacks);
        console.log(legalMove);
      }
 */