'use strict';

import process from "process";
import EventEmitter from "events";
import {intervalToDuration, formatDuration, isEqual, isPast} from "date-fns";


const log = console.log;
const emitter = new EventEmitter();


/**
 * возвращает дату из аргумента, полученного на входе
 * @param {string} date
 * @returns {Date}
 */
const getUserDate = (date) => {
  const [year, month, day, hours, minutes, seconds] = date.split("-");
  return new Date(+year, +month - 1, +day, +hours, +minutes, +seconds, 0)//месяцы от 0 до 11, поэтому -1, и 0 миллисекунд
};


/**
 * высчитывает разницу между текущей (end) и полученной (start) датой и возвращает удобочитаемую строку
 * @param {Date} date
 */
const timeDifference = (date) => {
  const interval = formatDuration(intervalToDuration({
    start: new Date(date),
    end: new Date()
  }));
  return log(interval);
};


/**
 * сравнивает текущую и полученную даты, если отличается, выводит разницу
 */
const timer = () => {

  const currentTime = new Date();
  currentTime.setMilliseconds(0);// обнулил миллисекунды, чтобы было проще сравнивать даты
  const deadline = new Date(currentTime);

  if (isEqual(new Date(deadline), new Date(userDate))) {
    log("Ding! Ding!");
    emitter.removeListener('timer', timer);
    process.exit(1);
  } else {
    console.clear();
    timeDifference(userDate);
  }
};


emitter.on("timer", timer);


const userDate = getUserDate(process.argv[2]);// год-месяц-день-часы-минуты-секунды


if (isPast(userDate)) {//минимальная валидация
  log('Вы ввели дату из прошлого');
} else {
  setInterval(() => {
    emitter.emit("timer");
  }, 1000);
}





