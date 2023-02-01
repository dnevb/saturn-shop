import { Button, Page } from "components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthHeader } from "states/auth";
import f from "utils/f";
import CategoryForm from "./form";

const CategoryCreatePage = () => {
  const headers = useAuthHeader();
  const methods = useForm();
  const nav = useNavigate();
  const submit = methods.handleSubmit((values) =>
    f
      .post("/catalog/categories", values, { headers })
      .then(() => nav(".."))
  );
  const loading = methods.formState.isSubmitting;
  const disabled = !methods.formState.isValid || loading;

  return (
    <Page
      title="Create a new category"
      actions={
        <Button disabled={disabled} loading={loading} onClick={submit}>
          Save
        </Button>
      }
    >
      <CategoryForm {...methods} />
    </Page>
  );
};

export default CategoryCreatePage;
