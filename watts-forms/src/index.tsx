// components/survey/index.tsx
import React from "react";
import Checkbox from "./inputs/checkbox";
import Radio from "./inputs/radio";
import Submit from "./inputs/submit";
import Text from "./inputs/text";

export type Element = {
  type: string;
  name: string;
  title: string;
  description?: any;
  choices?: string[];
}

export type Attribute = {
  key: string
  value: string 
}

export interface FormProps {
  elements: Element[]
  action: string
  hiddenAttributes?: Attribute[]
}

export const SinglePageForm = ({elements, action, hiddenAttributes}: FormProps) => {
  const createInput = (element: Element) => {
    switch (element.type) {
      case "radio":
        return <Radio {...element} />
      case "text":
        return <Text {...element} />
      case "checkbox":
        return <Checkbox {...element} />
      default:
        return null;
    }
  }

  return (
    <form action={action}  method="POST" > 
      {
        elements.map(element => createInput(element))
      }
      {
        hiddenAttributes?.map(attribute => <input type="hidden" name={attribute.key} value={attribute.value} />)
      }
      <Submit />
    </form>
  );
}

export default SinglePageForm