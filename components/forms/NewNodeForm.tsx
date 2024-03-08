"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";
import { useDiagramStore } from "@/lib/zustand/diagramStore";

const FormSchema = z.object({
  songA: z.string().min(2, {
    message: "Song name must be at least 2 characters.",
  }),
  songB: z.string().min(2, {
    message: "Song name must be at least 2 characters.",
  }),
  action: z.string(),
});

export function NewNodeForm() {
  const addNode = useDiagramStore((state) => state.addNode);
  const addEdge = useDiagramStore((state) => state.addEdge);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      songA: "",
      songB: "",
      action: "doubles_with",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    addNode({
      id: data.songA,
      data: { label: data.songA },
      position: { x: 0, y: 0 },
    });
    addNode({
      id: data.songB,
      data: { label: data.songB },
      position: { x: 50, y: 0 },
    });
    addEdge({
      id: `${data.songA}-${data.songB}`,
      source: data.songA,
      target: data.songB,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
        <div className="grid grid-cols-3 gap-4 w-full">
          <FormField
            control={form.control}
            name="songA"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Song A</FormLabel>
                <FormControl>
                  <Input placeholder="Song name A" {...field} />
                </FormControl>
                <FormDescription>
                  This is the base song of the mix or double
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="action"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an action that pairs these two songs" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mixes_into">Mixes Into</SelectItem>
                    <SelectItem value="doubles_with">Doubles With</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="songB"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Song A</FormLabel>
                <FormControl>
                  <Input placeholder="Song name A" {...field} />
                </FormControl>
                <FormDescription>
                  This is the base song of the mix or double
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
