import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "pages/routes";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

const client = new QueryClient();

const App = () => (
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </RecoilRoot>
);

export default App;
