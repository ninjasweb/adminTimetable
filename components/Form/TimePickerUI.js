import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { useField, useFormikContext } from 'formik'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import moment from 'moment'

const TimePickerUI = ({
  name,
  label,
  value,
  ...otherProps
}) => {
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()
  const handleChange = (time) => {
    setFieldValue(name, moment(time).format('HH:mm'))
  }
  const configTimePicker = {
    ...field,
    ...otherProps,
    type: 'time',
    fullWidth: true,
    onChange: handleChange,
    value: field.value ? moment(field.value, 'HH:mm').toDate() : null,
    defaultValue: null,
  }
  if(meta && meta.touched && meta.error) {
    configTimePicker.error = true;
    configTimePicker.helperText = meta.error;
  }
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TimePicker
        {...configTimePicker}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
      <FormHelperText>{configTimePicker.helperText}</FormHelperText>
    </LocalizationProvider>
      
   )
}
 
export default TimePickerUI