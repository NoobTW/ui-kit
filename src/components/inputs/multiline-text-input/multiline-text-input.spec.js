import React from 'react';
import { shallow } from 'enzyme';
import TextareaAutosize from 'react-textarea-autosize';
import FlatButton from '../../buttons/flat-button';
import Collapsible from '../../collapsible';
import { MultilineTextInput } from './multiline-text-input';

const createTestProps = customProps => ({
  value: '',
  intl: {
    formatMessage: jest.fn(message => message.id),
  },
  onChange: jest.fn(),
  ...customProps,
});

const getWrapper = (
  customProps,
  customRenderProps = { isOpen: true, toggle: jest.fn() }
) => {
  const props = createTestProps(customProps);
  return shallow(<MultilineTextInput {...props} />)
    .find(Collapsible)
    .renderProp('children', customRenderProps);
};

const getOpenWrapper = customProps =>
  getWrapper(customProps, { isOpen: true, toggle: jest.fn() });
const getClosedWrapper = customProps =>
  getWrapper(customProps, { isOpen: false, toggle: jest.fn() });

describe('MultilineTextInput.isEmpty', () => {
  describe('when called with an empty value', () => {
    it('should return true', () => {
      expect(MultilineTextInput.isEmpty('')).toBe(true);
      expect(MultilineTextInput.isEmpty(' ')).toBe(true);
      expect(MultilineTextInput.isEmpty('\n')).toBe(true);
    });
  });
  describe('when called with a filled value', () => {
    it('should return false', () => {
      expect(MultilineTextInput.isEmpty('a')).toBe(false);
      expect(MultilineTextInput.isEmpty(' a ')).toBe(false);
    });
  });
});

describe('rendering', () => {
  describe('data attributes', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = getOpenWrapper({ name: 'text-field1', 'data-foo': 'bar' });
    });
    it('should forward the attributes', () => {
      expect(wrapper.find(TextareaAutosize)).toHaveProp('data-foo', 'bar');
    });
  });
  describe('component by default', () => {
    let textarea;
    let wrapper;
    beforeEach(() => {
      wrapper = getOpenWrapper({ name: 'field1', value: 'foo' });
      textarea = wrapper.find(TextareaAutosize);
    });

    it('should have class for default styles', () => {
      expect(textarea).toHaveClassName('pristine');
    });

    it('should have ARIA role', () => {
      expect(textarea).toHaveProp('role', 'textbox');
    });

    it('should have ARIA multiline set as true', () => {
      expect(textarea).toHaveProp('aria-multiline', 'true');
    });

    it('textarea have a HTML name', () => {
      expect(textarea).toHaveProp('name', 'field1');
    });

    it('should render textarea', () => {
      expect(wrapper).toRender('TextareaAutosize');
    });
  });
  describe('with validation', () => {
    describe('has warning', () => {
      let textarea;
      beforeEach(() => {
        const wrapper = getOpenWrapper({ hasWarning: true });
        textarea = wrapper.find(TextareaAutosize);
      });
      it('should have warning styles', () => {
        expect(textarea).toHaveClassName('warning');
      });
    });
    describe('error', () => {
      let textarea;
      beforeEach(() => {
        const wrapper = getOpenWrapper({ hasError: true });
        textarea = wrapper.find(TextareaAutosize);
      });

      it('should have error styles', () => {
        expect(textarea).toHaveClassName('error');
      });
    });
    describe('disabled', () => {
      let textarea;
      beforeEach(() => {
        const wrapper = getClosedWrapper({ isDisabled: true });
        textarea = wrapper.find(TextareaAutosize);
      });

      it('should MultilineTextInput have class for the disabled state', () => {
        expect(textarea).toHaveClassName('disabled');
      });
    });
    describe('readonly', () => {
      let textarea;
      beforeEach(() => {
        const wrapper = getOpenWrapper({ isReadOnly: true });
        textarea = wrapper.find(TextareaAutosize);
      });

      it('should have class for the readonly state', () => {
        expect(textarea).toHaveClassName('readonly');
      });

      it('should have ARIA properties for the readonly state', () => {
        expect(textarea).toHaveProp('aria-readonly', true);
      });
    });
  });
  describe('`isDefaultClosed`', () => {
    describe('when false', () => {
      describe('<MultilineTextInput />', () => {
        describe('has 1 row', () => {
          let textAreaWrapper;
          let wrapper;
          beforeEach(() => {
            const props = createTestProps({
              name: 'field1',
              value: 'foo',
            });
            wrapper = shallow(<MultilineTextInput {...props} />);
            wrapper.setState({ contentRowCount: 1 });
            textAreaWrapper = wrapper.find(Collapsible).renderProp('children', {
              isOpen: true,
              toggle: jest.fn(),
            });
          });
          it('should not render FlatButton', () => {
            expect(textAreaWrapper).not.toRender(FlatButton);
          });
        });
        describe('has more than 1 row', () => {
          let flatbutton;
          let textAreaWrapper;
          let wrapper;
          beforeEach(() => {
            const props = createTestProps({
              name: 'field2',
              value: 'foo2',
            });
            wrapper = shallow(<MultilineTextInput {...props} />);
            wrapper.setState({ contentRowCount: 10 });
            textAreaWrapper = wrapper.find(Collapsible).renderProp('children', {
              isOpen: true,
              toggle: jest.fn(),
            });
            flatbutton = textAreaWrapper.find(FlatButton);
          });
          it('should render FlatButton', () => {
            expect(textAreaWrapper).toRender(FlatButton);
          });
          it('should have `Collapse` message', () => {
            expect(flatbutton).toHaveProp(
              'label',
              'UIKit.MultilineTextInput.collapse'
            );
          });
        });
      });
    });
    describe('when true', () => {
      describe('<MultilineTextInput />', () => {
        describe('has 1 row', () => {
          let textAreaWrapper;
          let wrapper;
          beforeEach(() => {
            const props = createTestProps({
              name: 'field2',
              value: 'The quick brown fox jumps over the lazy dog',
              isDefaultClosed: true,
            });
            wrapper = shallow(<MultilineTextInput {...props} />);
            wrapper.setState({ contentRowCount: 1 });
            textAreaWrapper = wrapper.find(Collapsible).renderProp('children', {
              isOpen: false,
              toggle: jest.fn(),
            });
          });
          it('should not render FlatButton', () => {
            expect(textAreaWrapper).not.toRender(FlatButton);
          });
        });
        describe('has more than 1 row', () => {
          let flatbutton;
          let textAreaWrapper;
          let wrapper;
          beforeEach(() => {
            const props = createTestProps({
              name: 'field2',
              value:
                'The quick brown fox jumps over the lazy dog, The quick brown fox jumps over the lazy dog, The quick brown fox jumps over the lazy dog',
              isDefaultClosed: true,
            });
            wrapper = shallow(<MultilineTextInput {...props} />);
            wrapper.setState({ contentRowCount: 10 });
            textAreaWrapper = wrapper.find(Collapsible).renderProp('children', {
              isOpen: false,
              toggle: jest.fn(),
            });
            flatbutton = textAreaWrapper.find(FlatButton);
            textAreaWrapper.find(FlatButton).simulate('click');
          });
          it('should render FlatButton', () => {
            expect(textAreaWrapper).toRender(FlatButton);
          });
          it('should FlatButton have `Expand` message', () => {
            expect(flatbutton).toHaveProp(
              'label',
              'UIKit.MultilineTextInput.expand'
            );
          });
        });
      });
    });
  });
});

describe('callbacks', () => {
  describe('`onChange`', () => {
    let props;
    const event = { target: { value: 'bar' } };
    beforeEach(() => {
      props = createTestProps({
        value: 'foo',
        onChange: jest.fn(),
      });
      const wrapper = getOpenWrapper(props);
      const textarea = wrapper.find(TextareaAutosize);
      textarea.simulate('change', event);
    });

    it('should call onChange', () => {
      expect(props.onChange).toHaveBeenCalled();
    });

    it('should update with new value', () => {
      expect(props.onChange).toHaveBeenCalledWith(event);
    });
  });
  describe('`onFocus`', () => {
    let props;
    let textarea;
    beforeEach(() => {
      props = createTestProps({
        value: 'foo',
        onFocus: jest.fn(),
      });
      const wrapper = getOpenWrapper(props);
      textarea = wrapper.find(TextareaAutosize);
      textarea.simulate('focus');
    });

    it('should call onFocus', () => {
      expect(props.onFocus).toHaveBeenCalled();
    });

    it('should keep the same value', () => {
      expect(textarea).toHaveProp('value', 'foo');
    });
  });
  describe('`onBlur`', () => {
    let props;
    let textarea;
    beforeEach(() => {
      props = createTestProps({
        value: 'foo',
        onBlur: jest.fn(),
      });
      const wrapper = getOpenWrapper(props);
      textarea = wrapper.find(TextareaAutosize);
      textarea.simulate('blur');
    });

    it('should call onBlur', () => {
      expect(props.onBlur).toHaveBeenCalled();
    });

    it('should keep the same value', () => {
      expect(textarea).toHaveProp('value', 'foo');
    });
  });
  describe('`isAutofocussed`', () => {
    let textarea;
    beforeEach(() => {
      const props = createTestProps({
        isAutofocussed: true,
        onFocus: jest.fn(),
      });
      const wrapper = getOpenWrapper(props);
      textarea = wrapper.find(TextareaAutosize);
    });

    it('should autofocus prop be true', () => {
      expect(textarea).toHaveProp('autoFocus', true);
    });
  });
});
