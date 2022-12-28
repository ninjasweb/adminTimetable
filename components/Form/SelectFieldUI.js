import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useField, useFormikContext  } from "formik"

const SelectFieldUI = ({
  label,
  name,
  countryCodes,
  ...otherProps
}) => {
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()
  const onChange = (event) => {
    setFieldValue(name, event.target.value)
  }
  const configSelectField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    value: field.value,
    onChange: onChange,
  }
  if (meta && meta.touched && meta.error) {
    configSelectField.error = true
    configSelectField.helperText = meta.error
  }
  return ( 
          <FormControl fullWidth>
                  <InputLabel id="country_label">País</InputLabel>
                  <Select
                    {...configSelectField}
                  >
                    {Object.entries(countryCodes).map(([key, value]) => {
                      return (
                        <MenuItem key={key} value={key}>{value}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
   )
}
 
export default SelectFieldUI