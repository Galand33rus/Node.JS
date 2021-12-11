'use strict';

// const colors = require("colors/safe");
// const process = require("process");
import colors from "colors/safe.js"
import * as process from "process";


const log = console.log;
const [start, end] = process.argv.slice(2);


/**
 * получает массив чисел из заданного диапазона
 * @param {number} start начальное значение диапазона
 * @param {number} end конечное значение диапазона
 */
const getArrayOfNumbers = (start, end) => {
  if (isNaN(start) || isNaN(end)) {
    log('Вы ввели не число');
  } else if (start >= end || start <= 0) {
    log('Не верный диапазон чисел');
  } else {
    const arrayOfNumbers = [];
    const arrayLength = end - start;
    for (let i = 0; i <= arrayLength; i++) {
      arrayOfNumbers.push(start);
      start++;
    }
    getArrayOfPrimeNumbers(arrayOfNumbers);
  }
};


/**
 * перебирает массив чисел и получает массив простых чисел
 * @param {Array<number>} array массив чисел
 */
const getArrayOfPrimeNumbers = (array) => {
  const arrayOfPrimeNumbers = [];
  let isPrime = true;
  array.forEach((element) => {
    for (let i = 2; i < element; i++) {
      if (element % i === 0) {
        isPrime = false;
        break;
      } else {
        isPrime = true;
      }
    }
    if (isPrime && element > 1) { // 1 не простое число, поэтому исключаем
      arrayOfPrimeNumbers.push(element);
    }
  });
  colorSelection(arrayOfPrimeNumbers);
};


/**
 * раскрашивает числа из массива
 * @param {Array} array массив
 */
const colorSelection = (array) => {
  if (array.length === 0) {
    log('В диапазоне нет простых чисел'.red);
  } else {
    log(colors.rainbow(`Простые числа в диапазоне от ${start} до ${end}`));
    for (let i = 0; i < array.length; i += 3) {
      log(colors.green(array[i]));
      if (array[i + 1] !== undefined) {
        log(colors.yellow(array[i + 1]));
      }
      if (array[i + 2] !== undefined) {
        log(colors.red(array[i + 2]));
      }
    }
  }
};


getArrayOfNumbers(+start, +end);
