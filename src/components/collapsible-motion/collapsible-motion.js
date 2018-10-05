import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';
import Collapsible from '../collapsible';

export class ToggleAnimation extends React.Component {
  static displayName = 'ToggleAnimation';
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };

  state = {
    containerStyles: {},
    fullHeight: 0,
  };

  handleToggle = () => {
    warning(
      this.node,
      'You need to call `registerContentNode` in order to use this component'
    );

    if (this.props.isOpen) {
      this.setState(prevState => ({
        // when clicked while animating
        fullHeight: Math.max(prevState.fullHeight, this.node.clientHeight),
        containerStyles: {
          transition: 'height 1s ease 0s',
          height: 0,
          overflow: 'hidden',
        },
      }));
    } else {
      this.setState(prevState => ({
        containerStyles: {
          overflow: 'hidden',
          transition: 'height 1s ease 0s',
          height: prevState.fullHeight,
        },
      }));
    }

    this.props.toggle();
  };

  registerContentNode = node => {
    if (!node) return;
    this.node = node;
    // update once to get rid of initial "auto" styling

    // TODO respect initial value of isOpen
    this.setState({
      containerStyles: {
        height: this.node.clientHeight,
      },
    });
    // this.node.addEventListener(
    //   'transitionend',
    //   this.handleTransitionEnd
    // );
  };

  handleTransitionEnd = () => {
    // this.setState(prevState => ({
    //   containerStyles: {
    //     ...prevState.containerStyles,
    //     height: this.props.isOpen ? 'auto' : 0,
    //   },
    // }));
  };

  render() {
    const childProps = {
      containerStyles: this.state.containerStyles,
      toggle: this.handleToggle,
      registerContentNode: this.registerContentNode,
    };
    console.log(childProps);
    return this.props.children(childProps);
  }
}

class CollapsibleMotion extends React.PureComponent {
  static displayName = 'CollapsibleMotion';
  static propTypes = {
    children: PropTypes.func.isRequired,
    isClosed: PropTypes.bool,
    onToggle: PropTypes.func,
    isDefaultClosed: PropTypes.bool,
  };

  render() {
    return (
      <Collapsible
        isClosed={this.props.isClosed}
        isDefaultClosed={this.props.isDefaultClosed}
        onToggle={this.props.onToggle}
      >
        {({ isOpen, toggle }) => (
          <ToggleAnimation isOpen={isOpen} toggle={toggle}>
            {({
              containerStyles,
              toggle: toggleAnimation,
              registerContentNode,
              registerContainerNode,
            }) =>
              this.props.children({
                isOpen,
                toggle: toggleAnimation,
                containerStyles,
                registerContentNode,
                registerContainerNode,
              })
            }
          </ToggleAnimation>
        )}
      </Collapsible>
    );
  }
}

export default CollapsibleMotion;
