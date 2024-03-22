import React, { useState, useEffect, useContext } from "react";
import { SurveyContext } from "../SurveyContext";
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import { getDatabase, ref, child, get } from "firebase/database";
import "../App.css";

function Analytics() {
  const dbRef = ref(getDatabase());
  const [answers, setAnswers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { newSurveyKey } = useContext(SurveyContext);

  function readData() {
    console.log(newSurveyKey);
    get(child(dbRef, "/surveys/" + newSurveyKey + "/answers"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAnswers(snapshot.val());
        } else {
          console.log("No Data Available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (newSurveyKey !== null) {
      setIsLoading(false);
    }

    if (answers == null) {
      readData();
    }

    console.log(answers);
  }, [newSurveyKey, dbRef, answers]);

  return (
    <div className="main">
      <Sidebar />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="content">
          <div className="headerBar">
            <h5 className="header">Analytics:</h5>
          </div>
          <div className="fullContainer">
            <div>
              <div class="accordion" id="accordionExample">
                {answers !== null &&
                  Object.entries(answers).map(([key, values]) => {
                    console.log(values);
                    const collapseId = `collapse-${key}`;
                    return (
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                          <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${collapseId}`}
                            aria-expanded="true"
                            aria-controls={collapseId}
                          >
                            Participant ID: {key}
                          </button>
                        </h2>
                        <div
                          id={collapseId}
                          class="accordion-collapse collapse show"
                          aria-labelledby={`heading-${key}`}
                          data-bs-parent="#accordionExample"
                        >
                          <div class="accordion-body">
                            {values.map((question) => {
                              return (
                                <div className="displayQuestion">
                                  <div className="displayQuestionLabel">
                                    Question ID: {question.questionIndex}
                                  </div>
                                  <div className="displayQuestionLabel">
                                    {" "}
                                    Question Type: {question.type}{" "}
                                  </div>
                                  <div className="displayQuestionLabel">
                                    Answer: {question.value}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
