import React, { useState, useRef, useEffect } from "react";
import FeaturesElement2 from "../images/Common-Sens.png";

const About: React.FC = () => {
  const [tab, setTab] = useState<number>(1);

  const tabs = useRef<HTMLDivElement | null>(null);

  const heightFix = () => {
    if (tabs.current?.children[tab - 1]) {
      const childElement = tabs.current.children[tab - 1] as HTMLElement;
      tabs.current.style.height = childElement.offsetHeight + "px";
    }
  };
  
  useEffect(() => {
    heightFix();
  }, [tab]);

  return (
    <section id="about" className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">How “Common” is Common Sense?</h1>
          </div>
          <div className="max-w-3xl mx-auto pb-12 md:pb-16 text-justify text-xl text-gray-600">
            <p className="mb-2">
              Common sense is usually defined as “what all sensible people
              know,” but this definition is circular: how do we know someone is
              sensible other than that they possess common sense? As a result,
              most people believe that they themselves possess common sense, but
              have trouble articulating which of their beliefs are commonsense
              or how common they are.
            </p>
            <p className="mb-2">
              This project tackles the definitional conundrum of common sense
              head on via a massive online survey experiment. Participants are
              asked to rate thousands of statements, spanning a wide range of
              knowledge domains, both in terms of their own agreement with the
              statement and their belief about the agreement of others. The team
              developed novel methods to extract statements from several diverse
              sources including appearances in mass media, non-fiction books,
              and political campaign emails, as well as statements elicited from
              human respondents and generated by AI systems. We have also
              developed new taxonomies to classify statements by domain and
              type.
            </p>

            <p className="mb-2">
              Ultimately, we hope to provide insight into the nature and limits
              of common sense, thereby aiding research communities (e.g. AI and
              ML) who wish to explore and simulate this ubiquitous yet
              frustratingly elusive concept.
            </p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Belief calibration by topic</h3>
                <p className="text-xl text-gray-600">
                  Calibration of one’s own beliefs about what others think is
                  true—one characterization of common sense—is heavily dependent
                  on the topic of a statement. For example, for statements
                  related to religion (represented by the large light green
                  circle to the lower left of the plot), people systematically
                  overestimate others’ beliefs. Statements related to technical
                  topics (represented by the yellow circle in the upper right of
                  the plot) are almost perfectly calibrated on average.
                </p>
              </div>
            </div>

            {/* Tabs items */}
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1"
              data-aos="zoom-y-out"
              ref={tabs}
            >
              <div className="relative flex flex-col text-center lg:text-right">
                {/* Item 1 */}
                <div className="relative inline-flex flex-col">
                  <img
                    src={FeaturesElement2}
                    alt="Common Sense Computational Social Science Lab"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;