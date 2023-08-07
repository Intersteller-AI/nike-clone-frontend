import React from "react";
import Heading from "../inputs/Heading";
import Input from "../inputs/Input";


const NameSubtitle = ({isLoading, register, errors}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="Name of your product" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required        
      />
      <Input
        id="subtitle"
        label="Subtitle"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
};

export default NameSubtitle;
