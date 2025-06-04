import { useState } from "react";
import { Pin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowUp } from "iconsax-react";
import IMAGES from "@/assets/images";
import { Button } from "@/components/ui/button";
import useDashboardTitle from "@/hooks/use-page-title";

interface Project {
  id: string;
  name: string;
  category: string;
  status: "active" | "pending" | "completed";
}

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  avatar?: string;
}

const CommunicationPage = () => {
  useDashboardTitle("Communication");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState("hectres");
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [messageInput, setMessageInput] = useState("");

  const projects: Project[] = [
    {
      id: "cosgrove",
      name: "Cosgrove",
      category: "Metro Living & Business Hub",
      status: "active",
    },
    {
      id: "hectres",
      name: "Hectres",
      category: "Metro Living & Business Hub",
      status: "pending",
    },
    {
      id: "bilaad",
      name: "Bilaad",
      category: "Metro Living & Business Hub",
      status: "pending",
    },
    {
      id: "hectres2",
      name: "Hectres",
      category: "Metro Living & Business Hub",
      status: "pending",
    },
    {
      id: "hectres3",
      name: "Hectres",
      category: "Metro Living & Business Hub",
      status: "pending",
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "Hectres",
      content:
        "Here are three palettes. Let me know which one matches our brand vision best.",
      time: "10:05 AM",
      avatar: "/api/placeholder/32/32",
    },
  ];

  const phases = [
    { id: 1, name: "Phase 1", active: true },
    { id: 2, name: "Phase 2", active: false },
    { id: 3, name: "Phase 3", active: false },
    { id: 4, name: "Phase 4", active: false },
    { id: 5, name: "Phase 5", active: false },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-orange-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle message sending logic here
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="flex gap-4 h-full w-full">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white border border-gray-200 flex flex-col rounded-lg min-h-[797px]">
        {/* Header */}
        <div className="bg-black text-white p-4 rounded-lg m-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 w-ful justify-enter items-start">
              <img
                src={IMAGES.Message}
                alt="Message"
                width={42.5}
                height={38.25}
              />
              <img src={IMAGES.Message} alt="Message" className=" h-[21px]" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">
                Manage Conversations about
              </h1>
              <h2 className="font-semibold text-sm">Projects and Milestones</h2>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 mb-6">
          <div className="relative ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search Projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Projects List */}
        <div className="flex-1 px-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            PROJECTS
          </h3>
          <div className="space-y2 bg-white border rounded-lg overflow-hidden divide-y divide-[#E4E7EC]">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project.id)}
                className={`flex items-center justify-between p-3  cursor-pointer transition-colors ${
                  selectedProject === project.id
                    ? "bg-[#F8F9FB] borde border-[#E4E7EC]"
                    : "hover:bg-[#F8F9FB]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* text-[#FFAB04] */}
                  <Pin
                    className={`w-4 h-4 ${selectedProject === project.id ? "text-[#FFAB04]" : "text-gray-400"}`}
                  />
                  <div>
                    <h4 className="font-medium text-sm text-gray-900">
                      {project.name}
                    </h4>
                    <p className="text-xs text-gray-500">{project.category}</p>
                  </div>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 bg-white border border-gray-200 flex flex-col rounded-lg overflow-hidden">
        <div className="flex-1 flex flex-col w-full">
          {/* Header */}
          <div className="bg-white border- border-gray-200 ">
            <div className="flex items-center gap-3 mb-6 px-6 py-4">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-black text-white text-sm font-semibold">
                  H
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg text-gray-900">Hectres</h2>
                <p className="text-sm text-gray-500">
                  Metro Living & Business Hub
                </p>
              </div>
            </div>

            {/* Milestone Section */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4  border-t border-b px-6 py-4">
                MILESTONE
              </h3>
              <p className="text-sm text-gray-600 px-6 py-3">
                Metro Living & Business Hub
              </p>

              {/* Phase Pills */}
              <div className="flex gap-2 px-6 py-">
                {phases.map((phase) => (
                  <Button
                    key={phase.id}
                    variant="outline"
                    onClick={() => setSelectedPhase(phase.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedPhase === phase.id
                        ? "bg-yellow-400 text-black"
                        : "bg-gray50 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {phase.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex-1 flex flex-col m-6 bg-[#F9F9F9] border rounded-lg overflow-hidden shadow-lg">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <h3 className="font-semibold text-gray-900">Chats</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">
                        {message.sender[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-gray-900">
                          {message.sender}
                        </span>
                        <span className="text-xs text-gray-400">
                          {message.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{message.content}</p>
                    </div>
                  </div>
                ))}

                {/* Fund Manager Response */}
                <div className="flex items-start gap-3 justify-end mt-8">
                  <div className="flex-1 max-w-md">
                    <div className="flex items-center gap-2 mb-1 justify-end">
                      <span className="text-xs text-gray-400">10:06 AM</span>
                      <span className="font-medium text-sm text-gray-900">
                        Fund manager (you)
                      </span>
                    </div>
                    <div className="bg-[#FFF5E0] rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        Palette B looks great! Let's go with that for the
                      </p>
                    </div>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-500 text-white text-xs">
                      FM
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Write a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="pr-12 bg-gray-50 border-gray-200"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-colors cursor-pointer"
                  >
                    <ArrowUp color="#000" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPage;
