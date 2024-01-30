export const FilterPanel = () => (
  <form style={{display: "flex", flexDirection: "row", justifyContent: "center", gap: "1rem", marginTop: "1rem"}}>
    <label>
      City Name: &nbsp;
      <input type="text"/>
    </label>
    <label>
      Min Population: &nbsp;
      <input type="range"/>
    </label>
    <button type="submit">Filter</button>
  </form>
)