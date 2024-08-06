import { useContent } from "../context/ListContext";

export default function TotalItemsReady() {
  const { listReady } = useContent();
  return (
    <div className="text-xl font-medium text-center">
      <span className="text-accent-400">{listReady.length}</span> items ready
    </div>
  );
}
