const experiments = require("../survey/experiments");
const {
  createExperiment,
  updateExperiment,
} = require("../survey/experiments/utils/save-experiment");
const {
  saveIndividualDB,
} = require("../survey/experiments/utils/save-individual");
const {
  FindLeastFrequentExperiment,
} = require("../survey/experiments/utils/reverse-weight-selector");
const {
  GetStatementsWeighted,
} = require("../survey/treatments/weighted-random.treatment");
const { body, query, validationResult } = require("express-validator");

const { stringy } = require("../survey/treatments/utils/id-generator");

const returnStatements = async (req, res) => {
  const language = req.query.language || "en"; // default to English if no language is provided

  // Check for validation errors in the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Filter out invalid treatments
  const valid_experiments = experiments
    .flatMap((experiment) =>
      experiment.treatments.map((treatment) => {
        return {
          experiment_name: experiment.experimentName,
          experiment_assigner: experiment.treatmentAssigner,
          validity: () => true,
          ...treatment,
        };
      })
    )
    .filter((treatment) => {
      return treatment.validity({ ...req }, treatment.params);
    });

  // Group valid experiments by experiment name and treatment
  const grouped_experiments = valid_experiments.reduce((acc, experiment) => {
    if (!acc[experiment.experiment_name]) {
      acc[experiment.experiment_name] = {
        experiment_assigner: experiment.experiment_assigner,
        experiment_valid_treatments: [],
      };
    }
    acc[experiment.experiment_name].experiment_valid_treatments.push(
      experiment
    );
    return acc;
  }, {});

  // Ensure async operations are handled correctly
  for (const experiment_name of Object.keys(grouped_experiments)) {
    const experiment = grouped_experiments[experiment_name];
    const assigned_treatment = await experiment.experiment_assigner(
      experiment.experiment_valid_treatments
    );

    // If a treatment was assigned, add it to the experiment
    if (assigned_treatment) {
      // Assign the treatment to the experiment
      grouped_experiments[experiment_name].assigned_treatment =
        assigned_treatment;
    } else {
      // Remove the experiment if no treatment was assigned
      delete grouped_experiments[experiment_name];
    }
  }

  let random_experiment = {};

  // if grouped_experiments is empty, asign a default treatment
  if (Object.keys(grouped_experiments).length === 0) {
    random_experiment = {
      assigned_treatment: {
        experiment_name: "default",
        params: {
          sessionId: req.query.sessionId,
          validStatementList: [],
          numberOfStatements: 15,
        },
        function: GetStatementsWeighted,
        validity: (req, params) => {
          return true;
        },
      },
    };
  } else {
    // Select a random experiment from grouped_experiments
    const experiment_names = Object.keys(grouped_experiments);
    const random_experiment_name =
      experiment_names[Math.floor(Math.random() * experiment_names.length)];
    random_experiment = grouped_experiments[random_experiment_name];
  }

  const result = await random_experiment.assigned_treatment.function({
    ...random_experiment.assigned_treatment.params,
    language,
  });

  const user_session_id = req.query.sessionId;
  // Remove sessionId from req.query
  delete req.query.sessionId;

  const experimentData = {
    userSessionId: user_session_id,
    experimentId: stringy(random_experiment.assigned_treatment.params),
    experimentType: random_experiment.assigned_treatment.experiment_name,
    experimentInfo: random_experiment.assigned_treatment,
    statementList: result.answer,
    urlParams: stringy(req.query) ? stringy(req.query) : null,
    finished: false,
  };

  const experiment = await createExperiment(experimentData);

  res.json({ statements: result.answer, experimentId: experiment.id });
};

const saveIndividual = async (req, res) => {
  const individualData = {
    userSessionId: req.body.sessionId,
    informationType: req.body.informationType,
    experimentInfo: req.body.experimentInfo,
    urlParams: req.query.source ? req.query.source : null,
    finished: true,
  };

  saveIndividualDB(individualData)
    .then((newIndividual) => {
      console.log("Individual saved:", newIndividual.id);
    })
    .catch((error) => {
      console.error("Error saving individual:", error);
    });

  res.json({ ok: true });
};

const saveExperiment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const experimentId = req.body.experimentId;

  await updateExperiment(experimentId, { finished: true })
    .then((updatedExperiment) => {
      console.log("Experiment saved:", updatedExperiment);
    })
    .catch((error) => {
      console.error("Error saving experiment:", error);
    });

  res.json({ ok: true });
};

module.exports = {
  returnStatements,
  saveIndividual,
  saveExperiment,
};
