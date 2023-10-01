"use client";

import type { UserResponse } from "@/api/@types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiClient } from "@/lib/aspida";
import {
  ageMap,
  compositionMap,
  genderMap,
  homeMap,
  occupationMap,
} from "@/types/user";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const map = {
  age: ageMap,
  gender: genderMap,
  occupation: occupationMap,
  home: homeMap,
  composition: compositionMap,
} as const;

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<UserResponse | null>(null);

  const fetchUser = useCallback(async () => {
    const user = await apiClient.api.user.get();
    if (user.status === 200) {
      return user.body;
    } else {
      return null;
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUser();
      if (!user) {
        router.push("/register");
      } else {
        setUser(user);
      }
    };
    getUser();
  }, []);

  return (
    <main>
      <h1 className="text-xl py-4">Home</h1>
      {user ? (
        <>
          <Table>
            <TableCaption>User Information</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(user).map(([key, value]) => {
                return (
                  <TableRow key={key}>
                    <TableCell className="font-medium">{key}</TableCell>
                    <TableCell>
                      {key === "people" || key === "id"
                        ? value
                        : Object.getOwnPropertyDescriptor(map, key)?.value[
                            value
                          ]}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <p className="pt-4 opacity-70">
            Do you want to delete a user? Click{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => {
                apiClient.api.user.delete().then(() => {
                  router.push("/register");
                });
              }}
            >
              here
            </span>
            !
          </p>
        </>
      ) : (
        <p>loading...</p>
      )}
    </main>
  );
}
