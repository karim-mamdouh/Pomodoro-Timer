(() => {
  //Time class
  class Time {
    hours;
    minutes;
    seconds;
    //Sets variables to zero
    time() {
      this.hours = this.minutes = this.seconds = 0;
    }
    //Check value of seconds and updates minutes accordingly
    getSeconds() {
      if (this.seconds > 59) {
        this.seconds = 0;
        this.minutes++;
      }
      return this.seconds;
    }
    //Check value of minutes and updates hours accordingly
    getMinutes() {
      if (this.minutes > 59) {
        this.minutes = 0;
        this.hours++;
      }
      return this.minutes;
    }
    //Resets timer
    reset() {
      this.hours = 0;
      this.seconds = 0;
      this.minutes = 0;
    }
  }

  let currentWorkTime = new Time(); //Work timer object
  let currentBreakTime = new Time(); //Break timer object
  let workTimerFlag = false; //Active work timer flag
  let breakTimerFlag = false; //Active break timer flag
  let workStarted = false; //Flag active when work timer starts first time
  //Set interval method, updates UI every one second
  const workInterval = () => {
    if (workStarted && workTimerFlag) {
      currentWorkTime.seconds++;
      let seconds = currentWorkTime.getSeconds();
      let minutes = currentWorkTime.getMinutes();
      document.getElementById("workTime").innerHTML = `${currentWorkTime.hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  };
  //Set interval method, updates UI every one second
  const breakInterval = () => {
    if (workStarted && breakTimerFlag) {
      currentBreakTime.seconds++;
      let seconds = currentBreakTime.getSeconds();
      let minutes = currentBreakTime.getMinutes();
      document.getElementById("breakTime").innerHTML = `${currentBreakTime.hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  };
  //Start work button click event method
  const startWorkEvent = () => {
    if (!workStarted) {
      workStarted = true;
      currentWorkTime.reset();
      currentBreakTime.reset();
      workTimerFlag = true;
      breakTimerFlag = false;
    }
  };
  //Start work break click event method
  const startBreakEvent = () => {
    if (!breakTimerFlag) {
      workTimerFlag = false;
      breakTimerFlag = true;
    }
  };
  //Rersume work button click event method
  const resumeWorkEvent = () => {
    if (workStarted && breakTimerFlag) {
      workTimerFlag = true;
      breakTimerFlag = false;
    }
  };
  //End work button click event method
  const endWorkEvent = () => {
    workStarted = false;
    workTimerFlag = false;
    breakTimerFlag = false;
    document.getElementById("workTime").innerText = "00:00:00";
    document.getElementById("breakTime").innerText = "00:00:00";

    currentWorkTime.reset();
    currentBreakTime.reset();
  };

  let workTimer = setInterval(workInterval, 1000);

  let breakTimer = setInterval(breakInterval, 1000);

  document
    .getElementById("startWork")
    .addEventListener("click", startWorkEvent);

  document
    .getElementById("startBreak")
    .addEventListener("click", startBreakEvent);

  document
    .getElementById("resumeWork")
    .addEventListener("click", resumeWorkEvent);

  document.getElementById("endWork").addEventListener("click", endWorkEvent);
})();
