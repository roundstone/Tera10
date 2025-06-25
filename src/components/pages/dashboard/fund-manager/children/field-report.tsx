import { useState } from "react";
import { Check } from "lucide-react";
import AppModal from "@/components/common/modal";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  images: string[];
}

const FieldReport = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Foundation Inspection",
      description: "Check for cracks and structural integrity",
      completed: true,
      images: [
        "https://via.placeholder.com/200x120/000000/FFFFFF?text=Image+1",
        "https://via.placeholder.com/200x120/000000/FFFFFF?text=Image+2",
        "https://via.placeholder.com/200x120/000000/FFFFFF?text=Image+3",
      ],
    },
    {
      id: 2,
      title: "Framing Review",
      description: "Verify alignment and support beams",
      completed: true,
      images: [],
    },
    {
      id: 3,
      title: "Roofing Confirmation",
      description: "Ensure waterproof sealing",
      completed: false,
      images: [],
    },
  ]);

  const [viewingTaskId, setViewingTaskId] = useState<number | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [viewedImage, setViewedImage] = useState("");

  const toggleTaskCompletion = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleViewImages = (taskId: number) => {
    if (viewingTaskId === taskId) {
      setViewingTaskId(null); // toggle off
    } else {
      setViewingTaskId(taskId);
    }
  };

  const openImageModal = (image: string) => {
    setViewedImage(image);
    setShowImageModal(true);
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="border border-gray-200 p6 rounded-lg bg-white overflow-hidden">
      {/* Header */}
      <div className="mb-6 bg-[#F9F9F9] p-3">
        <h2 className="text-base font-medium text-gray-700">
          Tasks Checklist ({completedTasks}/{tasks.length})
        </h2>
      </div>

      {/* Task List */}
      <div className="space-y-6 px-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border-b border-gray-100 pb-6 last:border-b-0"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text font-normal text-gray-800 mb-1">
                  {task.title}
                </h3>
                <p className="text-gray-500 font-thin text-sm">
                  {task.description}
                </p>
              </div>
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ml-4 ${
                  task.completed
                    ? "bg-[#10B981] border-[#10B981] text-white"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {task.completed && <Check className="w-4 h-4" />}
              </button>
            </div>

            {/* Only show View Images if there are images */}
            {task.images.length > 0 && (
              <div>
                <button
                  onClick={() => handleViewImages(task.id)}
                  className="text-[#4B96D8] hover:text-[#4B96D8]/80 text-sm font-medium mb-3 flex items-center gap-1"
                >
                  {viewingTaskId === task.id ? "Hide Images" : "View Images"}
                </button>

                {/* Show thumbnails only for the selected task */}
                {viewingTaskId === task.id && (
                  <div className="flex gap-3">
                    {task.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Task ${task.id} image ${index + 1}`}
                        className="w-20 h-12 object-cover rounded cursor-pointer hover:opacity-80"
                        onClick={() => openImageModal(image)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal to view image full */}
      <AppModal
        open={showImageModal}
        setOpen={setShowImageModal}
        className="sm:max-w-[588px] bg-white !p-0 !m-0"
        title="Task Image"
      >
        <img
          src={viewedImage}
          alt="Viewed Task Image"
          className="w-full h-100 object-cover rounded-lg bg-gray-100"
        />
      </AppModal>
    </div>
  );
};

export default FieldReport;
