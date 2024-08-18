import React from "react";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormFieldComponent = ({ form, name, label, type = "text", placeholder = "", fieldProps = {} }) => {
  return (
    <FormItem className="flex flex-col gap-1">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input className="p-7" placeholder={placeholder} type={type} {...form.register(name)} {...fieldProps} />
      </FormControl>
      <FormMessage className="text-red-500" />
    </FormItem>
  );
};

export default FormFieldComponent;
