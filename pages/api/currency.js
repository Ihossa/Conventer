import {http} from "./http";

export const fetchCurrencies = async () => {
  try {
    return await http.get('/p24api/pubinfo?exchange&json&coursid=11')
  } catch (err){
    console.error(err)
  }

}
