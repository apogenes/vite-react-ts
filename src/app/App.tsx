import { useRoutes } from "react-router-dom";
import { routes } from "@app/routes";

export default function App() {
  const elem = useRoutes(routes);
  return elem;
}
