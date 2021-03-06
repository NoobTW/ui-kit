import React from 'react';
import { shallow } from 'enzyme';
import HeaderIcon from './header-icon';

const createTestProps = custom => ({
  isClosed: false,
  tone: 'primary',
  size: 'small',
  ...custom,
});

describe('rendering', () => {
  let props;
  let wrapper;
  describe('when open', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<HeaderIcon {...props} />);
    });
    it('should render `<AngleDownIcon />`', () => {
      expect(wrapper).toRender('AngleDownIcon');
    });
  });
  describe('when closed', () => {
    beforeEach(() => {
      props = createTestProps({ isClosed: true });
      wrapper = shallow(<HeaderIcon {...props} />);
    });
    it('should render `<AngleRightIcon />`', () => {
      expect(wrapper).toRender('AngleRightIcon');
    });
  });

  describe('tone', () => {
    describe('when is `urgent`', () => {
      beforeEach(() => {
        props = createTestProps({ tone: 'urgent' });
        wrapper = shallow(<HeaderIcon {...props} />);
      });
      it('should render with `header-icon-urgent` className', () => {
        expect(wrapper).toHaveClassName('header-icon-urgent');
      });
      it('should render `<AngleDownIcon />` with `white` theme', () => {
        expect(wrapper.find('AngleDownIcon')).toHaveProp('theme', 'white');
      });
    });
    describe('when is `primary`', () => {
      beforeEach(() => {
        props = createTestProps({ tone: 'primary' });
        wrapper = shallow(<HeaderIcon {...props} />);
      });
      it('should render with `header-icon-primary` className', () => {
        expect(wrapper).toHaveClassName('header-icon-primary');
      });
      it('should render `<AngleDownIcon />` with `black` theme', () => {
        expect(wrapper.find('AngleDownIcon')).toHaveProp('theme', 'black');
      });
    });
  });

  describe('size', () => {
    describe('when is `small`', () => {
      beforeEach(() => {
        props = createTestProps({ size: 'small' });
        wrapper = shallow(<HeaderIcon {...props} />);
      });
      it('should render with `header-icon-small` className', () => {
        expect(wrapper).toHaveClassName('header-icon-small');
      });
      it('should render `<AngleDownIcon />` with `small` size', () => {
        expect(wrapper.find('AngleDownIcon')).toHaveProp('size', 'small');
      });
    });
    describe('when is `medium`', () => {
      beforeEach(() => {
        props = createTestProps({ size: 'medium' });
        wrapper = shallow(<HeaderIcon {...props} />);
      });
      it('should not render with `header-icon-small` className', () => {
        expect(wrapper).not.toHaveClassName('header-icon-small');
      });
      it('should render `<AngleDownIcon />` with `medium` size', () => {
        expect(wrapper.find('AngleDownIcon')).toHaveProp('size', 'medium');
      });
    });
  });
});
