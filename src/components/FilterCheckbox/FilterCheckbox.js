import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <>
      <div className="checkbox">
        <span className="checkbox__text">Короткометражки</span>
        <input className="checkbox__input" type="checkbox" id="switch" />
        <label className="checkbox__label" htmlFor="switch"></label>
      </div>
    </>
  );
};

export default FilterCheckbox;