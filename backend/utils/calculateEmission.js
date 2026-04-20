const factors = {
  electricity: 0.82,   // kg CO2 per kWh
  diesel: 2.68,        // kg CO2 per liter
  coal: 2.5,           // kg CO2 per kg
  transport: 0.21      // kg CO2 per km
};

function calculateEmission(data) {
  const total =
    (data.electricity || 0) * factors.electricity +
    (data.diesel || 0) * factors.diesel +
    (data.coal || 0) * factors.coal +
    (data.transport || 0) * factors.transport;

  return total;
}

module.exports = calculateEmission;