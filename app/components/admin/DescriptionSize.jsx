import React from 'react'
import Heading from '../inputs/Heading'
import Input from '../inputs/Input'

const DescriptionSize = ({isLoading, register, errors}) => {
  return (
    <div className="flex flex-col gap-8">
    <Heading
      title="Provide some description of your product"
      subtitle="what kind of speciality it has?"
    />
    <Input
      id="description"
      label="Description"
      disabled={isLoading}
      register={register}
      errors={errors}
    />
    <Heading title="Provide the existing sizes" />
    <Input
      id="size"
      label="Sizes"
      disabled={isLoading}
      register={register}
      errors={errors}
    />
  </div>

  )
}

export default DescriptionSize