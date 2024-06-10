import React from "react";

import { Histogram } from "./Histogram";
import { commonsensicalityScores } from "./Scores";
import ConsentModal from "../components/ConsentModal";
import commonsenseLogo from "../images/Light-mode.svg";
import { useTranslation } from 'react-i18next';
import LocaleSwitcher from "../components/LocaleSwitcher";

type Language = {
  nativeName: string;
};

type Languages = {
  [key: string]: Language;
};

const Banner: React.FC = () => {
  const { t, i18n } = useTranslation(); 

  return (
    <>
      <section className="relative bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300">
        {/* Language selection dropdown */}
        <LocaleSwitcher />

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
                alt={t('banner.logo')}
              />
              <div className="max-w-3xl mx-auto px-10">
                <h1 className="text-3xl md:text-4xl font-bold leading-tighter tracking-tight mb-4">
                  {/* How common is common sense really? */}
                  {t('banner.title')} 
                </h1>
                <h2 className="text-1xl md:text-2xl font-bold leading-tighter tracking-tight mb-4">
                  {/* Join us to find out! */}
                  {t('banner.subtitle')}
                </h2>
                <div className="max-w-xs sm:max-w-none sm:flex sm:justify-center">
                  <div>
                    <ConsentModal
                      // Measure your common sense
                      buttonText={t("banner.button")} 
                      buttonClass="text-white p-3 bg-gray-600 hover:bg-gray-700 w-full my-4 rounded-md sm:w-auto sm:mb-0"
                    />
                  </div>
                </div>
                <p className="text-md my-8">
                  {/* Common sense is often defined as “what all sensible people know,” 
                  but this definition is circular: how do we know someone is sensible 
                  other than that they possess common sense? As a result, most people 
                  believe that they themselves possess common sense, but can't articulate 
                  which of their beliefs are commonsensical or how common their beliefs are 
                  to others. */}
                  {t("banner.paragraph1")}
                </p>
                <p className="text-md my-8">
                  {/* This project seeks to quantify common sense empirically via a massive online 
                  survey experiment. Participants will read a series of \"claims\" about the physical 
                  and social world (e.g. \"Dropped pebbles fall to the ground\" or \"Fully automatic 
                  assault rifles should be banned\"), state whether they agree with each claim, and 
                  also state what they think most other people think. */}
                  {t("banner.paragraph2")}
                </p>
                <p className="text-md my-8">
                  {/* We have developed novel methods to extract statements from several diverse 
                  sources including appearances in mass media, non-fiction books, and political 
                  campaign emails, as well as statements elicited from human respondents and 
                  generated by AI systems. Our findings will shed light on the nature and limits 
                  of common sense, thereby aiding research communities (e.g. AI and ML) who wish 
                  to explore and simulate this ubiquitous yet frustratingly elusive concept. */}
                  {t("banner.paragraph3")}
                </p>
                <p className="text-md my-8">
                  {/* For more detail into this work, see our recent paper */}
                  {t("banner.paragraph4-1")}{" "}
                  <a
                    className="text-blue-800 dark:text-blue-300"
                    href="https://doi.org/10.1073/pnas.2309535121"
                  >
                    {/* A framework for quantifying individual and collective common sense */}
                    {t('banner.paper')}
                  </a>
                    {/* , published */}
                    {t('banner.paragraph4-2')}{" "}
                  <span className="italic">
                    {/* in The Proceedings of the National Academy of Sciences. */}
                    {t('banner.paragraph4-3')}
                  </span>
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
