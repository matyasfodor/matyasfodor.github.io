import "./Toggle.scss";

const Toggle = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: () => void;
}) => {
  return (
    <div className="Toggle">
      <div className="label">🌞</div>
      <label className="switch">
        <input type="checkbox" checked={value} onChange={onChange} />
        <span className="slider round"></span>
      </label>
      <div className="label">🌒</div>
    </div>
  );
};

export default Toggle;
