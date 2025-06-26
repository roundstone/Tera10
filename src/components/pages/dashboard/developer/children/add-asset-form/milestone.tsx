import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { formatDateForLaravel } from "@/utils/string";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Add,
  Calendar as CIcon,
  CloseCircle,
  Edit2,
  Trash,
} from "iconsax-react";
import { cn } from "@/lib/utils";
import { milestonesFormSchema } from "@/schemas/add-asset-schema";
import { formatDateRange } from "@/utils/string";
import { useAsset } from '@/context/AssetContext';
import { assetApi } from '@/api/assetApi';
import { stat } from "fs";

// Define milestone interface
interface MilestoneProps {
  id: string;
  phase: string;
  title: string;
  startDate: Date;
  endDate: Date;
  activities?: string;
  images?: FileList | null;
}

type FormData = z.infer<typeof milestonesFormSchema>;

const MilestonesForm = ({
  onFinish,
  onPrevious,
}: {
  onFinish: () => void;
  onPrevious: () => void;
}) => {
  // State for milestones list
  const { state, dispatch } = useAsset();
  const [files, setFiles] = useState<File[] | null>(null);


  const [milestones, setMilestones] = useState<MilestoneProps[]>([
    // {
    //   id: "1",
    //   phase: "Phase 1",
    //   title: "Project Initiation",
    //   startDate: new Date("2025-02-01"),
    //   endDate: new Date("2025-02-15"),
    // },
  ]);
  const [showForm, setShowForm] = useState(false)

  // State to track if we're in edit mode and which milestone is being edited
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(
    null
  );

  // Setup form with zod resolver
  const form = useForm<FormData>({
    resolver: zodResolver(milestonesFormSchema),
    defaultValues: {
      milestones: [
        {
          name: "",
          startDate: new Date(),
          endDate: new Date(),
          images: null,
          activities: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "milestones",
  });

  // Generate a unique ID
  const generateId = () => {
    return Date.now().toString();
  };

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    // Process the milestone being edited or create a new one
    if (editingMilestoneId) {
      // Update existing milestone
      const currentMilestone = data.milestones[0];


      try {

        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        const fdata = new FormData();

        fdata.append('phase_name', currentMilestone.name);
        fdata.append('start_date', formatDateForLaravel(currentMilestone.startDate.toString()) || '');
        fdata.append('end_date', formatDateForLaravel(currentMilestone.endDate.toString()) || '');
        fdata.append('activities', currentMilestone.activities);

        if (files && files.length > 0) {
          files.forEach((file) => {
            fdata.append('files[]', file); // ✅ Append each file individually
          });
        }



        //const response = await assetApi.unitPrice(state.assetId!, data);
        const response = await assetApi.editMilestone(editingMilestoneId, fdata);

        if (response.success) {

          fetchMilestones(response.data?.data.asset_id);

        } else {
          dispatch({ type: 'SET_ERROR', payload: response.message });
        }
      } catch (error) {
        console.log("error>>", error);
        dispatch({ type: 'SET_ERROR', payload: 'An error occurred' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }

      // Reset form and exit edit mode
      setEditingMilestoneId(null);
      form.reset({
        milestones: [
          {
            name: "",
            startDate: new Date(),
            endDate: new Date(),
            images: null,
            activities: "",
          },
        ],
      });
    } else {
      // Add all new milestones from the form
      const newMilestones = data.milestones.map((formMilestone) => ({
        id: generateId(),
        phase: formMilestone.name,
        title: formMilestone.name,
        startDate: formMilestone.startDate,
        endDate: formMilestone.endDate,
        activities: formMilestone.activities,
        images: formMilestone.images,
      }));

      try {

        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        const fdata = new FormData();

        fdata.append('phase_name', newMilestones[0].title);
        fdata.append('start_date', formatDateForLaravel(newMilestones[0].startDate.toString()) || '');
        fdata.append('end_date', formatDateForLaravel(newMilestones[0].endDate.toString()) || '');
        fdata.append('activities', newMilestones[0].activities);

        if (files && files.length > 0) {
          files.forEach((file) => {
            fdata.append('files[]', file); // ✅ Append each file individually
          });
        }



        //const response = await assetApi.unitPrice(state.assetId!, data);
        const response = await assetApi.milestone(state.assetId!, fdata);

        if (response.success) {

          dispatch({ type: 'SET_CURRENT_STEP', payload: 3 });
          dispatch({ type: 'SET_ASSET_ID', payload: response.data?.data.asset_id });
          fetchMilestones(response.data?.data.asset_id);

        } else {
          dispatch({ type: 'SET_ERROR', payload: response.message });
        }
      } catch (error) {
        console.log("error>>", error);
        dispatch({ type: 'SET_ERROR', payload: 'An error occurred' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }



      // Reset form
      form.reset({
        milestones: [
          {
            name: "",
            startDate: new Date(),
            endDate: new Date(),
            images: null,
            activities: "",
          },
        ],
      });



    }
    // Only finish the process if requested by user
    if (data.finish) {
      //onFinish();
    }
  };

  // Handle editing a milestone
  const handleEditMilestone = (id: string) => {
    const milestoneToEdit = milestones.find((m) => m.id === id);

    if (milestoneToEdit) {
      setEditingMilestoneId(id);


      setShowForm(true);

      form.reset({
        milestones: [{
          name: milestoneToEdit.phase,
          startDate: milestoneToEdit.startDate,
          endDate: milestoneToEdit.endDate,
          images: milestoneToEdit.images || null,
          activities: milestoneToEdit.activities || "",
        }
        ]
      });

      // Scroll to form
      setTimeout(() => {
        const formElement = document.querySelector("form");
        if (formElement) {
          formElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };


  // Add a new empty milestone form field
  const handleAddNewMilestoneField = () => {
    /*append({
      name: "",
      startDate: new Date(),
      endDate: new Date(),
      images: null,
      activities: "",
    });*/

    setShowForm(true);

    // Scroll to bottom of form
    setTimeout(() => {
      const formElement = document.querySelector("form");
      if (formElement) {
        formElement.scrollTo({
          top: formElement.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingMilestoneId(null);
    form.reset({
      milestones: [
        {
          name: "",
          startDate: new Date(),
          endDate: new Date(),
          images: null,
          activities: "",
        },
      ],
    });
  };

  const fetchMilestones = async (assetId: number) => {
    try {
      const response = await assetApi.getMilestones(assetId);
      if (response.success) {

        const formattedMilestones = response.data?.data.map((milestone: any) => ({
          id: milestone.id.toString(),
          phase: milestone.phase_name,
          title: milestone.phase_name,
          startDate: new Date(milestone.start_date),
          endDate: new Date(milestone.end_date),
          activities: milestone.activities || "",
          images: null
        }));
        setMilestones(formattedMilestones);
        if (formattedMilestones.length == 0) {
          setShowForm(true);
        }
        else {
          setShowForm(false);
        }
      }
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  };

  const handleDeleteMilestone = async (milestoneId: string) => {
    try {
      const response = await assetApi.deleteMilestone(milestoneId);
      if (response.success) {

        fetchMilestones(state.assetId!)
      }
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  };

  // useEffect(() => {
  //   if (state.assetId) {
  //     fetchMilestones(state.assetId);
  //   }
  // }, [state.formData.step3]);

  useEffect(() => {
    if (state.assetId) {
      fetchMilestones(state.assetId);
    }
  }, []);





  return (
    <>
      {milestones.length > 0 && (
        <div className="max-w-3xl mx-auto">
          <div
            className={cn(
              {
                "grid grid-cols-1 md:grid-cols-2 gap-8": milestones.length < 2,
              },
              "items-center"
            )}
          >
            {/* Milestone Cards Grid */}
            <div className="grid grid-cols-3 gap-2 overflow-auto w-full h-100">
              {milestones.map((milestone, index) => (
                <Card
                  key={milestone.id}
                  className="mb-4 p-2 shadow-none border-gray-200 border w-full "
                >
                  <CardContent className="p-2">
                    <div className="mb-2">
                      <div className="h-32 bg-gray-100 rounded-xl"></div>
                    </div>

                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-medium text-slate-700">
                        Phase {index + 1}
                      </h3>
                      <div className="flex gap-">
                        <Button
                          variant="ghost"
                          onClick={() => handleDeleteMilestone(milestone.id)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Trash size={24} color="#667085" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => handleEditMilestone(milestone.id)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Edit2 size={24} color="#667085" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-lg text-slate-600 mb-4">
                      {milestone.title}
                    </p>

                    <div className="text-gray-500 font-medium text-sm self-baseline">
                      {formatDateRange(milestone.startDate, milestone.endDate)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Add New Milestone Card */}
            {milestones.length > 0 && (
              <div className="flex flex-col items-center justify-center self-center">
                <div className="text-center mb-3">
                  <h2 className="text-lg font-thin text-gray-700 mb-2">
                    Add another milestone to keep
                    <br /> your project on track
                  </h2>
                </div>

                <Button
                  type="button"
                  className="bg-[#F4F4F5] border-[#E7E9F1] text-[#667085] rounded-full"
                  onClick={handleAddNewMilestoneField}
                >
                  <Add size={16} color="#777777" /> Add New Milestone
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="my-8 h-px bg-gray-200" />
      {showForm && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-3xl mx-auto"
          >
            {editingMilestoneId && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-blue-700 font-medium">
                  Editing milestone:{" "}
                  {milestones.find((m) => m.id === editingMilestoneId)?.phase}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleCancelEdit}
                    className="ml-4 text-blue-700 hover:text-blue-900"
                  >
                    Cancel Edit
                  </Button>
                </p>
              </div>
            )}

            {fields.map((field, index) => (
              <div key={field.id} className="space-y-6 max-w-3xl mx-auto">
                <FormField
                  control={form.control}
                  name={`milestones.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phase Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter name of milestone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name={`milestones.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild className="bg-white">
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal rounded-xl py-5 border-gray-300",
                                  !field.value && "text-gray-300"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CIcon
                                  size={16}
                                  color="#555555"
                                  className="ml-auto h-4 w-4 opacity-50"
                                />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-white"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`milestones.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild className="bg-white">
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal rounded-xl py-5 border-gray-300",
                                  !field.value && "text-gray-300"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CIcon
                                  size={16}
                                  color="#555555"
                                  className="ml-auto h-4 w-4 opacity-50"
                                />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-white"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`milestones.${index}.images`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Media Files</FormLabel>
                      <FormControl>
                        <div className="border border-dashed bg-white border-gray-300 p-7 rounded-xl text-center">
                          <input
                            id={`files-${index}`}
                            type="file"
                            accept=".jpg,.jpeg,.png,.gif"
                            multiple
                            hidden
                            onChange={(e) => {
                              const selectedFiles = e.target.files
                                ? Array.from(e.target.files)
                                : null;
                              setFiles(selectedFiles);
                              field.onChange(selectedFiles);
                            }}

                          />
                          <label
                            htmlFor={`files-${index}`}
                            className="border rounded-xl border-gray-400 font-medium p-2 text-sm cursor-pointer hover:bg-gray-50"
                          >
                            Add Files
                          </label>
                          <p className="text-sm text-gray-500 mt-2">
                            Accepts .gif, .jpg, and .png
                          </p>
                          {field.value && field.value.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-4 justify-center">
                              {field.value.map((file: File, fileIndex: number) => (
                                <div key={fileIndex} className="relative group">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt="Preview"
                                    className="w-24 h-24 object-cover rounded"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      // Remove selected file
                                      const updatedFiles = field.value.filter(
                                        (_: File, i: number) => i !== fileIndex
                                      );
                                      field.onChange(updatedFiles);
                                    }}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`milestones.${index}.activities`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activities</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Tell us the activities involved for this project/Milestone"
                          className="h-32"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex items-center gap-1 text-sm text-gray-600"
                    onClick={() => remove(index)}
                  >
                    <CloseCircle color="#666666" size={14} />
                    <span>Remove</span>
                  </Button>
                )}
              </div>
            ))}


            <Button
              type="submit"
              className="rounded-full"
              onClick={() => {
                form.setValue("finish", true);
              }}
            >
              Save & Continue
            </Button>


          </form>
        </Form>
      )}
      <div className="flex gap-3 justify-end items-center mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="rounded-full border-gray-400 text-gray-700"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="rounded-full"
          onClick={onFinish}
        >
          Continue
        </Button>
        <input type="hidden" {...form.register("finish")} />
      </div>
    </>
  );
};

export default MilestonesForm;