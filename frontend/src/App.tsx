import { MantineProvider } from "@mantine/core";
import "./App.css";
import Router from "./components/Router";
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider>
      <Router />
    </MantineProvider>
  );
}

export default App;
