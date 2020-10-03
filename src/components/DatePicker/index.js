import React, { useRef, useState, useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useField } from '@unform/core'
import { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/pt-BR'
import 'react-datepicker/dist/react-datepicker.css'
import './styles.css'
registerLocale('pt-BR', es)

const DatePicker = ({ name, ...rest }) => {
  const datepickerRef = useRef(null)
  const { fieldName, registerField, defaultValue } = useField(name)
  const [date, setDate] = useState(defaultValue || null)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref) => {
        ref.clear()
      },
    })
  }, [fieldName, registerField])

  return (
    <>
      <span style={{ color: '#ddd', margin: '15px 0 10px' }}>
        Selecione a data e o horário:
      </span>
      <ReactDatePicker
        selected={date}
        minDate={new Date()}
        ref={datepickerRef}
        onChange={setDate}
        locale="pt-BR"
        {...rest}
        showTimeSelect
        showDisabledMonthNavigation
        timeCaption="Horário"
        dateFormat="dd/MM/yy HH:mm"
        className="date-picker"
        required
      />
    </>
  )
}
export default DatePicker
