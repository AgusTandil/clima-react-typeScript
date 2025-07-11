import { useState } from "react";
import { countries } from "../../data/countries";
import type { SearchType } from "../../types";
import styles from "../Form/Form.module.css";
import Alert from "../Alert/Alert";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
}

export default function Form({fetchWeather}: FormProps) {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const [alert, setAlert] = useState('');

  const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=> {
    setSearch({
        ...search,
        [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    if(Object.values(search).includes('')){
      setAlert('Todos los campos son obligatorios');
      return
    }
    fetchWeather(search);
  }
  return (
    <form 
    className={styles.form}
    onSubmit={handleSubmit}
    >
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad</label>
        <input
          type="text"
          id="city"
          placeholder="Ciudad"
          name="city"
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="country">Pais</label>
        <select id="country" value={search.country} name="country" onChange={handleChange}>
          <option value="" id="">--Seleccione un Pais--</option>
          {countries.map((country) => (
            <option value={country.code} key={country.code} className="every-country">
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="submit"
        value={"Consultar Clima"}
        className={styles.submit}
      />
    </form>
  );
}
