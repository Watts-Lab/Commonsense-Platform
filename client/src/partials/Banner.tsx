import React from "react";

import { Histogram } from "./Histogram";
import { commonsensicalityScores } from "./Scores";
import ConsentModal from "../components/ConsentModal";

import commonsenseLogo from "../images/Light-mode.svg";

const Banner: React.FC = () => {
  return (
    <>
      <section className="relative bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300">
        {/* Illustration behind hero content */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 top-32 pointer-events-none"
          aria-hidden="true"
          style={{ opacity: 0.1 }}
        >
          <Histogram width={1000} height={500} data={commonsensicalityScores} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Hero content */}
          <div className="pt-20 pb-12 md:pt-20 md:pb-40">
            {/* Section header */}
            <div className="pb-10 md:pb-16">
              <img
                className="mx-auto mb-6"
                src={commonsenseLogo}
                alt="Common Sense Logo"
              />
              <div className="max-w-3xl mx-auto px-10">
                <h1 className="text-3xl text-center md:text-4xl font-bold leading-tighter tracking-tight mb-4">
                  How common is common sense really? Join us to find out!
                </h1>
                <div className="max-w-xs sm:max-w-none sm:flex sm:justify-center">
                  <div>
                    <ConsentModal
                      buttonText="Measure your common sense"
                      buttonClass="text-white p-3 bg-gray-600 hover:bg-gray-700 w-full my-4 rounded-md sm:w-auto sm:mb-0"
                    />
                  </div>
                </div>
                <p className="text-md my-8">
                  Common sense is usually defined as “what all sensible people
                  know,” but this definition is circular: how do we know someone
                  is sensible other than that they possess common sense? As a
                  result, most people believe that they themselves possess
                  common sense, but have trouble articulating which of their
                  beliefs are commonsense or how common they are.
                </p>
                <p className="text-md my-8">
                  This project seeks to resolve the intrinsic ambiguity of
                  common sense empirically via a massive online survey
                  experiment. Participants will rate short claims that span a
                  wide range of knowledge domains, both in terms of their own
                  agreement with the claim and their belief about others'
                  agreement with it. We have developed novel methods to extract
                  statements from several diverse sources including appearances
                  in mass media, non-fiction books, and political campaign
                  emails, as well as statements elicited from human respondents
                  and generated by AI systems.
                </p>
                <p className="text-md my-8">
                  Ultimately, we hope to provide insight into the nature and
                  limits of common sense, thereby aiding research communities
                  (e.g. AI and ML) who wish to explore and simulate this
                  ubiquitous yet frustratingly elusive concept.
                  <br />
                  For more detail into this work, see paper{" "}
                  <a
                    className="text-blue-800 "
                    href="https://doi.org/10.1073/pnas.2309535121"
                  >
                    A framework for quantifying individual and collective common
                    sense
                  </a>
                  , recently out at PNAS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
