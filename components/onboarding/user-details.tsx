"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
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
import { Onboarding } from "@prisma/client";
import { CreateUserType, createUserSchema } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { createUser } from "@/actions/user";
import { toast } from "sonner";

export default function UserDetails() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<CreateUserType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      onboardingType: Onboarding.USER,
    },
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = (values: CreateUserType) => {
    startTransition(async () => {
      try {
        await createUser(values);
        toast.success("You have successfully registered");
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
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="onboardingType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select an Onboarding Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={Onboarding.USER} />
                    </FormControl>
                    <FormLabel className="font-normal">User</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={Onboarding.ORGANISATION} />
                    </FormControl>
                    <FormLabel className="font-normal">Organisation</FormLabel>
                  </FormItem>
                </RadioGroup>
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
