import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TextField from '@mui/material/TextField'
import { useField, useFormikContext } from 'formik'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import FormHelperText from '@mui/material/FormHelperText'
import { useState } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers'


const DateTimePickerUI = ({
  name,
  label,
  value,
  ...otherProps
}) => {
  const [date, setDate] = useState(value)
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()
  const handleDateChange = (value) => {
    setFieldValue(name, moment(value).format('YYYY-MM-DD, HH:mm a'))
    setDate(value)
  }
  const configDatePicker = {
    ...field,
    ...otherProps,
    label: label,
    type: 'date',
    fullWidth: true,
    onChange: handleDateChange,
    value: field.value ? moment(field.value, 'YYYY-MM-DD, HH:mm a').toDate() : null,
    defaultValue : null,
  }
  if (meta && meta.touched && meta.error) {
    configDatePicker.error = true;
    configDatePicker.helperText = meta.error;

  }
  return ( 
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              {...configDatePicker}
              renderInput={(params) => <TextField {...params} />}
              >
              </DateTimePicker>
              <FormHelperText>{configDatePicker.helperText}</FormHelperText>
          </LocalizationProvider>
   )
}
 
export default DateTimePickerUI