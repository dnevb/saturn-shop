import { Button, Input, Page } from "components";
import Select from "components/select";

const ProductCreatePage = () => {
  return (
    <Page title="Create new Product" actions={<Button>Create</Button>}>
      <form autoComplete="off" className="flex flex-col gap2 max-w-lg">
        <Input label="Name" />
        <Input label="Price" type="number" />
        <Select label="Currency">
          <option value="USD">USD</option>
          <option value="COP">COP</option>
        </Select>
        <Input label="Stock" type="number" />
      </form>
    </Page>
  );
};

export default ProductCreatePage;
