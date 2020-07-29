// Adapted from https://codesandbox.io/s/prism-react-renderer-example-u6vhk

import React from "react";
import { Pre, Line, LineNo, LineContent } from "./mdx-editor-styles";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwlLight";

const CodeBlock = ({ className, children, lineNumbers = false, ...props }) => {
  const language = className && className.replace(/language-/, "");
  const code = children.trim();
  return lineNumbers ? (
    <WithLineNumbers {...props} language={language} code={code} />
  ) : (
    <Basic {...props} language={language} code={code} />
  )
}

const Basic = ({ language, code }) => (
  <Highlight {...defaultProps} theme={theme} code={code} language={language}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </Pre>
    )}
  </Highlight>
);

const WithLineNumbers = ({ language, code }) => (
  <Highlight {...defaultProps} theme={theme} code={code} language={language}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {tokens.map((line, i) => (
          <Line key={i} {...getLineProps({ line, key: i })}>
            <LineNo>{i + 1}</LineNo>
            <LineContent>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </LineContent>
          </Line>
        ))}
      </Pre>
    )}
  </Highlight>
);

export default CodeBlock;
