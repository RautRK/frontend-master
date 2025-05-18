"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  name: z.string().min(1, { message: "Class name is required!" }),
  section: z.string().min(1, { message: "Section is required!" }),
  year: z
    .number({
      invalid_type_error: "Year must be a number",
    })
    .min(2000, { message: "Year must be 2000 or later" }),
  supervisor: z.string().min(1, { message: "Supervisor is required!" }),
  capacity: z
    .number({
      invalid_type_error: "Capacity must be a number",
    })
    .int("Capacity must be an integer")
    .positive("Capacity must be greater than 0"),
});

type Inputs = z.infer<typeof schema>;

const ClassForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: Partial<Inputs>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data?.name || "",
      section: data?.section || "",
      year: data?.year || new Date().getFullYear(),
      supervisor: data?.supervisor || "",
      capacity: data?.capacity || 1,
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Class form submitted:", data);
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new class" : "Update class"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Class Name"
          name="name"
          register={register}
          error={errors.name}
        />
        <InputField
          label="Section"
          name="section"
          register={register}
          error={errors.section}
        />
        <InputField
          label="Year"
        //   name="year"
          register={register}
          error={errors.year}
          type="number"
          {...register("year", { valueAsNumber: true })}
        />
        <InputField
          label="Supervisor"
          name="supervisor"
          register={register}
          error={errors.supervisor}
        />
        <InputField
          label="Capacity"
        //   name="capacity"
          register={register}
          error={errors.capacity}
          type="number"
          {...register("capacity", { valueAsNumber: true })}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ClassForm;
