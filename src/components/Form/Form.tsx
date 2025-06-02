import { useState } from "react";
import { countries } from "../../data/countries";
import type { SearchType } from "../../types";
import styles from "../Form/Form.module.css";
export default function Form() {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=> {
    setSearch({
        ...search,
        [e.target.name] : e.target.value
    })
  }
  return (
    <form className={styles.form}>
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
          <option>--Seleccione un Pais--</option>
          {countries.map((country) => (
            <option value={country.code} key={country.code}>
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
