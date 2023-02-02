import { Page, Spinner } from "components";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAuthHeader } from "states/auth";
import f from "utils/f";
import ProductForm from "./form";

const ProductDetailPage = () => {
  const headers = useAuthHeader();
  const { id } = useParams();
  const methods = useForm({
    defaultValues: () =>
      f(`/catalog/products/${id}`, { headers }).then(({ data }) => data),
  });
  const name = methods.watch("name");

  if (methods.formState.isLoading) return <Spinner />;

  return (
    <Page title={`${name} Product`}>
      <ProductForm {...methods} />
    </Page>
  );
};

export default ProductDetailPage;
