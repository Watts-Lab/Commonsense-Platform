import React, { useEffect, useState } from "react";
import Option from "./Option";

import "./style.css";

function QuestionOne(props) {
  const questionIdentifier = props.statementId + "question1";

  function onChangeAgreement(event) {
    props.setQuestionOneAgree(event.target.value);
  }

  function onChangeOpinion(event) {
    props.setQuestionOneOpinion(event.target.value);
  }

  // const errorStyle = ""
  const errorStyle = "p-3 rounded-md border-2 border-rose-600";

  return (
    <>
      <div className={props.unansweredQuestionIndex === 0 ? errorStyle : "p-3"} onChange={onChangeAgreement}>
        <h4 className="font-bold">Do you agree with this statement?</h4>
        <p className="text-gray-600">
          (if the answer depends, respond with your most common or most likely
          answer)
        </p>

        <ul className="grid w-full gap-2 md:grid-cols-1 py-2">
          <Option
            text="Yes"
            id_v={questionIdentifier + "ag1"}
            statementClass={questionIdentifier + "agree"}
            checked={props.questionOneAgree === questionIdentifier + "ag1"}
            required={true}
          />
          <Option
            text="No"
            id_v={questionIdentifier + "ag0"}
            statementClass={questionIdentifier + "agree"}
            checked={props.questionOneAgree === questionIdentifier + "ag0"}
            required={true}
          />
        </ul>
      </div>

      <div className={props.unansweredQuestionIndex === 1 ? errorStyle : "p-3"} onChange={onChangeOpinion}>
        <h4>
          Why did you answer the way you did about <b>yourself?</b>
        </h4>
        <ul className="grid w-full gap-2 md:grid-cols-1 py-2">
          <Option
            text="It's obvious"
            id_v={questionIdentifier + "op0"}
            statementClass={questionIdentifier + "opinion"}
            checked={props.questionOneOpinion === questionIdentifier + "op0"}
            required={true}
          />
          <Option
            text="It's something I learned"
            id_v={questionIdentifier + "op1"}
            statementClass={questionIdentifier + "opinion"}
            checked={props.questionOneOpinion === questionIdentifier + "op1"}
            required={true}
          />
          <Option
            text="It's my opinion"
            id_v={questionIdentifier + "op2"}
            statementClass={questionIdentifier + "opinion"}
            checked={props.questionOneOpinion === questionIdentifier + "op2"}
            required={true}
          />
          <Option
            text="I don't know"
            id_v={questionIdentifier + "op3"}
            statementClass={questionIdentifier + "opinion"}
            checked={props.questionOneOpinion === questionIdentifier + "op3"}
            required={true}
          />
        </ul>
      </div>
    </>
  );
}

export default QuestionOne;