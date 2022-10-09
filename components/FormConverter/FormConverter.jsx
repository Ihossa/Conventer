import styles from './FormConverter.module.scss'
import {useMemo, useState} from "react";
import Select from "react-select";
import {convert} from "../../utils/convertValue";


export const FormConverter = ({currencies}) => {

  const optionsCurrency = useMemo(() => {
    const listCurrency = currencies.filter(currencyItem => currencyItem.ccy === "USD" || currencyItem.ccy === "EUR")
    let options = listCurrency.map((currency) => {return {label: currency.ccy, value: currency.buy}})
    return [...options, {label: "UAH", value: 1}]
  }, [])

  const [firstValue, setFirstValue] = useState(0)
  const [firstCurrency, setFirstCurrency] = useState(optionsCurrency[0])
  const [secondValue, setSecondValue] = useState(0)
  const [secondCurrency, setSecondCurrency] = useState(optionsCurrency[0])
  const [error, setError] = useState()


  const convertFirstField = (value) => {
    setSecondValue(value)
    setFirstValue(convert(value, secondCurrency.value, firstCurrency.value))
  }

  const convertSecondField = (value) => {
    setFirstValue(value)
    setSecondValue(convert(value, firstCurrency.value, secondCurrency.value))
  }

  const changeFirstCurrency = (currency) => {
    setFirstCurrency({...currency})
    setSecondValue(convert(firstValue, currency.value, secondCurrency.value))
  }

  const changeSecondCurrency = (currency) => {
    setSecondCurrency({...currency})
    setFirstValue(convert(secondValue, secondCurrency.value, currency.value))
  }

  const verifyAndConvertData = (value, func) => {

    if(!isNaN(value)){
      error && setError(undefined)
      func(value)
    } else {
      setError('Value must be number')
    }
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <div className={styles.wrapInputCurrency}>
          <input
            className={styles.input}
            value={firstValue ?? 0}
            placeholder={"Enter number"}
            onChange={(value) => {
              verifyAndConvertData(value.target.value, convertSecondField)
            }}
          />
          <Select options={optionsCurrency} onChange={changeFirstCurrency} value={firstCurrency} />
        </div>
        <div className={styles.wrapInputCurrency}>
          <input
            type={"number"}
            className={styles.input}
            placeholder={"Enter number"}
            value={secondValue ?? 0}
            onChange={(value) => {
              verifyAndConvertData(value.target.value, convertFirstField)
            }}
          />
          <Select options={optionsCurrency} value={secondCurrency} onChange={changeSecondCurrency} />
        </div>
      </div>
      {error && <span className={styles.error}>
        {error}
      </span>}
    </div>
  )
}