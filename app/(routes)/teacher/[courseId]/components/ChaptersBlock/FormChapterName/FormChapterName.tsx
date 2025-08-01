"use client"
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { FormChapterNameProps } from "./FormChapterName.types";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./FormChapterName.form";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function FormCahpterName(props: FormChapterNameProps) {
    const { setShowInputChapter, idCourse } = props;

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>)  => {
    try {
      axios.post(`/api/course/${idCourse}/chapter`, {
        title: values.title,
      })
      toast("capítulo creado🎉" );
      setShowInputChapter(false);
      router.refresh();
    } catch (error) {
        toast.error("Error al crear el capítulo 😕");
        console.log(error)
    }
    
  }

    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Ej: Introducción a la programación" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem> 
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid}>Crear</Button>
      </form>
    </Form>
    );
}