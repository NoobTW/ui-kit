import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { parseDateTime } from '@commercetools-local/utils/datetime';
import Text from '../typography/text';
import DatePicker from '../date-picker';
import Spacings from '../materials/spacings';
import styles from './time-range-picker.mod.css';
import messages from './messages';

const TimeRangePicker = props => {
  const handleChangeValue = rangeKey => value => {
    props.onChange({
      ...props.value,
      // avoid parsing when the value has been reset
      [rangeKey]: value ? parseDateTime('time', value) : undefined,
    });
  };
  return (
    <Spacings.Inline alignItems="center">
      <div className={styles['time-item']}>
        <Spacings.Inline alignItems="center">
          <Text.Body isBold={true}>
            <FormattedMessage {...messages.from} />
          </Text.Body>
          <DatePicker
            value={props.value.from}
            onChange={handleChangeValue('from')}
            mode="single"
            timeScale="time"
            size="scale"
          />
        </Spacings.Inline>
      </div>
      <div className={styles['time-item']}>
        <Spacings.Inline alignItems="center">
          <Text.Body isBold={true}>
            <FormattedMessage {...messages.to} />
          </Text.Body>
          <DatePicker
            value={props.value.to}
            onChange={handleChangeValue('to')}
            mode="single"
            timeScale="time"
            size="scale"
          />
        </Spacings.Inline>
      </div>
    </Spacings.Inline>
  );
};

TimeRangePicker.displayName = 'TimeRangePicker';
TimeRangePicker.propTypes = {
  value: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TimeRangePicker;