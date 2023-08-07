"use client";

const Heading = ({ title, subtitle, center, className="" }) => {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      {title && <div className="text-2xl font-bold">{title}</div>}
      <div className={`font-light text-neutral-500 mt-2 ${className}`}>{subtitle}</div>
    </div>
  );
};

export default Heading;
