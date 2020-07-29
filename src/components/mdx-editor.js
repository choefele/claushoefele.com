// Adapted from https://codesandbox.io/s/prism-react-renderer-example-u6vhk

import React from "react";
import { Pre, Line, LineNo, LineContent } from "./mdx-editor-styles";
import Highlight, { defaultProps } from "prism-react-renderer";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import { useColorModeValue } from "@chakra-ui/core"

const CodeBlock = ({ className, children, lineNumbers = false, ...props }) => {
  const language = className && className.replace(/language-/, "");
  const code = children.trim();
  const theme = useColorModeValue(lightTheme, darkTheme);
  
  return lineNumbers ? (
    <WithLineNumbers {...props} language={language} code={code} theme={theme}/>
  ) : (
    <Basic {...props} language={language} code={code} theme={theme}/>
  )
}

const Basic = ({ language, code, theme }) => (
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

const WithLineNumbers = ({ language, code, theme }) => (
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
