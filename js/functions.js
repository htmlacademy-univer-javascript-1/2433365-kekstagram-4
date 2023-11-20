function getValid(arr) {
  for (let i = 0; i<arr.length;i++) {
    if (arr[i].length===2 && arr[i][0]==='0') {
      arr[i][0]='';
    }
  }
  return arr;
}

function getData(origin){
  let data = origin.split(':');
  data = getValid(data);
  return data;
}

// Функция проверяет, влезет ли встреча в рабочий день
function workDayFit(workdayStart, workdayEnd, meetingStart, meetingDuration) {
  const workStart = getData(workdayStart);
  const meetingStarts = getData(meetingStart);
  const workEnd = getData(workdayEnd);

  const meeting = meetingStarts;

  // Если начало работы меньше или равно началу встречи
  if (workStart[0]<=meetingStart[0] && workStart[1]<=meetingStart[1]) {
    // Увеличиваем минуты встречи до полных часов
    while (meetingDuration>=60){
      meeting[0]++;
      meetingDuration-=60;
    }
    // Если есть остаток минут, добавляем их к минутам встречи
    if(meetingDuration!==0) {
      meeting[1]+=meetingDuration;
    }

    // Если минуты встречи превышают полный час, увеличиваем часы встречи
    if (meeting[1]>=60) {
      meeting[0]++;
      meeting[1]-=60;
    }

    // Возвращаем true, если встреча влезет в рабочий день, иначе false
    return meeting<=workEnd;
  } else {
    return false;
  }
}

workDayFit('08:00', '17:30', '14:00', 90);
