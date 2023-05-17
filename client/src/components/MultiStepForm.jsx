import React, { useEffect, useState } from "react";
import axios from "axios";

import './style.css';


function MultiStepForm(props) {

    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    function checkAnswers(answerList) {
        if(answerList.includes('')) {
            return false;
        } else {
            return true;
        }
    }

    function whichQuestion(answerList) {
        if(answerList.includes('')) {
            return answerList.indexOf('');
        } else {
            return null;
        }
    }

    function next() {

        if(currentStepIndex > 3) {
            props.getNextStatement(12).then(ret_val => {
                console.log(ret_val[0]);
                props.pushNewStatement(ret_val[0].id, ret_val[0].statement, 6)
             });
        }

        if(checkAnswers(props.steps[currentStepIndex].answers.slice(0, 5))) {
            
            setCurrentStepIndex(i => {
                if (i > props.steps.length - 1) return i;
                return i + 1;
            });

            if(!props.steps[currentStepIndex].answereSaved) {
                axios.post('/answers', {
                    "statementId": props.steps[currentStepIndex].id,
                    "questionOneAgree": props.steps[currentStepIndex].answers[0].slice(-1),
                    "questionOneWhy": props.steps[currentStepIndex].answers[1].slice(-1),
                    "questionTwoAgree": props.steps[currentStepIndex].answers[2].slice(-1),
                    "questionTwoWhy": props.steps[currentStepIndex].answers[3].slice(-1),
                    "questionThreeAgree": props.steps[currentStepIndex].answers[4].slice(-1),
                    "questionThreeWhy": "3",
                    "origLanguage": "en",
                    "sessionId": props.sessionId,
                })
                .then((response) => {
                    console.log(response.data);
                    props.handleAnswerSaving(props.steps[currentStepIndex].id, true);
                    props.steps[currentStepIndex].answereSaved = true;
                });
            }

        } else {
            console.log(whichQuestion(props.steps[currentStepIndex].answers.slice(0, 5)));
            return whichQuestion(props.steps[currentStepIndex].answers.slice(0, 5));
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    function back() {
        setCurrentStepIndex(i => {
            if (i <= 0) return i;
            return i - 1;
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    function goTo(index) {
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        step: props.steps[currentStepIndex],
        goTo,
        next,
        back,
        steps: props.steps
    }
}

export default MultiStepForm;