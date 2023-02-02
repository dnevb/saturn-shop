import { Button, Page } from "components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthHeader } from "states/auth";
import f from "utils/f";
import ProductForm from "./form";

const ProductCreatePage = () => {
  const headers = useAuthHeader();
  const nav = useNavigate();
  const methods = useForm({ defaultValues: { currency: "USD" } });
  const submit = methods.handleSubmit((values) =>
    f
      .post("/catalog/products", values, { headers })
      .then(({ data }) => nav(`../${data["_id"]}`))
  );

  return (
    <Page
      title="Create new Product"
      actions={<Button onClick={submit}>Create</Button>}
    >
      <ProductForm {...methods} />
    </Page>
  );
};

export default ProductCreatePage;
