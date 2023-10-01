"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiClient } from "@/lib/aspida";
import {
  UserFormSchema,
  UserRequestSchema,
  ageMap,
  compositionMap,
  genderMap,
  homeMap,
  occupationMap,
} from "@/types/user";

const convertToRequest = (data: z.infer<typeof UserFormSchema>) => {
  const { age, gender, occupation, home, people, composition } = data;
  const request = {
    age: parseInt(age),
    gender: parseInt(gender),
    occupation: parseInt(occupation),
    home: parseInt(home),
    people: parseInt(people),
    composition: parseInt(composition),
  };
  const result = UserRequestSchema.safeParse(request);
  if (result.success) {
    return result.data;
  } else {
    throw new Error(result.error.message);
  }
};

export function UserForm() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      people: "0",
    },
  });

  const onSubmit = (data: z.infer<typeof UserFormSchema>) => {
    setSending(true);
    const request = convertToRequest(data);
    apiClient.api.user
      .post({
        body: request,
      })
      .then((res) => {
        if (res.status === 200) {
          router.push("/");
        } else {
          console.error(res);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Age" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(ageMap).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
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
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(genderMap).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
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
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Occupation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(occupationMap).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
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
          name="home"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Home" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(homeMap).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
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
          name="people"
          render={({ field }) => (
            <FormItem>
              <FormLabel>People</FormLabel>
              <Input type="number" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="composition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Composition</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Composition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(compositionMap).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex ml-auto mr-0" disabled={sending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
