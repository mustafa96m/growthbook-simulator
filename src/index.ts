import { GrowthBook, Experiment } from "@growthbook/growthbook";

let users = [
  1570958971,
  1574950855,
  1523110046,
  1578058447,
  1572673794,
  1581413702,
  1633459482,
  1516278576,
  1590697854,
  1592198889,
  1594150506,
  1562755658,
  1506183430,
  1573814123,
  1150605769,
  1585932326,
  1582897150,
  1610446924,
  1614084190,
  1610138914,
  1624097243,
  1617798327,
  1617119473,
  1618478937,
  1620499755,
  1458669633,
  1621630498,
  1623997595,
  1622383168,
  1622228743,
  1619190142,
  1646577038,
  1624108415,
  1622069340,
  1621891516,
  1494393462,
  1625764494,
  1476269485,
  1627974324,
  1637955013,
  1635777502,
  1631214900,
  1625555259,
  1631385934,
  1588069076,
  1633224076,
  1637876656,
  1631095490,
  1637787065,
  1631997112,
  1626736016,
  1630240264,
  1626807986,
  1635344130,
  1606432253,
  1632824426,
  1586486092,
  1635340506,
  1634810087,
  1634574254,
  1634892052,
  1570967728,
  1637854105,
  1637850820,
  1642532937,
  1589245420,
  1640856328,
  1585998643,
  1582627932,
  1639137490,
  1640535900,
  1553336024,
  1641779165,
  1641411069,
  1645546144,
  1646063413,
  1644401610,
  1643877440,
  1646170901,
  1647705275,
  1647161572,
  1647347843,
  1637873563,
  1637873440,
  1646127564,
  1647508167,
  1593112752,
  1645053594,
  1587295249,
  1567592290,
  1597353463,
  1637868028,
  1612588045,
  1509046686,
  1650880160,
  1654785597,
  1606137681,
  1650839092,
  1636754934,
  1445367280
];

let userObjects = {
  1572673794: {
    name: "Mustafa"
  },
  1634574254: {
    name: "Charlo"
  },
  1637868028: {
    name: "GT"
  },
  1593112752: {
    name: "Taqi"
  }
};
let NUM_SAMPLES = users.length;
const ROLLOUT_PERCENT = 10;

console.log("Running a force vs exp check for GrowthBook's SDK");
console.log(
  `Code simulates assigning two rules, forced to ${ROLLOUT_PERCENT}% of ${NUM_SAMPLES} users, experiment for the rest`
);
console.log("and shows the results into forced or experiments");

// Create a GrowthBook context
const growthbook = new GrowthBook({
  trackingCallback: (experiment, result) => {
    //console.log("not used in this example");
  },

  features: {}
});

let countInExperiment = 0;
let dist = {};

for (let i = 0; i < users.length; i++) {
  // change the user ID to simulate being a new user:
  const userId = users[i];
  growthbook.setAttributes({ user_id: userId });
  let exp = growthbook.run({
    key: "exp_19g61nllz1g88z",
    hashAttribute: "user_id",
    variations: ["var_llz1bjdr", "var_llz1bjds"],
    coverage: 1,
    weights: [0.5, 0.5]
  });

  dist[exp.key] = (dist[exp.key] || 0) + 1;
  countInExperiment += exp.inExperiment ? 1 : 0;
  if (userObjects[userId]) {
    console.log(userObjects[userId], exp.key, exp.value, exp.variationId);
  }
}

console.log("-----Results----");
console.log("Total users: ", NUM_SAMPLES);
console.log(dist);

console.log(
  "Experiment Participant: ",
  countInExperiment,
  "(" + Math.round((countInExperiment / NUM_SAMPLES) * 10000) / 100 + "%)"
);
