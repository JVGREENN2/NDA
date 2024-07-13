const clock = document.querySelector(".clock"),
  hourHand = document.querySelector(".hour-hand"),
  minuteHand = document.querySelector(".minute-hand"),
  secondHand = document.querySelector(".second-hand"),
  am = document.querySelector(".am"),
  pm = document.querySelector(".pm");

function initClock() {
  const numbers = clock.querySelector(".numbers");
  const lines = clock.querySelector(".lines");
  for (let i = 1; i <= 12; i++) {
    numbers.innerHTML += `<div class="number" style="--i:${i}"><span>${i}</span></div>`;
    lines.innerHTML += `<div class="line" style="--i:${i}"></div>`;
  }
  setInterval(setTime, 1000);}
initClock();
let alarmRinging = false;
function setTime() {
  const now = new Date();
  const today = now.getDay();

  const seconds = now.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 180;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const minutes = now.getMinutes();
  const minutesDegrees = (minutes / 60) * 360 + 180;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

  const hours = now.getHours();
  const hoursDegrees = (hours / 12) * 360 + 180;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

  if (hours >= 12) {
    am.classList.remove("active");
    pm.classList.add("active");
  } else {
    am.classList.add("active");
    pm.classList.remove("active");
  }

  //add trailing zero to minutes
  let minutesString = minutes.toString();
  if (minutesString.length < 2) {
    minutesString = "0" + minutesString;
  }
  //add trailing zero to hours
  let hoursString = hours.toString();
  if (hoursString.length < 2) {
    hoursString = "0" + hoursString;
  }
  alarms.forEach((alarm) => {
    let dayMatch = false;
    alarm.days.forEach((day) => {
      dayLetter = dayName(day);
      if (day === today) {
        dayMatch = true;
      }
    });

    if (
      alarm.time === `${hoursString}:${minutesString}` &&
      alarm.active &&
      dayMatch &&
      alarmRinging === false
    ) {
      ringAlarm();
    }
  });

  const tick = new Audio("tick.mp3");
  tick.play();
}

function ringAlarm() {
  alarmRinging = true;
  const audio = new Audio("alarm.mp3");
  audio.play();
  audio.addEventListener("ended", () => {
    alarmRinging = false;
  });
}

const alarms = [
  {
    id: 1,
    time: "13:19",
    name: "Wake up",
    days: [0, 1, 2, 3, 4, 5, 6],
    active: true,
  },
  {
    id: 2,
    time: "12:00",
    name: "Wake up",
    days: [1, 2, 3, 4, 5],
    active: true,
  },
  {
    id: 3,
    time: "12:00",
    name: "Wake up",
    days: [1, 2, 3, 4, 5],
    active: true,
  },
  {
    id: 4,
    time: "12:00",
    name: "Wake up",
    days: [1, 2, 3, 4, 5],
    active: false,
  },
  {
    id: 5,
    time: "12:00",
    name: "Wake up",
    days: [1, 2, 3, 4, 5],
    active: false,
  },
  {
    id: 6,
    time: "12:00",
    name: "Wake up",
    days: [1, 2, 3, 4, 5],
    active: false,
  },
];

const alarmList = document.querySelector(".alarms");

function initAlarms() {
  if (alarms.length) {
    alarms.forEach((alarm) => {
      const alarmElement = document.createElement("div");
      alarmElement.classList.add("alarm");
      alarmElement.dataset.id = alarm.id;
      let alarmDays = "";
      alarm.days.forEach((day) => {
        // conver day number to day name first letter
        dayLetter = dayName(day);
        alarmDays += `<div class="day">${dayLetter}</div>`;
      });
      active = alarm.active ? "checked" : "";
      alarmElement.innerHTML = `
                <div class="head">
            <div class="name">${alarm.name}</div>
          </div>
          <div class="body">
            <div class="left">
              <div class="time">${alarm.time}</div>
              <label class="toggle">
                <input type="checkbox" class="checkbox" hidden ${active} />
                <div class="track"></div>
                <div class="thumb"></div>
              </label>
            </div>
            <div class="days">
                ${alarmDays}
            </div>
          </div>
          <div class="delete">
            <img src="icons/delete.png" alt="" />
          </div>`;
      alarmList.appendChild(alarmElement);
    });
  } else {
    alarmList.innerHTML = `<div class="no-alarms">No alarms, Click on below + button to add one</div>`;
  }
}

initAlarms();

function dayName(day) {
  return ["M", "T", "W", "T", "F", "S", "S"][day];
}
const addAlarmBtn = document.querySelector("#add-alarm-btn"),
  addAlarmModal = document.querySelector("#add-alarm-modal"),
  hours = addAlarmModal.querySelector(".hour .number"),
  minutes = addAlarmModal.querySelector(".minute .number"),
  up = addAlarmModal.querySelectorAll(".up"),
  down = addAlarmModal.querySelectorAll(".down"),
  days = addAlarmModal.querySelectorAll(".day"),
  alarmNameInput = addAlarmModal.querySelector("#name");
addAlarmBtn.addEventListener("click", () => {
  addAlarmModal.classList.add("active");
});

addAlarmModal.querySelector(".close").addEventListener("click", () => {
  addAlarmModal.classList.remove("active");
});

addAlarmModal.querySelector(".cancel").addEventListener("click", () => {
  addAlarmModal.classList.remove("active");
});

up.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.parentElement;
    const input = parent.querySelector(".number");
    let value = parseInt(input.innerHTML);
    value++;
    if (parent.classList.contains("hour")) {
      if (value > 24) {
        value = 1;
      }
    }
    {
      if (parent.classList.contains("minute") && value > 59) {
        value = 0;
      }
    }

    if (value < 10) {
      value = `0${value}`;
    }

    input.innerHTML = value;
  });
});

down.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.parentElement;
    const input = parent.querySelector(".number");
    let value = parseInt(input.innerHTML);
    value--;
    if (parent.classList.contains("hour") && value < 1) {
      value = 24;
    }
    if (parent.classList.contains("minute") && value < 0) {
      value = 59;
    }
    if (value < 10) {
      value = `0${value}`;
    }
    input.innerHTML = value;
  });
});

days.forEach((day) => {
  day.addEventListener("click", () => {
    day.classList.toggle("active");
  });
});

addAlarmModal.querySelector(".save").addEventListener("click", () => {
  let alarmId = alarms.length + 1;
  let alarmName = alarmNameInput.value;
  const alarm = {
    id: alarmId,
    time: `${hours.innerHTML}:${minutes.innerHTML}`,
    name: alarmName,
    days: [],
    active: true,
  };

  days.forEach((day, index) => {
    if (day.classList.contains("active")) {
      alarm.days.push(index);
    }
  });

  alarms.unshift(alarm);
  addAlarmModal.classList.remove("active");
  alarmList.innerHTML = "";
  initAlarms();
});

alarmList.addEventListener("click", (e) => {
  if (e.target.classList.contains("checkbox")) {
    const alarmId =
      e.target.parentElement.parentElement.parentElement.parentElement.dataset
        .id;
    const alarm = alarms.find((alarm) => alarm.id == alarmId);
    alarm.active = !alarm.active;
  }
  console.log(e.target);
  if (e.target.classList.contains("delete")) {
    const alarmId = e.target.parentElement.dataset.id;
    const alarm = alarms.find((alarm) => alarm.id == alarmId);
    alarms.splice(alarms.indexOf(alarm), 1);
    alarmList.innerHTML = "";
    initAlarms();
  }
});
