"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import { joinOrganisation } from "@/actions/organisation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  JoinOrganisationType,
  joinOrganisationSchema,
} from "@/schemas/oraganisation";

export default function InviteCode({
  organisations,
}: {
  organisations: { id: string; name: string }[];
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<JoinOrganisationType>({
    defaultValues: {
      organisationId: "",
      code: "",
    },
    resolver: zodResolver(joinOrganisationSchema),
  });

  const onSubmit = (values: JoinOrganisationType) => {
    startTransition(async () => {
      try {
        await joinOrganisation(values);
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
        className="flex flex-col gap-4 items-center"
      >
        <FormField
          control={form.control}
          name="organisationId"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Select an Organisation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {organisations.map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} />
                      ))}{" "}
                    </InputOTPGroup>
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
