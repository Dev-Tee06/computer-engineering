import './Adekunle3DCar.css';

function Box({ className, children }) {
  return (
    <div className={`adk-box ${className}`}>
      <div className="f" /><div className="k" />
      <div className="r" /><div className="l" />
      <div className="t" /><div className="u" />
      {children}
    </div>
  );
}

export default function Adekunle3DCar() {
  return (
    <div className="adk-wrap">
      <div className="adk-car">
        <Box className="adk-body" />
        <Box className="adk-cabin" />
        <div className="adk-light" />
        <div className="adk-light b" />
        <div className="adk-wheel adk-w1" />
        <div className="adk-wheel adk-w2" />
        <div className="adk-wheel adk-w3" />
        <div className="adk-wheel adk-w4" />
      </div>
    </div>
  );
}
