const LIMIT = 5000;

function calculateCredits(totalEmission) {
  if (totalEmission < LIMIT) {
    return {
      status: "earned",
      credits: LIMIT - totalEmission
    };
  } else {
    return {
      status: "need_to_buy",
      credits: totalEmission - LIMIT
    };
  }
}

module.exports = calculateCredits;