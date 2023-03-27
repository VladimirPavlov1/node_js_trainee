console.log("hello world")

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout, 
});
 


const fs = require('fs').promises;
const { program } = require('commander');


require('colors');


program.option(
    '-f, --file [type]',
    'file for saving game results',
    'result.txt'
)
program.parse(process.argv);

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

const isValid = value => {
    if (isNaN(value)) {
      console.log('Введіть число!'.red);
      return false;
    }
    if (value < 1 || value > 10) {
      console.log('Число має бути в діапазоні від 1 до 10'.red);
      return false;
    }
    return true;
  };

  

  
  const log = async data =>{
    try {
       await fs.appendFile(logFile,`${data}\n`);
       console.log(`Вдалося зберегти результат у файл ${logFile}`.green); 
    } catch (error) {
        console.log(`Не вдалося зберегти файл ${logFile}`.red); 
    }
  }
  

  const game = () => {
    rl.question(
      'Введіть число від 1 до 10, щоб вгадати задумане: '.yellow,
      value => {
        let a = +value;
        if (!isValid(a)) {
          game();
          return;
        }
        count += 1;
        if (a === mind) {
          console.log('Вітаю Ви вгадали число за %d крок(ів)'.green, count);
          log(
            `${new Date().toLocaleDateString()}: Вітаю Ви вгадали число за ${count} крок(ів)`,
          ).finally(() => rl.close());
          return;
        }
        console.log('Ви не вгадали ще спроба'.red);
        game();
      },
    );
  };
  
  game();