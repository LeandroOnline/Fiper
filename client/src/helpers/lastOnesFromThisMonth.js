export default function lastOnesFromThisMonth(arr) {
  let lastLoss = 0;
  let lastProfit = 0;
  let lastOne = 0;
  let currentMonth = new Date().getMonth();

  for (let i = arr.length - 1; i >= 0; i--) {
    let takeDate = new Date(arr[i].date);
    let takeMonth = takeDate.getMonth();

    if (currentMonth === takeMonth) {
      if (lastOne === 0) lastOne = arr[i].input;
      if (lastLoss === 0) {
        if (arr[i].input < 0) {
          lastLoss = arr[i].input;
        }
      } else {
        break;
      }
    } else {
      break;
    }
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    let takeDate = new Date(arr[i].date);
    let takeMonth = takeDate.getMonth();
    if (currentMonth === takeMonth) {
      if (lastProfit === 0) {
        if (arr[i].input > 0) {
          lastProfit = arr[i].input;
        }
      } else {
        break;
      }
    } else {
      break;
    }
  }

  return { lastProfit, lastLoss, lastOne };
}
