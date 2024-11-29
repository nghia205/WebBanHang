"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  collection: z.string().refine((data) => data.length >= 1, {
    message: "Hãy nhập collection",
  }),
  SubCollection: z.string(),
  OptionSubCollection: z.string(),
});
type FormValues = z.infer<typeof schema>;

function Collection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      collection: "",
      SubCollection: "",
      OptionSubCollection: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: FormValues) => {
    await fetch("http://127.0.0.1:8080/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Bắt buộc khi gửi JSON
      },
      body: JSON.stringify({
        menuCollection: data.collection,
        SubCollection: data.SubCollection,
        OptionSubCollection: data.OptionSubCollection,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-20">
      <form onSubmit={handleSubmit(onSubmit)} className="text-start space-y-10">
        <div>
          <label>Hãy nhập Collection:</label>
          <input
            {...register("collection")}
            placeholder="Hãy nhập Collection"
            className="mt-1 p-3 border rounded-lg w-full border-gray-300"
            type="text"
          />
          {errors.collection && (
            <p className="text-red-700 px-1">{errors.collection.message}</p>
          )}
        </div>
        <div>
          <label>Hãy nhập danh mục con: (nếu có)</label>
          <input
            {...register("SubCollection")}
            placeholder="Hãy nhập danh mục con"
            type="text"
            className="mt-1 p-3 border rounded-lg w-full border-gray-300"
          />
        </div>
        <div>
          <label>Hãy nhập tùy chọn của danh mục con: (nếu có)</label>
          <input
            {...register("OptionSubCollection")}
            placeholder="Hãy nhập tùy chọn của danh mục con"
            type="text"
            className="mt-1 p-3 border rounded-lg w-full border-gray-300"
          />
        </div>
        <button
          type="submit"
          className="mt-1 p-3 border rounded-lg w-full border-gray-300 bg-blue-800 text-white hover:bg-opacity-80"
        >
          Xác Nhận
        </button>
      </form>
    </div>
  );
}

export default Collection;