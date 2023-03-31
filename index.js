function createEmployeeRecord(record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(records) {
  return records.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find((event) => event.date === date);
  let timeOut = employee.timeOutEvents.find((event) => event.date === date);
  let hours = (timeOut.hour - timeIn.hour) / 100;
  return parseInt(hours, 10);
}

function wagesEarnedOnDate(employee, date) {
  let hours = hoursWorkedOnDate(employee, date);
  let payOwed = hours * employee.payPerHour;
  return payOwed;
}

function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map(event => event.date);
    let allPayOwed = datesWorked.reduce((acc,date)=>{
        let wages = wagesEarnedOnDate(employee,date);
        return acc + wages;
    },0);
    return parseInt(allPayOwed,10);
}

function calculatePayroll(employees){
    let totalWages = employees.reduce((acc, employee) => acc + allWagesFor(employee), 0);
    return totalWages;  
}
