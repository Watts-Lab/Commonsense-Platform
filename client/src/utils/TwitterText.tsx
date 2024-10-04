import { useEffect, useState } from "react";

interface TwitterTextProps {
  percentage: number;
  sessionId: string;
}

const TwitterText = (props: TwitterTextProps) => {
  const [isShared, setIsShared] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [coppied, setCoppied] = useState(false);

  function handleShare() {
    setIsShared(true);
    handleCopy();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(textareaValue).finally(() => {
        setCoppied(true);
        setTimeout(() => {
          setCoppied(false);
        }, 2000);
      });
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  }

  const generateBlocksArray = () => {
    const pick = (arr: string[]): string =>
      arr[Math.floor(Math.random() * arr.length)];

    const score = props.percentage;
    const breakPoint = Math.min(Math.floor(score / 10));
    const blocks = [];

    for (let i = 0; i < 10; i++) {
      if (i < breakPoint) {
        if (i < 3) {
          blocks.push("🟥"); // Red
        } else if (i < 6) {
          blocks.push("🟨"); // Yellow
        } else if (i < 9) {
          blocks.push("🟩"); // Green
        }
      } else if (i === breakPoint) {
        blocks.push(
          pick(
            [
              [..."🤯"],
              [..."🤥😶😵‍💫"],
              [..."😵🥴"],
              [..."😏🫤😕"],
              [..."🤨🙂😌"],
              [..."😋😀"],
              [..."😃😄😁"],
              [..."🥸😎"],
              [..."😆🥳🧐"],
              [..."🤓🤩"],
            ][breakPoint]
          )
        );
      } else {
        blocks.push("⬜"); // Gray block until 10
      }
    }

    return blocks;
  };

  useEffect(() => {
    // Call the function to generate blocks array
    const blocks = generateBlocksArray();
    const percentage = `My common sense is ${props.percentage}%`;
    const newValue =
      props.sessionId === null
        ? `${percentage}\n${blocks.join(
            ""
          )}\nCheck yours: https://commonsense.seas.upenn.edu/`
        : `${percentage}\n${blocks.join(
            ""
          )}\nCheck yours: https://commonsense.seas.upenn.edu/${props.sessionId.slice(
            0,
            7
          )}`;

    setTextareaValue(newValue);
  }, [props.percentage, props.sessionId]); // Update dependencies array

  return (
    <div className="flex flex-col items-center pt-3">
      <button
        type="button"
        onClick={handleShare}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        {coppied ? "Coppied!" : "Copy & Share!"}
      </button>

      {isShared && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md w-96 dark:bg-gray-500">
          <textarea
            id="tweetText"
            className="mt-2 p-2 text-gray-800 bg-white border border-gray-300 rounded-md resize-none w-full dark:bg-gray-600 dark:text-gray-200 dark:border-gray"
            value={textareaValue}
            rows={5}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default TwitterText;
