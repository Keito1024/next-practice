import React, { useState } from 'react';

type AppProps = {
  message: string;
};
type SampleType = AppProp & {
  sample: string;
};

interface AppProp {
  message: string;
}

interface SampleInterface extends AppProp {
  sample: string;
}

const Sample: React.FC<AppProps> = (props) => {
  const { message } = props;
  const sampleInterface: SampleInterface = {
    message: "sample",
    sample: "sample",
  };
  const sampleType: SampleType = {
    message: "sample",
    sample: "sample",
  };
  // state
  const [text, setText] = useState<string>("");
  // form event type
  const changeText = (e: React.FormEvent<HTMLInputElement>): void => {
    setText(e.currentTarget.value);
  };
  return (
    <div>
      <input type="text" value={text} onChange={changeText} />
      <br />
      {message}
      <br />
      {sampleInterface.message}
      <br />
      {sampleType.sample}
      <br />
      {text}
    </div>
  );
};

export default Sample;
