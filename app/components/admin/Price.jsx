import React from "react";
import Heading from "../inputs/Heading";
import Input from "../inputs/Input";

const Price = ({isLoading, register, errors}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Set original price the price of your product"
        subtitle="Please give numbers only"
      />
      <Input
        id="original_price"
        label="Original price"
        formatPrice
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Heading
        title="Set the discounted price of your product"
        subtitle="Please give numbers only"
      />
      <Input
        id="price"
        label="Price"
        formatPrice
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
};

export default Price;
