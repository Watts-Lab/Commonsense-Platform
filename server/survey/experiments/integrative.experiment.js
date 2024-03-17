const { findExprimentCount } = require("./utils/find-count");
const {
  DesignPointRandomized,
} = require("../treatments/design-point.treatment");

const designPoints = [
  DesignPointRandomized({
    randomSeed: 13,
    numberOfStatements: 15,
    desingPointParams: {
      behavior: 1,
      everyday: 0,
      figure_of_speech: 0,
      judgment: 1,
      reasoning: 1,
      opinion: 1,
      category: "Health and fitness",
    },
  }),

  DesignPointRandomized({
    randomSeed: 13,
    numberOfStatements: 15,
    desingPointParams: {
      everyday: 0,
      behavior: 1,
      figure_of_speech: 0,
      judgment: 0,
      opinion: 1,
      reasoning: 1,
      category: "Health and fitness",
    },
  }),
];

const experiment = {
  name: "design-point",
  treatments: designPoints,
  treatmentSelector: findExprimentCount,
};

module.exports = experiment;
