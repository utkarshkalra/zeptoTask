import { data } from "./data";
import App from "./Component/App";

export default function Home() {
  const originalData: Array<Data> = data;
  return <App originalData={originalData} />;
}
