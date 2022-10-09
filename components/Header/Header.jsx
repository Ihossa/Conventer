import styles from './Header.module.scss'
import {useMemo} from "react";

export const Header = ({currencies}) => {

  const headerCurrencies = useMemo(() => {
    return currencies.filter(currencyItem => currencyItem.ccy === "USD" || currencyItem.ccy === "EUR")
  },[])

  return (
    <header className={styles.wrapper}>
      <h1>Converter</h1>
      <div className={styles['wrap-currency']}>
        {headerCurrencies.map((currency) => (
          <span key={currency.ccy} className={styles['currency-item']}>
            {`${currency.ccy} - ${currency.buy}`}
          </span>
        ))}
      </div>
    </header>
  )
}