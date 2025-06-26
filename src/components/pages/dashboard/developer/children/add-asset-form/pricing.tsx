import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

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
import { pricingSchema } from "@/schemas/add-asset-schema";
import { Calculator } from "iconsax-react";
import { useAsset } from '@/context/AssetContext';
import { assetApi } from '@/api/assetApi';

type PricingFormValues = z.infer<typeof pricingSchema>;

export function PricingForm({
  onFinish,
  onPrevious,
  gotoStep,
}: {
  onFinish: () => void;
  onPrevious: () => void;
  gotoStep: (step: number) => void;
}) {
  const { state, dispatch } = useAsset();
  const [editingAssetId, setEditingAssetId] = useState<number | null>(
    null
  );
  const form = useForm<PricingFormValues>({
    resolver: zodResolver(pricingSchema),
    defaultValues: state.formData.step2 || {
      price: 0,
      unitAvailable: 0,
      maxPerIndividual: 0,
      valuation: {
        entry: 0,
        mid: 0,
        exit: 0,
      },
    },
  });



  const onSubmit = async (formData: z.infer<typeof pricingSchema>) => {
    if (editingAssetId) {
      try {

        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        const data = new FormData();
        data.append('unit_price', formData.price?.toString() || '');
        data.append('unit_available', formData.unitAvailable?.toString() || '');
        data.append('max_per_person', formData.maxPerIndividual?.toString() || '');
        data.append('valuation_entry', formData.valuation.entry?.toString() || '');
        data.append('valuation_mid', formData.valuation.mid?.toString() || '');
        data.append('valuation_exit', formData.valuation.exit?.toString() || '');



        const response = await assetApi.editUnitPrice(editingAssetId, data);

        if (response.success) {
          dispatch({ type: 'SET_STEP_DATA', payload: { step: 2, data: formData } });
          dispatch({ type: 'SET_CURRENT_STEP', payload: 3 });

          //goTo(ROUTES.ONBOARDING.DEVELOPER.VERIFY_EMAIL);
          gotoStep(3);
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
        data.append('unit_price', formData.price?.toString() || '');
        data.append('unit_available', formData.unitAvailable?.toString() || '');
        data.append('max_per_person', formData.maxPerIndividual?.toString() || '');
        data.append('valuation_entry', formData.valuation.entry?.toString() || '');
        data.append('valuation_mid', formData.valuation.mid?.toString() || '');
        data.append('valuation_exit', formData.valuation.exit?.toString() || '');



        const response = await assetApi.unitPrice(state.assetId!, data);

        if (response.success) {
          dispatch({ type: 'SET_STEP_DATA', payload: { step: 2, data: formData } });
          dispatch({ type: 'SET_CURRENT_STEP', payload: 3 });

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
    if (state.formData.step2) {
      form.reset(state.formData.step2);
    }
  }, [state.formData.step2]);

  useEffect(() => {
    if (state.editAssetId) {
      form.reset(state.formData.step2);
      setEditingAssetId(state.editAssetId)
    }
  }, []);

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Price (ppu)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="NGN 0.00"
                      type="number"
                      isNumber={true}
                      step="0.01"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="unitAvailable"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Unit Available</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" isNumber={true} placeholder="50000" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 items-end pb-1">
                <Button
                  type="button"
                  className="bg-black border-0 text-white"
                  onClick={() => {
                    const current = form.getValues("unitAvailable") || 0;
                    form.setValue("unitAvailable", current + 1);
                  }}
                >
                  +
                </Button>
                <Button
                  type="button"
                  className="bg-black border-0 text-white"
                  onClick={() => {
                    const current = form.getValues("unitAvailable") || 0;
                    if (current > 0) {
                      form.setValue("unitAvailable", current - 1);
                    }
                  }}
                >
                  -
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="maxPerIndividual"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Per Individual</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" isNumber={true} placeholder="50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-200 bg-gray-100 rounded-full"
              >
                <Calculator color="#888888" />
                Use calculator
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-md font-medium mb-2">Valuation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="valuation.entry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entry</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        isNumber={true}
                        placeholder="NGN 0.00"
                        step="0.01"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valuation.mid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mid</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        isNumber={true}
                        placeholder="NGN 0.00"
                        step="0.01"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valuation.exit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exit</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        isNumber={true}
                        placeholder="NGN 0.00"
                        step="0.01"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => onPrevious()}
              className="rounded-full border-gray-400 text-gray-00"
            >
              Back
            </Button>
            <Button type="submit" className="rounded-full">
              Save & Continue
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}
