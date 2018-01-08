import React from 'react';
import { shallow } from 'enzyme';
import { Checkbox } from './checkbox';

jest.mock('invariant');

const createTestProps = custom => ({
  name: 'bar',
  value: 'foo',
  isDisabled: false,
  isChecked: false,
  onChange: jest.fn(),

  // HoC
  handleMouseOver: jest.fn(),
  handleMouseOut: jest.fn(),
  isMouseOver: false,
  ...custom,
});

describe('<Checkbox>', () => {
  describe('rendering', () => {
    let props;
    let wrapper;
    describe('without children', () => {
      beforeEach(() => {
        props = createTestProps();

        wrapper = shallow(<Checkbox {...props} />);
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should supply `onChange` to the `input`', () => {
        expect(wrapper.find('input')).toHaveProp('onChange', props.onChange);
      });

      describe('when disabled', () => {
        beforeEach(() => {
          props = createTestProps({ isDisabled: true });

          wrapper = shallow(<Checkbox {...props} />);
        });

        it('should disable the `input`', () => {
          expect(wrapper.find('input')).toHaveProp(
            'disabled',
            props.isDisabled
          );
        });
      });

      describe('when checked', () => {
        beforeEach(() => {
          props = createTestProps({ isDisabled: true });

          wrapper = shallow(<Checkbox {...props} />);
        });

        it('should check the `input`', () => {
          expect(wrapper.find('input')).toHaveProp('checked', props.isChecked);
        });
      });
    });

    describe('with children', () => {
      beforeEach(() => {
        props = createTestProps();

        wrapper = shallow(<Checkbox {...props}>{'Some label'}</Checkbox>);
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});

describe('callbacks', () => {
  const createEvent = ({ isChecked = true } = {}) => ({
    target: {
      checked: isChecked,
    },
  });

  describe('when changing', () => {
    let props;
    describe('when checked', () => {
      beforeEach(() => {
        props = createTestProps({ isChecked: true });

        const wrapper = shallow(<Checkbox {...props} />);
        wrapper
          .find('input')
          .simulate('change', createEvent({ isChecked: props.isChecked }));
      });

      it('should invoke `onChange`', () => {
        expect(props.onChange).toHaveBeenCalled();
      });

      it('should invoke `onChange` with `checked`', () => {
        expect(props.onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({
              checked: props.isChecked,
            }),
          })
        );
      });

      it('should invoke `onChange` with `event`', () => {
        expect(props.onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.any(Object),
          })
        );
      });
    });

    describe('when not checked', () => {
      beforeEach(() => {
        props = createTestProps({ isChecked: false });

        const wrapper = shallow(<Checkbox {...props} />);

        wrapper
          .find('input')
          .simulate('change', createEvent({ isChecked: props.isChecked }));
      });

      it('should invoke `onChange`', () => {
        expect(props.onChange).toHaveBeenCalled();
      });

      it('should invoke `onChange` with `checked`', () => {
        expect(props.onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({
              checked: props.isChecked,
            }),
          })
        );
      });

      it('should invoke `onChange` with `event`', () => {
        expect(props.onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.any(Object),
          })
        );
      });
    });
  });
});
