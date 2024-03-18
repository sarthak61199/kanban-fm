"use client";

import { createOrganisation } from "@/actions/organisation";
import {
  CreateOrganisationType,
  createOrganisationSchema,
} from "@/schemas/oraganisation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function OrganisationDetailsForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<CreateOrganisationType>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createOrganisationSchema),
  });

  const onSubmit = (values: CreateOrganisationType) => {
    startTransition(async () => {
      try {
        await createOrganisation(values);
        toast.success("Organisation registered successfully");
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-neutral-100 p-6 space-y-6 w-[500px] rounded-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="ACME Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          Next
        </Button>
      </form>
    </Form>
  );
}
