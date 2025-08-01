
"use client";
import { DollarSign } from "lucide-react";
import { TitleBlock } from "../TitleBlock";
import { CoursePriceProps } from "./CoursePrice.types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { SelectLabel } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

export function CoursePrice(props: CoursePriceProps) {
    const { idCourse, priceCourse } = props;
    const [price, setPrice] = useState<string | undefined>(priceCourse || "Gratis");

    const onChangePrice = async () => {
        axios.patch(`/api/course/${idCourse}`, {
            price : price
        })
        toast("Precio actualizado 👍");
    }

    return (
        <div className="p-6 bg-white rounded-md h-fit">
            <TitleBlock title="Precio del curso" icon={DollarSign} />
            <Select onValueChange={setPrice} defaultValue={price}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un precio del curso" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Precios del curso</SelectLabel>
                        <SelectItem value="Gratis">Gratis</SelectItem>
                        <SelectItem value="380">$380</SelectItem>
                        <SelectItem value="400">$400</SelectItem>
                        <SelectItem value="550">$550</SelectItem>
                        <SelectItem value="600">$600</SelectItem>

                    </SelectGroup>
                </SelectContent>

            </Select>
            <Button onClick={onChangePrice} disabled={!price} className="mt-3">
                Guardar precio
            </Button>
        </div>
    )
}