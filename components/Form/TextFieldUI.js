import { TextField } from "@mui/material"
import { useField, useFormikContext  } from "formik"
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircle from '@mui/icons-material/AccountCircle'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import HomeIcon from '@mui/icons-material/Home'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import NumbersIcon from '@mui/icons-material/Numbers'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'

const TextFieldUI = ({
    name,
    IconAdornment,
    ...otherProps
}) => {

    //input Adornment
    const InputIcon =   IconAdornment === "name" ? <AccountCircle/> : 
                        IconAdornment === "email" ? <EmailIcon/> : 
                        IconAdornment === "phone" ? <LocalPhoneIcon/> : 
                        IconAdornment === "address" ? <HomeIcon/> : 
                        IconAdornment === "password" ? <LockIcon/> :
                        IconAdornment === "number" ? <NumbersIcon/> :
                        IconAdornment === "money" ? <AttachMoneyIcon/> :
                        IconAdornment === "passport" ? <AssignmentIndIcon/> :
                        null

    const [field, meta] = useField(name)
    const { setFieldValue } = useFormikContext()

    const onChange = (event) => {
        setFieldValue(name, event.target.value)
    }


    const configTextField = {
        ...field,
        ...otherProps,
        variant: "outlined",
        fullWidth: true,
        onChange: onChange,
        value : field.value,
    }

    if (meta && meta.touched && meta.error) {
        configTextField.error = true
        configTextField.helperText = meta.error
    }

    return ( 
        <TextField 
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    {InputIcon}
                </InputAdornment>
            ),
            }} 
            {...configTextField}
        />
     );
}
 
export default TextFieldUI