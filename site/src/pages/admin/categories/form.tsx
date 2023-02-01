import { Input, TextArea } from "components";
import { FC, useRef } from "react";
import { UseFormReturn } from "react-hook-form";

const CategoryForm: FC<UseFormReturn> = (props) => {
  const uri = props.watch("uri");
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form className="flex flex-col gap4">
      <Input
        label="Name"
        {...props.register("name", { required: true })}
      />
      <TextArea label="Description" {...props.register("description")} />
      <div onClick={() => ref.current && ref.current.click()}>
        <label>Image</label>
        <img
          src={uri || ""}
          className="h50 max-w-sm bg-gray-200 object-cover"
        />
      </div>
      <div className="hidden">
        <Input
          ref={ref}
          label="Image"
          type="file"
          onChange={(e) => {
            if (!e.target.files) return;
            const reader = new FileReader();
            reader.onloadend = () => props.setValue("uri", reader.result);
            reader.readAsDataURL(e.target.files[0]);
          }}
        />
      </div>
    </form>
  );
};

export default CategoryForm;
