"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"



import { Cog } from "lucide-react";
import { TitleBlock } from "../TitleBlock";
import { CourseFormProps } from "./CourseForm.types";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./CourseForm.form";

import { Textarea } from "@/components/ui/textarea"


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios";
import { toast } from "sonner";

export function CourseForm(props: CourseFormProps) {

    const { course } = props;

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title:course.title || '',
      slug: course.slug || '',
      description: course.description || '',
      category: course.category || '',
      level: course.level || '',
    },
  })
 
  const onSubmit = async (values: z.infer<typeof formSchema>) =>  {
    try {
        axios.patch(`/api/course/${course.id}`, values)
        toast.success("Curso actualizado correctamente 🎉")
    } catch  {
        toast.error("algo salió mal 😕")
        
    }
  }
    return (
        <div className="p-6 bg-white rounded-md">
           <TitleBlock title="Configuración del curso" icon={Cog}/>

            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo del curso</FormLabel>
              <FormControl>
                <Input placeholder="Curso de ReactJS" {...field} />
              </FormControl>
              <FormDescription>
                Esto es lo que el usuario verá como título del curso.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url del curso</FormLabel>
              <FormControl>
                <Input placeholder="curso-react-js" {...field} disabled />
              </FormControl>
              <FormDescription>
                Es única y no se puede modificar
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la categoria del curso" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Full Stack">Full Stack</SelectItem>
                  <SelectItem value="Infraestructura">Infraestructura</SelectItem>
                  <SelectItem value="Diseño UX/UI">Diseño UX/UI</SelectItem>
                </SelectContent>
              </Select>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nivel del curso</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el nivel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent> 
                  <SelectItem value="Principiante">Principiante</SelectItem>
                  <SelectItem value="Intermedio">Intermedio</SelectItem>
                    <SelectItem value="Avanzado">Avanzado</SelectItem>
                 
                </SelectContent>
              </Select>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Pon la descripción del curso aquí"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Descripción completa del curso
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button type="submit">Guardar información</Button>
      </form>
    </Form>

        </div>
    );
}