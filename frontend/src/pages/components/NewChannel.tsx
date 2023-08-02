import { useState } from "react";
import AddIcon from "../../assets/add-icon.svg";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const BACKEND_URL =
  "https://w24-group-final-group-3-production.up.railway.app/";

interface RequestOption {
  method: "POST";
  headers: HeadersInit;
  body: string;
  redirect: "follow";
}

interface ChannelData {
  name: string;
  description: string;
  imageURL: string;
}

const schema = yup.object({
  name: yup.string().required("Channel name is required"),
  description: yup.string().required("Channel description is required"),
  imageURL: yup.string().required("Image URL is required"),
});

export default function NewChannel() {
  const access_token = localStorage.getItem("access_token");

  const [newChannelModalIsOpen, setNewChannelModalIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChannelData>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data: ChannelData) => {
    const myHeaders = {
      "Content-Type": "application/json",
      authorization: `Bearer ${access_token}`,
    };

    const requestOptions: RequestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch(BACKEND_URL + "channel", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <button
        onClick={() => setNewChannelModalIsOpen(true)}
        className="w-[32px] h-[32px] rounded-lg bg-medium-grey flex justify-center items-center"
      >
        <img src={AddIcon} alt="add-icon" className="w-[24px]" />
      </button>

      {newChannelModalIsOpen && (
        <div
          onClick={() => setNewChannelModalIsOpen(false)}
          className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen p-4 md:p-0 bg-black/50 z-40"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            className="bg-very-dark-grey w-[650px] p-10 flex flex-col items-start gap-6 rounded-[24px]"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <h3 className="text-white text-body-bold">NEW CHANNEL</h3>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    {...field}
                    placeholder="Channel name"
                    className={`bg-light-grey h-[48px] p-4 rounded-md outline-none w-full text-white ${
                      errors?.name && "border-red"
                    } placeholder:text-text-grey text-input-medium placeholder:text-input-medium`}
                  />
                  {errors?.name && (
                    <p className="text-sm text-red text-input-medium">
                      {errors.name.message}
                    </p>
                  )}
                </>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <>
                  <textarea
                    {...field}
                    placeholder="Channel description"
                    cols={30}
                    rows={4}
                    className="bg-light-grey p-4 rounded-md outline-none w-full text-white placeholder:text-text-grey text-input-medium placeholder:text-input-medium resize-none"
                  />
                  {errors?.description && (
                    <p className="text-sm text-red text-input-medium">
                      {errors.description.message}
                    </p>
                  )}
                </>
              )}
            />
            <Controller
              name="imageURL"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="text"
                    {...field}
                    placeholder="Channel image url"
                    className="bg-light-grey h-[48px] p-4 rounded-md outline-none w-full text-white placeholder:text-text-grey text-input-medium placeholder:text-input-medium"
                  />
                  {errors?.imageURL && (
                    <p className="text-sm text-red text-input-medium">
                      {errors.imageURL.message}
                    </p>
                  )}
                </>
              )}
            />
            <button
              type="submit"
              className="bg-blue py-1 px-6 rounded-lg text-white text-body-medium ml-auto active:bg-blue-hover outline-none"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}
