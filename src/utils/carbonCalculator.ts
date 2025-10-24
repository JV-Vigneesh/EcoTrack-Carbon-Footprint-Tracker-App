export interface CarbonResult {
  carbon_kg: number;
  points_earned: number;
}

// All factors updated to reflect typical Indian emissions and common modes/units.
// Transportation factors are in kg CO2e per km.
// Energy factor reflects the Indian grid (heavier reliance on coal).
// Food factors are adjusted for the Indian diet structure (less red meat, more dairy/rice).
const EMISSION_FACTORS = {
  transportation: {
    car: 0.192, // Petrol car: ~0.192 kg CO₂/km (India) [Source: inspanet.com]
    bus: 0.567, // Bus: ~0.567 kg CO₂/km (India study) [Source: wgbis.ces.iisc.ac.in]
    metro_train: 0.008, // Rail/metro passenger: ~0.008 kg CO₂/pax-km (India) [Source: indiaghgp.org]
    two_wheeler: 0.035, // Motorcycle/scooter: ~0.035 kg CO₂/km (India) [Source: researchgate.net]
    auto_rickshaw: 0.1135, // Three-wheeler petrol: ~0.1135 kg CO₂/km (India) [Source: researchgate.net]
    bike: 0, // Assumed zero tailpipe (manual bike)
    walk: 0, // Assumed zero (walking)
    electric_car: 0.096, // Electric car via grid: ~0.096 kg CO₂/km (India) [Calculated based on grid emission factor]
  },
  energy: {
    per_kwh: 0.82, // India grid: ~0.82 kg CO₂ per kWh [Source: inspanet.com]
  },
  food: {
    'dairy-meat-heavy': 3.3, // Non-veg heavier diet: ~3.3 kg CO₂e/day (India) [Source: pmc.ncbi.nlm.nih.gov]
    'poultry-moderate': 2.7, // Estimate for moderate meat/poultry diet
    'traditional-vegetarian': 2.0, // Vegetarian diet: ~2.0 kg CO₂e/day (India) [Source: pmc.ncbi.nlm.nih.gov]
    'plant-based-local': 1.5, // Estimate for mostly plant-based local diet
  },
};


// Transportation: points normalized to 100 max
export function calculateTransportationCarbon(mode: string, distance_km: number): CarbonResult {
  const factor = EMISSION_FACTORS.transportation[mode as keyof typeof EMISSION_FACTORS.transportation] || 0.21;
  const carbon_kg = distance_km * factor;

  let points = 0;
  const maxDistance = 20; // distance for max points
  switch (mode) {
    case 'walk':
    case 'bike':
      points = Math.min((distance_km / maxDistance) * 100 * 1.5, 100); // 50% bonus for best modes
      break;
    case 'bus':
    case 'metro_train':
    case 'auto_rickshaw':
      points = Math.min((distance_km / maxDistance) * 100 * 1.2, 100); // 20% bonus for public transport
      break;
    case 'electric_car':
      points = Math.min((distance_km / maxDistance) * 100 * 1.0, 100);
      break;
    default: // petrol car / two-wheeler
      points = Math.min((distance_km / maxDistance) * 100 * 0.5, 100); // reduced points
  }

  return { carbon_kg, points_earned: Math.round(points) };
}

// Energy: points normalized to 100 max
export function calculateEnergyCarbon(kwh: number): CarbonResult {
  const carbon_kg = kwh * EMISSION_FACTORS.energy.per_kwh;

  const maxEnergy = 200; // kWh for max points
  let points = Math.max(0, ((maxEnergy - kwh) / maxEnergy) * 100); // lower usage = higher points

  return { carbon_kg, points_earned: Math.round(points) };
}

// Food: points normalized to 100 max
export function calculateFoodCarbon(dietType: string): CarbonResult {
  const carbon_kg = EMISSION_FACTORS.food[dietType as keyof typeof EMISSION_FACTORS.food] || 3.2;

  let points = 0;
  switch (dietType) {
    case 'plant-based-local':
      points = 100;
      break;
    case 'traditional-vegetarian':
      points = 75;
      break;
    case 'poultry-moderate':
      points = 40;
      break;
    case 'dairy-meat-heavy':
      points = 0;
      break;
    default:
      points = 30;
  }

  return { carbon_kg, points_earned: points };
}

// Recommendations remain the same
export function getRecommendations(activities: any[], totalCarbon: number): string[] {
  const recommendations: string[] = [];

  const carbonByType: { [key: string]: number } = {
    transportation: 0,
    energy: 0,
    food: 0,
  };

  activities.forEach(activity => {
    carbonByType[activity.activity_type] += Number(activity.carbon_kg);
  });

  const hasHighEnergyUsage = activities.some(a => a.activity_type === 'energy' && a.energy_kwh > 150);
  const hasDairyMeatHeavyDiet = activities.some(a => a.activity_type === 'food' && a.diet_type === 'dairy-meat-heavy');
  const privateVehicleUsage = activities.filter(a => a.transportation_mode === 'car' || a.transportation_mode === 'two_wheeler').length;

  if (totalCarbon > 200) {
    recommendations.push('Your carbon footprint is quite high! Focus on reducing your top emission sources to make a significant impact.');
  } else if (totalCarbon > 100) {
    recommendations.push('You are making good progress! Consider adopting more eco-friendly habits to reduce your footprint further.');
  } else if (totalCarbon > 0) {
    recommendations.push('Great job! Your carbon footprint is relatively low. Keep up the sustainable practices!');
  }

  if (carbonByType.transportation > carbonByType.energy && carbonByType.transportation > carbonByType.food) {
    recommendations.push('Transportation is your biggest emission source. Consider using public transport, carpooling, or eco-friendly alternatives.');
  } else if (carbonByType.energy > carbonByType.transportation && carbonByType.energy > carbonByType.food) {
    recommendations.push('Energy consumption is your main concern. Try using energy-efficient appliances and reduce AC usage.');
  } else if (carbonByType.food > carbonByType.transportation && carbonByType.food > carbonByType.energy) {
    recommendations.push('Food-related emissions are your primary source. Consider adopting more plant-based meals.');
  }

  if (privateVehicleUsage > 3) {
    recommendations.push('For your commute, switch to the Metro, Bus, or shared auto to cut emissions and traffic congestion.');
  }

  if (privateVehicleUsage > 0) {
    recommendations.push('Try walking or cycling for short errands under 3 km to stay fit and eliminate emissions.');
  }

  if (hasHighEnergyUsage) {
    recommendations.push('Adjust your AC setting to 25°C or higher and use electronic fan regulators to save significant power.');
    recommendations.push('Unplug electronics like phone chargers, TVs, and set-top boxes when not in use to combat phantom load.');
  }

  if (hasDairyMeatHeavyDiet) {
    recommendations.push('Focus on reducing dairy (paneer, excess milk) and switch to traditional protein sources like Dal and Pulses.');
  }

  recommendations.push('Practice segregation of waste (wet and dry) at home for efficient composting and recycling.');
  recommendations.push('Support local street vendors and farmers by buying seasonal Indian produce to minimize transport footprint.');

  return recommendations.slice(0, 6);
}