import * as Toast from "@radix-ui/react-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "pages/routes";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

const client = new QueryClient();

const App = () => (
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <Toast.Provider>
        <RouterProvider router={router} />

        <Toast.Viewport />
      </Toast.Provider>
    </QueryClientProvider>
  </RecoilRoot>
);

export default App;
