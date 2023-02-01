import { Page, Spinner } from "components";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAuthHeader } from "states/auth";
import f from "utils/f";
import CategoryForm from "./form";

const CategoryDetailPage = () => {
  const { id } = useParams();
  const headers = useAuthHeader();
  const methods = useForm({
    defaultValues: () =>
      f(`/catalog/categories/${id}`, { headers }).then(({ data }) => data),
  });

  const name = methods.watch("name");

  if (methods.formState.isLoading) return <Spinner />;

  return (
    <Page title={`${name} Category`}>
      <CategoryForm {...methods} />
    </Page>
  );
};

export default CategoryDetailPage;
