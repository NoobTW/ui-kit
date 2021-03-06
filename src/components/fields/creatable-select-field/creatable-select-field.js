import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Constraints from '../../constraints';
import Spacings from '../../spacings';
import FieldLabel from '../../field-label';
import CreatableSelectInput from '../../inputs/creatable-select-input';
import createSequentialId from '../../../utils/create-sequential-id';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import FieldErrors from '../../field-errors';

const sequentialId = createSequentialId('text-field-');

const hasErrors = errors => errors && Object.values(errors).some(Boolean);

export default class SelectField extends React.Component {
  static displayName = 'SelectField';

  static isTouched = CreatableSelectInput.isTouched;

  // customizable components
  static ClearIndicator = CreatableSelectInput.ClearIndicator;
  static Control = CreatableSelectInput.Control;
  static DropdownIndicator = CreatableSelectInput.DropdownIndicator;
  static Group = CreatableSelectInput.Group;
  static GroupHeading = CreatableSelectInput.GroupHeading;
  static IndicatorsContainer = CreatableSelectInput.IndicatorsContainer;
  static IndicatorSeparator = CreatableSelectInput.IndicatorSeparator;
  static Input = CreatableSelectInput.Input;
  static LoadingIndicator = CreatableSelectInput.LoadingIndicator;
  static Menu = CreatableSelectInput.Menu;
  static MenuList = CreatableSelectInput.MenuList;
  static LoadingMessage = CreatableSelectInput.LoadingMessage;
  static NoOptionsMessage = CreatableSelectInput.NoOptionsMessage;
  static MultiValue = CreatableSelectInput.MultiValue;
  static MultiValueContainer = CreatableSelectInput.MultiValueContainer;
  static MultiValueLabel = CreatableSelectInput.MultiValueLabel;
  static MultiValueRemove = CreatableSelectInput.MultiValueRemove;
  static Option = CreatableSelectInput.Option;
  static Placeholder = CreatableSelectInput.Placeholder;
  static SelectContainer = CreatableSelectInput.SelectContainer;
  static SingleValue = CreatableSelectInput.SingleValue;
  static ValueContainer = CreatableSelectInput.ValueContainer;

  static propTypes = {
    // SelectField
    id: PropTypes.string,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    errors: PropTypes.shape({
      missing: PropTypes.bool,
    }),
    renderError: PropTypes.func,
    isRequired: PropTypes.bool,
    touched: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(PropTypes.bool, ...rest)(props, ...rest)
        : PropTypes.bool(props, ...rest),

    // CreatableSelectInput
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    isAutofocussed: PropTypes.bool,
    backspaceRemovesValue: PropTypes.bool,
    components: PropTypes.objectOf(PropTypes.func),
    filterOption: PropTypes.func,
    containerId: PropTypes.string,
    isClearable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isOptionDisabled: PropTypes.func,
    isMulti: PropTypes.bool,
    isSearchable: PropTypes.bool,
    maxMenuHeight: PropTypes.number,
    name: PropTypes.string,
    noOptionsMessage: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onInputChange: PropTypes.func,
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({ value: PropTypes.string.isRequired }),
        PropTypes.shape({
          options: PropTypes.arrayOf(
            PropTypes.shape({ value: PropTypes.string.isRequired })
          ),
        }),
      ])
    ),
    placeholder: PropTypes.string,
    tabIndex: PropTypes.string,
    tabSelectsValue: PropTypes.bool,
    value: (props, ...rest) =>
      props.isMulti
        ? PropTypes.arrayOf(PropTypes.string)(props, ...rest)
        : PropTypes.string(props, ...rest),

    // Creatable props
    allowCreateWhileLoading: PropTypes.bool,
    formatCreateLabel: PropTypes.func,
    isValidNewOption: PropTypes.func,
    getNewOptionData: PropTypes.func,
    onCreateOption: PropTypes.func,
    createOptionPosition: PropTypes.string,

    // LabelField
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    hint: requiredIf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      props => props.hintIcon
    ),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onInfoButtonClick: PropTypes.func,
    hintIcon: PropTypes.node,
    badge: PropTypes.node,
  };

  static defaultProps = {
    horizontalConstraint: 'scale',
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (props, state) => ({
    id: do {
      if (props.id) props.id;
      else if (state.id) state.id;
      else sequentialId();
    },
  });

  render() {
    const hasError =
      CreatableSelectInput.isTouched(this.props.touched) &&
      hasErrors(this.props.errors);
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Spacings.Stack scale="xs">
          <FieldLabel
            title={this.props.title}
            hint={this.props.hint}
            description={this.props.description}
            onInfoButtonClick={this.props.onInfoButtonClick}
            hintIcon={this.props.hintIcon}
            badge={this.props.badge}
            hasRequiredIndicator={this.props.isRequired}
            htmlFor={this.state.id}
          />
          <CreatableSelectInput
            horizontalConstraint="scale"
            hasError={hasError}
            aria-label={this.props['aria-label']}
            aria-labelledby={this.props['aria-labelledby']}
            isAutofocussed={this.props.isAutofocussed}
            backspaceRemovesValue={this.props.backspaceRemovesValue}
            components={this.props.components}
            filterOption={this.props.filterOption}
            id={this.state.id}
            containerId={this.props.containerId}
            isClearable={this.props.isClearable}
            isDisabled={this.props.isDisabled}
            isOptionDisabled={this.props.isOptionDisabled}
            isMulti={this.props.isMulti}
            isSearchable={this.props.isSearchable}
            maxMenuHeight={this.props.maxMenuHeight}
            name={this.props.name}
            noOptionsMessage={this.props.noOptionsMessage}
            onBlur={this.props.onBlur}
            onChange={this.props.onChange}
            onFocus={this.props.onFocus}
            onInputChange={this.props.onInputChange}
            options={this.props.options}
            placeholder={this.props.placeholder}
            tabIndex={this.props.tabIndex}
            tabSelectsValue={this.props.tabSelectsValue}
            value={this.props.value}
            // Creatable props
            allowCreateWhileLoading={this.props.allowCreateWhileLoading}
            formatCreateLabel={this.props.formatCreateLabel}
            isValidNewOption={this.props.isValidNewOption}
            getNewOptionData={this.props.getNewOptionData}
            onCreateOption={this.props.onCreateOption}
            createOptionPosition={this.props.createOptionPosition}
            {...filterDataAttributes(this.props)}
          />
          <FieldErrors
            errors={this.props.errors}
            isVisible={hasError}
            renderError={this.props.renderError}
          />
        </Spacings.Stack>
      </Constraints.Horizontal>
    );
  }
}
