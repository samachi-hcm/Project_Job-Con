import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

{
  /*
<Controller
  control={control} // useFormから取得したcontrol
  name="birthDay" // 登録したいフィールド名
  {...action}
  render={({ field: { onChange, value, ref, ...restField } }) => (
     <DatePicker
        selected={value}
        onChange={date => onChange(date)}
        dateFormat="yyyy/MM/dd"
        placeholderText="生年月日"
        showYearDropdown
        dropdownMode="select"
      />
  )}
/>

*/}

const Calender = ({control,action}) => {
  return (
    <>
    </>
    
  )
}


export default Calender