/* eslint-disable no-unused-vars */
import { FormFieldType } from "@/types/enums";

import RenderInput from "../RenderInput";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";



const CustomFormField = (props: ICustomFormField) => {
  const { control, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
