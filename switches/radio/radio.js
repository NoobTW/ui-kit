import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spacings from '../../materials/spacings';
import Text from '../../typography/text';
import styles from './radio.mod.css';

class Option extends React.PureComponent {
  static displayName = 'RadioOption';
  static propTypes = {
    // Defaulted
    isDisabled: PropTypes.booleean,
    isChecked: PropTypes.booleean,
    // Injected through as compond component
    // not required as `createElement` is used.
    name: PropTypes.string,
    onClick: PropTypes.func,
    value: PropTypes.oneOf(PropTypes.string, PropTypes.object).isRequired,
    children: PropTypes.node,
  };
  static defaultProps = {
    isChecked: false,
    isDisabled: false,
  };

  handleChange = () => this.props.onClick(this.props.value);

  render() {
    return (
      <div className={styles.optionsWrapper}>
        <label>
          <Spacings.Inline>
            <input
              className={classnames(styles.inputWrapper, {
                [styles.inputDisabled]: this.props.isDisabled,
                [styles.inputChecked]: this.props.isChecked,
              })}
              name={this.props.name}
              value={this.props.value}
              onClick={this.handleChange}
              disabled={this.props.isDisabled}
              checked={this.props.isChecked}
              type="radio"
            />
            <Text.Detail>{this.props.children}</Text.Detail>
          </Spacings.Inline>
        </label>
      </div>
    );
  }
}

class Group extends React.PureComponent {
  static displayName = 'RadioGroup';
  static propTypes = {
    wrapperClassname: PropTypes.string,
    selectedValue: PropTypes.string,
    direction: PropTypes.oneOf(['stack', 'inline']),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };
  static defaultProps = {
    direction: 'stack',
  };

  state = {
    selectedValue: this.props.selectedValue,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedValue !== nextProps.selectedValue)
      this.handleChange(nextProps.selectedValue);
  }

  handleChange = nextValue =>
    this.setState({
      selectedValue: nextValue,
    });

  render() {
    const DirectionWrapper =
      this.props.direction === 'stack' ? Spacings.Stack : Spacings.Inline;
    return (
      <div
        className={classnames(
          this.props.wrapperClassname,
          styles.wrapperClassname
        )}
      >
        <DirectionWrapper>
          {React.Children.map(this.props.children, child => {
            // NOTE:
            //    Allowing to intersperse other elements
            //    than `Option`.
            if (child.type === Option)
              return React.cloneElement(child, {
                key: child.props.value,
                isChecked: this.state.selectedValue === child.props.value,
                name: this.props.name,
                onClick: this.handleChange,
              });
            return child;
          })}
        </DirectionWrapper>
      </div>
    );
  }
}

export default { Group, Option };
