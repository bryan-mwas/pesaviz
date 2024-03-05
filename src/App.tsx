import { Container } from "reactstrap";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container fluid className="d-flex justify-content-center">
        <Outlet />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
