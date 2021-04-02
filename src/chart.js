const stepGoalCompare = document.getElementById('stepGoalCompare')
const stepsCompare = document.getElementById('minsActiveCompare')
const minsActiveCompare = document.getElementById('stepsCompare')
const stairsClimbedCompare = document.getElementById('stairsClimbedCompare')


const allUserAvgNumSteps = repository.getAvgActivityInfo(activityData, 'numSteps', '2019/09/22')
const allUserAvgMinutesActive = repository.getAvgActivityInfo(activityData, 'minutesActive', '2019/09/22')
const allUserAvgFlightsOfStairs = repository.getAvgActivityInfo(activityData, 'flightsOfStairs', '2019/09/22')
const aUserNumSteps = displayUser.getLatestDayInfo(activityData, 'numSteps')
const aUserMinutesActive = displayUser.getLatestDayInfo(activityData, 'minutesActive')
const aUserFlightsOfStairs = displayUser.getLatestDayInfo(activityData, 'flightsOfStairs')

let stepGoalChart = new Chart(stepGoalCompare, {
  type: 'doughnut',
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Your Goal vs Avg User\'s Step Goal',
      fontSize: 30,
    }
  },
  data: {
    labels: ['Daily Step Goal', 'Users Avg Steps'],
    datasets: [
      {
        data: [displayUser.dailyStepGoal, repository.getAverageStep()],
        backgroundColor: ["rgba(75, 192, 192, 0.4)", ""],
        borderColor: "rgba(75, 192, 192, 1)",
        label: 'Steps'
      }
    ]
  }
})
let stepCompareChart = new Chart(stepsCompare, {
  type: 'bar',
  data: {
    labels: ["# of steps"],
    datasets: [
      {
        label: "All Users Activity",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        data: [allUserAvgNumSteps]
      },
      {
        label: "Your Activity",
        backgroundColor: "",
        data: [aUserNumSteps]
      }
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Your vs All Users Avg # of Steps Info',
      fontSize: 30,
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: '# of Steps',
          fontSize: 16,
        },
        ticks: {
          min: 0,
          stepSize: 1500
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Activity',
          fontSize: 16,
        }
      }]
    }  
  }
  
})
let activeMinsCompareChart = new Chart(minsActiveCompare, {
  type: 'bar',
  data: {
    labels: ["minutes active"],
    datasets: [
      {
        label: "All Users Activity",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        data: [allUserAvgMinutesActive]
      },
      {
        label: "Your Activity",
        backgroundColor: "",
        data: [aUserMinutesActive]
      }
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Your vs All Users Avg Minutes Active Info',
      fontSize: 30,
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Minutes Active',
          fontSize: 16,
        },
        ticks: {
          min: 0,
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Activity',
          fontSize: 16,
        }
      }]
    }  
  }
  
})
let stairsClimbedCompareChart = new Chart(stairsClimbedCompare, {
  type: 'bar',
  data: {
    labels: ["stairs climbed"],
    datasets: [
      {
        label: "All Users Stairs Climbed",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        data: [allUserAvgFlightsOfStairs]
      },
      {
        label: "Your Stairs Climbed",
        backgroundColor: "",
        data: [aUserFlightsOfStairs]
      }
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Your vs All Users Avg Stairs Climbed Info',
      fontSize: 30,
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'stairs climbed',
          fontSize: 16,
        },
        ticks: {
          min: 0
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Activity',
          fontSize: 16,
        }
      }]
    }  
  }
})