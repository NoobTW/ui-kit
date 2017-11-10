import React from 'react';
import { shallow } from 'enzyme';
import Text from '../../typography/text';
import { AddIcon } from '../../icons';
import LinkButton from './link-button';

const createTestProps = props => ({
  label: 'Accessibility text',
  to: '/foo/bar',
  iconLeft: <AddIcon size="small" />,
  isDisabled: false,
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<LinkButton {...props} />);
  });

  it('outputs correct tree', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Link>', () => {
    expect(wrapper).toRender('Link');
  });

  it('should pass the url to <Link>', () => {
    expect(wrapper.find('Link')).toHaveProp('to', '/foo/bar');
  });

  it('should render a <Text.Body>', () => {
    expect(
      wrapper.containsMatchingElement(
        <Text.Body>{'Accessibility text'}</Text.Body>
      )
    ).toBe(true);
  });

  it('should render the icon', () => {
    expect(wrapper).toRender('AddIcon');
  });

  describe('if disabled', () => {
    beforeEach(() => {
      props = createTestProps({ isDisabled: true });
      wrapper = shallow(<LinkButton {...props} />);
    });
    it('renders a <Link> with disabled class', () => {
      expect(wrapper.find('Link')).toHaveClassName('disabled');
    });
    it('renders the icon with "grey" theme', () => {
      expect(wrapper.find('AddIcon')).toHaveProp('theme', 'grey');
    });
  });
});
