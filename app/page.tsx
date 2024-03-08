import NewConnectionDrawer from "@/components/drawers/newConnectionDrawer";
import { NewNodeForm } from "@/components/forms/NewNodeForm";
import ReactflowCanvas from "@/components/reactflow/canvas";

export default function Dashboard() {
  return (
    <div className="flex grow flex-row">
      {/* <div className="flex flex-col min-w-[250px] w-1/4 bg-white border-r border-gray-200 shadow-sm p-4">
        <NewNodeForm />
      </div> */}
      <NewConnectionDrawer />
      <ReactflowCanvas />
    </div>
  );
}
