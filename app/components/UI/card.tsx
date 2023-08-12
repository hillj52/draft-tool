
const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, onClick }) => (
  <div className={`card ${className}`} onClick={onClick}>
    {children}
  </div>
);

export default Card;