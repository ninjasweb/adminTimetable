import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { useField, useFormikContext } from 'formik'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import FormHelperText from '@mui/material/FormHelperText'
import moment from 'moment'

const TimePickerUI = ({
  name,
  label,
  value,
  ...otherProps
}) => {
  const [selectedTime, setSelectedTime] = useState(new Date())
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()
  const handleChange = (time) => {
    setSelectedTime(time)
    setFieldValue(name, moment(time).format('HH:mm'))
  }
  const configTimePicker = {
    ...field,
    ...otherProps,
    type: 'time',
    fullWidth: true,
    onChange: handleChange,
    value: selectedTime,
    defaultValue: null,
    value : field.value,
  }
  if(meta && meta.touched && meta.error) {
    configTimePicker.error = true;
    configTimePicker.helperText = meta.error;
  }
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TimePicker
        value={selectedTime}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
      <FormHelperText>{configTimePicker.helperText}</FormHelperText>
    </LocalizationProvider>
      
   )
}
 
export default TimePickerUI