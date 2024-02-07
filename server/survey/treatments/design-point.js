const { statements, statementproperties } = require("../../models");

const { Sequelize, QueryTypes } = require("sequelize");
const Op = Sequelize.Op;

// Assuming this function doesn't use 'this', which arrow functions don't bind
const DesignPointRandomized = ({ randomSeed, desingPointParams }) => {
  const designSpace = getDesignSpace(desingPointParams);
  console.log(designSpace);
  return designSpace;
};

/**
 * Retrieves the design space based on the provided parameters.
 *
 * @param {Object} params - The parameters for filtering the design space.
 * @param {Object} params.conditions - The conditions for filtering the design space.
 * @param {string} params.conditions.behavior - The behavior condition.
 * @param {string} params.conditions.everyday - The everyday condition.
 * @param {string} params.conditions.figure_of_speech - The figure of speech condition.
 * @param {string} params.conditions.judgment - The judgment condition.
 * @param {string} params.conditions.opinion - The opinion condition.
 * @param {string} params.conditions.reasoning - The reasoning condition.
 * @returns {Array} - An array of filtered statement IDs and their corresponding statements.
 */
const getDesignSpace = async (params) => {
  // creates a pivot table of statement properties
  const statementsPivot = await statementproperties.findAll({
    attributes: [
      "statementId",
      [
        Sequelize.literal(
          "MAX(CASE WHEN statementproperties.name = 'behavior' THEN statementproperties.available END)"
        ),
        "behavior",
      ],
      [
        Sequelize.literal(
          "MAX(CASE WHEN statementproperties.name = 'everyday' THEN statementproperties.available END)"
        ),
        "everyday",
      ],
      [
        Sequelize.literal(
          "MAX(CASE WHEN statementproperties.name = 'figure_of_speech' THEN statementproperties.available END)"
        ),
        "figure_of_speech",
      ],
      [
        Sequelize.literal(
          "MAX(CASE WHEN statementproperties.name = 'judgment' THEN statementproperties.available END)"
        ),
        "judgment",
      ],
      [
        Sequelize.literal(
          "MAX(CASE WHEN statementproperties.name = 'opinion' THEN statementproperties.available END)"
        ),
        "opinion",
      ],
      [
        Sequelize.literal(
          "MAX(CASE WHEN statementproperties.name = 'reasoning' THEN statementproperties.available END)"
        ),
        "reasoning",
      ],
      [Sequelize.col("statement.statement"), "statement"],
      [Sequelize.col("statement.published"), "published"],
    ],
    group: ["statementId"],
    raw: true,
    include: [
      {
        model: statements,
        attributes: [],
        where: {
          published: true,
        },
      },
    ],
    logging: console.log,
  }); // filters the pivot table by the params

  console.log(statementsPivot[0]);
  const filteredStatementIds = statementsPivot
    .filter((data) => {
      return (
        data.behavior === params.conditions.behavior &&
        data.everyday === params.conditions.everyday &&
        data.figure_of_speech === params.conditions.figure_of_speech &&
        data.judgment === params.conditions.judgment &&
        data.opinion === params.conditions.opinion &&
        data.reasoning === params.conditions.reasoning
      );
    })
    .map((data) => {
      return { id: data.statementId, statement: data.statement };
    });

  return filteredStatementIds;
};

module.exports = {
  DesignPointRandomized,
};
