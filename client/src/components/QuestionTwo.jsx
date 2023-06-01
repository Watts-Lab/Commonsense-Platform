import React, { useEffect, useState } from "react";
import Option from "./Option";
import Tooltip from "./Tooltip";

import "./style.css";

function QuestionTwo(props) {
  const questionIdentifier = props.statementId + "question2";

  function onChangeAgreement(event) {
    props.setQuestionTwoAgree(event.target.value);
  }

  function onChangeOpinion(event) {
    props.setQuestionTwoOpinion(event.target.value);
  }

  return (
    <>
      <div className="p-3" onChange={onChangeAgreement}>
        <div className="flex flex-row justify-between">
          <h4 className="font-bold">
            Do you think most other people would agree with this statement? *
          </h4>
          <Tooltip
            className="order-last"
            text="This question seeks to gather insights on the perceived consensus among individuals regarding the given statement. We are interested in understanding your opinion about whether you believe that the majority of other people would agree with the statement presented."
          />
        </div>

        <p className="text-gray-600">
          (if the answer depends, respond with your most common or most likely
          answer)
        </p>

        <ul className="grid w-full gap-2 md:grid-cols-1 py-2">
          <Option
            text="Yes"
            id_v={questionIdentifier + "ag1"}
            statementClass={questionIdentifier + "agree"}
            checked={props.questionTwoAgree === questionIdentifier + "ag1"}
            required={true}
          />
          <Option
            text="No"
            id_v={questionIdentifier + "ag0"}
            statementClass={questionIdentifier + "agree"}
            checked={props.questionTwoAgree === questionIdentifier + "ag0"}
            required={true}
          />
        </ul>
      </div>

      <div className="p-3" onChange={onChangeOpinion}>
        <div className="flex flex-row justify-between">
          <h4>
            Why did you answer the way you did about most <b>other people?</b> *
          </h4>
          <Tooltip
            className="order-last"
            text="This question aims to explore the reasoning behind your response regarding the perceived agreement of most other people with the given statement. We are interested in understanding the factors that influenced your decision and your perspective on how others might interpret or respond to the statement."
          />
        </div>

        <ul className="grid w-full gap-2 md:grid-cols-1 py-2">
          <Option
            text="I think most people have good judgement with regard to this topic"
            id_v={questionIdentifier + "op0"}
            statementClass={questionIdentifier + "opinion"}
            checked={props.questionTwoOpinion === questionIdentifier + "op0"}
            required={true}
          />
          <Option
            text="I think most people lack good judgment with regard to this topic"
            id_v={questionIdentifier + "op1"}
            statementClass={questionIdentifier + "opinion"}
            checked={props.questionTwoOpinion === questionIdentifier + "op1"}
            required={true}
          />
          <Option
            text="I think it's mostly a matter of opinion"
            id_v={questionIdentifier + "op2"}
            statementClass={questionIdentifier + "opinion"}
            checked={props.questionTwoOpinion === questionIdentifier + "op2"}
            required={true}
          />
          <Option
            text="I don't know"
            id_v={questionIdentifier + "op3"}
            statementClass={questionIdentifier + "opinion"}
            checked={props.questionTwoOpinion === questionIdentifier + "op3"}
            required={true}
          />
        </ul>
      </div>
    </>
  );
}

export default QuestionTwo;
