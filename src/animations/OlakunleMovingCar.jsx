import './OlakunleMovingCar.css';

export default function OlakunleMovingCar() {
  return (
    <div className="olk-wrap">
      <div className="olk-road" />
      <div className="olk-car">
        <div className="olk-roof" />
        <div className="olk-body" />
        <div className="olk-wheel front" />
        <div className="olk-wheel back" />
      </div>
    </div>
  );
}
