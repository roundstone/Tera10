import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Buildings2 } from "iconsax-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { basicSchema } from "@/schemas/add-asset-schema";
import { Button } from "@/components/ui/button";
import { useAsset } from '@/context/AssetContext';
import { assetApi } from '@/api/assetApi';

type FormData = z.infer<typeof basicSchema>;

const BasicForm = ({ onFinish }: { onFinish: () => void }) => {
  const { state, dispatch } = useAsset();
  const [files, setFiles] = useState<File[] | null>(null);
  const [editingAssetId, setEditingAssetId] = useState<number | null>(
    null
  );
  const [data, setData] = useState<FormData>({
    propertyName: "",
    propertyType: "",
    location: "",
    description: "",
    mediaFiles: undefined,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(basicSchema),
    defaultValues: state.formData.step1 || data, // ✅ Load saved data if exists
  });


  const onSubmit = async (formData: z.infer<typeof basicSchema>) => {
    if (editingAssetId) {
      try {

        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        const data = new FormData();
        data.append('entity_type', formData.propertyType);
        data.append('property_name', formData.propertyName);
        data.append('property_location', formData.location);
        data.append('property_desc', formData.description);

        if (files && files.length > 0) {
          files.forEach((file) => {
            data.append('files[]', file); // ✅ Append each file individually
          });
        }


        const response = await assetApi.editbasic(editingAssetId, data);

        if (response.success) {
          dispatch({ type: 'SET_STEP_DATA', payload: { step: 1, data: formData } });
          dispatch({ type: 'SET_CURRENT_STEP', payload: 2 });
          if (response.data?.data?.asset_id) {
            dispatch({ type: 'SET_ASSET_ID', payload: response.data?.data?.asset_id });
          }
          //goTo(ROUTES.ONBOARDING.DEVELOPER.VERIFY_EMAIL);
          onFinish();
        } else {
          dispatch({ type: 'SET_ERROR', payload: response.message });
        }
      } catch (error) {
        console.log("error>>", error);
        dispatch({ type: 'SET_ERROR', payload: 'An error occurred' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
    else {
      try {

        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        const data = new FormData();
        data.append('entity_type', formData.propertyType);
        data.append('user_id', state.userId?.toString() || '');
        data.append('property_name', formData.propertyName);
        data.append('property_location', formData.location);
        data.append('property_desc', formData.description);

        if (files && files.length > 0) {
          files.forEach((file) => {
            data.append('files[]', file); // ✅ Append each file individually
          });
        }


        const response = await assetApi.basic(data);

        if (response.success) {
          dispatch({ type: 'SET_STEP_DATA', payload: { step: 1, data: formData } });
          dispatch({ type: 'SET_CURRENT_STEP', payload: 2 });
          if (response.data?.data?.asset_id) {
            dispatch({ type: 'SET_ASSET_ID', payload: response.data?.data?.asset_id });
          }
          //goTo(ROUTES.ONBOARDING.DEVELOPER.VERIFY_EMAIL);
          onFinish();
        } else {
          dispatch({ type: 'SET_ERROR', payload: response.message });
        }
      } catch (error) {
        console.log("error>>", error);
        dispatch({ type: 'SET_ERROR', payload: 'An error occurred' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

  };

  useEffect(() => {
    if (state.formData.step1) {
      form.reset(state.formData.step1);
    }
  }, [state.formData.step1]);

  useEffect(() => {
    if (state.editAssetId) {
      form.reset(state.formData.step1);
      setEditingAssetId(state.editAssetId)
    }
  }, []);



  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-[100%]">
                      <SelectValue placeholder="Select a property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="real_estate">
                      <Buildings2 color="#888888" size={32} /> Real Estate
                    </SelectItem>
                    <SelectItem value="land">
                      <Buildings2 color="#888888" size={32} /> Land
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="propertyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter asset name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-[138px]"
                    placeholder="Describe the property"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mediaFiles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Media Files</FormLabel>
                <FormControl>
                  <div className="border border-dashed bg-white border-gray-300 p-7 rounded-xl text-center">
                    <input
                      id="files"
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
                      htmlFor="files"
                      className="border rounded-xl border-gray-400 font-medium p-2 text-sm"
                    >
                      Add Files
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      Accepts .gif, .jpg, and .png
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" className="rounded-full">
              Submit Asset
            </Button>
          </div>
        </form>
        {state.error && <div className="text-[#ff0000]">{state.error}</div>}
      </Form>

    </>
  );
};

export default BasicForm;
