import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';
import { cn } from "@/lib/utils";

export const profileTabs = [
    {
        label: "Business Identity",
        fields: [
            { label: "Company Name", value: "MJ Realty NG" },
            { label: "Type of Entity", value: "LLC" },
            { label: "Business Registration No.", value: "2328299102" },
            { label: "County of Incorporation", value: "Nigeria" },
            { label: "Date of Incorporation", value: "22-12-2024" },
            { label: "Certificate", value: <a href="#">View</a> },
        ],
    },
    {
        label: "Contact Person",
        fields: [
            { label: "Full Name", value: "Jonh doe" },
            { label: "Postion/Title", value: "Sales man" },
            { label: "Email", value: "j@gmail.com" },
            { label: "Phone", value: "081" },
            { label: "Goverment Issued ID", value: <a href="#">View</a> },
        ],
    },
    {
        label: "Business/Banking Info",
        fields: [
            { label: "Company Address", value: "No. 2 Helwsh Street. Sango Ota - Lagos State" },
            { label: "City", value: "Sango" },
            { label: "State/Province", value: "Lagos" },
            { label: "Postal/Zip Code", value: "83728" },
            { label: "Country", value: "Nigeria" },
            { label: "Bank Name", value: "UBA" },
            { label: "Bank Account", value: "20742837732" },
            { label: "BVN", value: "221477499**" },
            { label: "Account Type", value: "Checking" },
            { label: "Government Issued ID", value: <a href="#">View</a> },
        ],
    },
    {
        label: "Project Readiness",
        fields: [
            { label: "Projection Specialization", value: "Real Estate" },
            { label: "Number of Completed Projects", value: "1" },
            {
                label: "Portfolio",
                value: (
                    <div className="flex gap-2 underline">
                        <a href="#">View</a>
                        <a href="#">Update</a>
                    </div>
                ),
            },
            {
                label: "Brief Bio",
                value: (
                    <div className="space-y-1 text-right">
                        <p>Update Bio Update BioUpdate</p>
                        <p>BioUpdate Bio Update Bio Update</p>
                        <p>BioUpdate BioUpdate BioUpdate</p>
                        <p>Bio Update BioUpdate BioUpdate Bio</p>
                        <a href="#" className="underline">Update Bio</a>
                    </div>
                ),
            },
            { label: "Website", value: "www.cosgroveprop.com" },
        ],
    },
];

const ProfileField = ({ label, value }) => {
    return (
        <div className="flex justify-between items-center py-1">
            <span className="text-sm font-medium text-gray-600">{label}</span>
            <span className="text-sm text-gray-500 font-medium">{value}</span>
        </div>
    );
};

const ProfilePage: React.FC = () => {

    const [activeTab, setActiveTab] = useState(profileTabs[0].label);

    const currentTab = profileTabs.find((tab) => tab.label === activeTab);

    const handleEditProfile = () => {
        console.log('Edit profile clicked');
    };

    return (
        <div className="grid grid-cols-4 gap-3 w-full">
            <div>
                <div className="w-full p-6 text-center rounded-lg border col-span-1 bg-gradient-to-b from-[#FDF9E4] to-white">
                    <div className="relative inline-block mb-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden border border4">
                            <img
                                src="/api/placeholder/80/80"
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <User className="w-10 h-10 text-gray-500 hidden" />
                        </div>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">cosgroove.ng</h2>
                    <Button onClick={handleEditProfile} variant="outline"> Edit Profile</Button>
                </div>
            </div>


            {/* Main Content */}
            <div className="w-full col-span-3 ">
                <div className="w-full bg-white border rounded-lg min-h[794px]">
                    <h1 className="text-xl text-gray-900 mb- border-b p-3">Profile Information</h1>

                    <div className="flex gap-2 min-h-[794px]">
                        <div className=" min-w-[286px] border-r p-3">
                            {/*  Menu Items */}
                            {profileTabs.map((item) => {
                                // const IconComponent = item.icon;
                                return (
                                    <div key={item.label} className="mb-2">
                                        <button
                                            onClick={() => setActiveTab(item.label)}
                                            className={cn(
                                                "w-full text-left px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 flex items-center gap-3",
                                                item.label === activeTab && "bg-[#F8F4E5] border-t-2 border-[#EBA10E]"
                                            )}

                                        >
                                            {item.label}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        {/* Business Identity Form */}
                        <div className="p-3 w-full">

                            <div className="space-y-6 w-full">
                                {currentTab?.fields?.map((field, idx) => (
                                    <ProfileField key={idx} label={field.label} value={field.value} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
