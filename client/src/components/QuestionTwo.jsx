import React, { useEffect, useState } from "react";
import Option from "./Option";

import './style.css';

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
            <h4 className="font-bold">Do you think most other people would agree with this statement?</h4>
            <p className="text-gray-600">(if the answer depends, respond with your most common or most likely answer)</p>
            
            <ul className="grid w-full gap-2 md:grid-cols-1 py-2">
                <Option text="Yes" 
                    id_v={questionIdentifier + "yes"} 
                    statementClass={questionIdentifier + "agree"}
                    checked={props.questionTwoAgree === questionIdentifier + "yes"} 
                />
                <Option text="No" 
                    id_v={questionIdentifier + "no"} 
                    statementClass={questionIdentifier + "agree"} 
                    checked={props.questionTwoAgree === questionIdentifier + "no"} 
                />
            </ul>
            </div>

            <div className="p-3" on onChange={onChangeOpinion}>
            <h4>Why did you answer the way you did about most <b>other people?</b></h4>
            <ul className="grid w-full gap-2 md:grid-cols-1 py-2">
                <Option text="I think most people have good judgement with regard to this topic" 
                    id_v={questionIdentifier + "op1"} 
                    statementClass={questionIdentifier + "opinion"} 
                    checked={props.questionTwoOpinion === questionIdentifier + "op1"} 
                />
                <Option text="I think most people lack good judgment with regard to this topic" 
                    id_v={questionIdentifier + "op2"} 
                    statementClass={questionIdentifier + "opinion"} 
                    checked={props.questionTwoOpinion === questionIdentifier + "op2"} 
                />
                <Option text="I think it's mostly a matter of opinion" 
                    id_v={questionIdentifier + "op3"} 
                    statementClass={questionIdentifier + "opinion"} 
                    checked={props.questionTwoOpinion === questionIdentifier + "op3"} 
                />
                <Option text="I don't know" 
                    id_v={questionIdentifier + "op4"} 
                    statementClass={questionIdentifier + "opinion"} 
                    checked={props.questionTwoOpinion === questionIdentifier + "op4"} 
                />
            </ul>
            </div>
        </>
    )
}

export default QuestionTwo;