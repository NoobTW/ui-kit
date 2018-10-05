import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import styled from 'styled-components';
import CollapsibleMotion from './collapsible-motion';
import Readme from './README.md';

const Block = styled.div`
  background-color: #e1ffdd;
  width: 500px;
`;

storiesOf('Panels', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('CollapsibleMotion', () => {
    const height = number('height', 20, {
      range: true,
      min: 10,
      max: 100,
      step: 10,
    });
    return (
      <CollapsibleMotion>
        {({ containerStyles, toggle, registerContentNode }) => (
          <div>
            <button onClick={toggle} type="button">
              toggle
            </button>
            <div ref={registerContentNode} style={containerStyles}>
              <Block>
                <div>
                  {Array(height)
                    .fill(0)
                    .map((item, index) => (
                      <p key={index}>hello {index + 1}</p>
                    ))}
                </div>
              </Block>
            </div>
            <p>Some more text</p>
          </div>
        )}
      </CollapsibleMotion>
    );
  });
