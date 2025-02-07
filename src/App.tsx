import { MantineProvider, Container } from "@mantine/core";
import Scene from "./features/building-builder/Scene";
import { theme } from "./theme";

function App() {
  return (
    <MantineProvider theme={theme}>
      <Container fluid p={0} h="100vh" w="100vw">
        <Scene />
      </Container>
    </MantineProvider>
  );
}

export default App;
