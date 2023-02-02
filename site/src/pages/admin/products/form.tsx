import { Input, TextArea } from "components";
import SearchInput from "components/search";
import Select from "components/select";
import { FC, useRef } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

const ProductForm: FC<UseFormReturn<any>> = (props) => {
  const uri = props.watch("uri");
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form autoComplete="off" className="flex flex-col gap2 max-w-lg">
      <Input
        label="Name"
        {...props.register("name", { required: true })}
      />
      <TextArea label="Description" {...props.register("description")} />
      <Input
        label="Price"
        type="number"
        {...props.register("price", {
          min: 0,
          required: true,
          valueAsNumber: true,
        })}
      />
      <Select label="Currency" {...props.register("currency")}>
        <option value="USD">USD</option>
        <option value="COP">COP</option>
      </Select>
      <Input
        label="Stock"
        type="number"
        {...props.register("stock", {
          min: 0,
          required: true,
          valueAsNumber: true,
        })}
      />
      <Controller
        name="category"
        control={props.control}
        render={({ field }) => (
          <SearchInput
            label="Category"
            placeholder="Type something"
            url="/catalog/categories"
            itemRender={(item) => (
              <div className="flex items-center gap2">
                <img src={item["uri"]} className="h10 w10" />
                <h1>{item["name"]}</h1>
              </div>
            )}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <label onClick={() => ref.current?.click()}>
        Image
        <img src={uri || ""} className="h50 max-w-sm bg-gray-300" />
      </label>
      <div className="hidden">
        <Input
          ref={ref}
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

export default ProductForm;
