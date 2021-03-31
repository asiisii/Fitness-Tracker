const stepGoalCompare = document.getElementById('stepGoalCompare');
// const hydration = document.getElementById('hydrationChart');

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
        // fill: false,
        data: [displayUser.dailyStepGoal, repository.getAverageStep()],
        backgroundColor: ["rgba(75, 192, 192, 0.4)", ""],
        borderColor: "rgba(75, 192, 192, 1)",
        label: 'Steps'
      }
    ]
  }
})
// let hydrationChart = new Chart(hydration, {
//   type: 'line',
//   options: {
//     responsive: true,
//     title: {
//       display: true,
//       text: 'Hydration Data',
//       fontSize: 30,
//     },
//     scales: {
//       yAxes: [{
//         scaleLabel: {
//           display: true,
//           labelString: 'Ounces',
//           fontSize: 16,
//         }
//       }],
//       xAxes: [{
//         scaleLabel: {
//           display: true,
//           labelString: 'Days of the Week',
//           fontSize: 16,
//         }
//       }]
//     }, 
//   },
//   data: {
//     labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
//     datasets: [
//       {
//         label: "Ounches per week",
//         fill: false,
//         backgroundColor: "rgba(75, 192, 192, 0.4)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         data: [40, 50, 35, 41, 55, 40, 40],
//       }
//     ],
//   },
  
// })