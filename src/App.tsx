import { Container } from "reactstrap";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./components/Home";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container fluid className="d-flex justify-content-center">
        <Home />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
