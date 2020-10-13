const scores = ['A', 'B', 'C', 'D', 'E']
const thresholds = [158, 268, 536, 1071] // car, plane, 2 planes, 4 planes

const getHint = gCo2PerMilePax => {
  if (gCo2PerMilePax < thresholds[0]) {
    return 'emits less than a car'
  } else if (gCo2PerMilePax < thresholds[1]) {
    return 'emits less than a plane'
  } else {
    const factor = Math.round(gCo2PerMilePax / thresholds[1] * 10) / 10
    return `emits like ${factor} planes`
  }
}

const getEcoscore = (gCo2PerMilePax) => {
  const scoreIdx1 = thresholds.findIndex(t => gCo2PerMilePax < t)
  const scoreIdx = scoreIdx1 >= 0 ? scoreIdx1 : 4
  const score = scores[scoreIdx]
  const hint = getHint(gCo2PerMilePax)
  return { score, hint }
}

module.exports = { getEcoscore }
