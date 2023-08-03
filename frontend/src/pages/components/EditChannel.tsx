import { Dialog } from "@headlessui/react";
import { useState } from "react";
import IconEdit from "../../assets/icon-edit.svg";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteChannel from "./DeleteChannel";

interface Channel {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  date: Date[];
}

interface RequestOption {
  method: "POST";
  headers: HeadersInit;
  body: string;
  redirect: "follow";
}

export default function EditChannel() {
  const [isOpen, setIsOpen] = useState(false);
  const access_token = localStorage.getItem("access_token");
  const BACKEND_URL =
    "https://w24-group-final-group-3-production.up.railway.app/";

  const schema = yup.object({
    name: yup.string().required("Channel name is required"),
    description: yup.string().required("Channel description is required"),
    imageURL: yup.string().required("Image URL is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Channel>({
    resolver: yupResolver<any>(schema),
  });

  const handleFormSubmit = (data: Channel) => {
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
      .then((result) => {
        console.log(result.stringify);
        // props.setChannelList((current: Channel[]) => [...current, data]);
        // setNewChannelModalIsOpen(false);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((current: boolean) => !current)}
        className="justify-center items-center w-[30px] h-[30px] ml-auto shadow-xl rounded-xl flex active:bg-light-grey"
      >
        <img className="w-[20px] h-[20px]" src={IconEdit} alt="icon-edit" />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 w-full h-screen flex justify-center items-center bg-black/50"
      >
        {/* BACKGROUND OVERLAY */}
        {/* <div
          className="fixed top-0 left-0 flex justify-center items-center inset-0 bg-black/50 p-4"
          aria-hidden="true"
        /> */}

        {/* <div className="fixed inset-0 flex items-center justify-center p-4"> */}
        <Dialog.Panel className="p-4 flex justify-center items-center w-full md:max-w-[650px]">
          <form
            onClick={(e) => e.stopPropagation()}
            className="bg-very-dark-grey w-full md:max-w-[650px] p-10 flex flex-col items-start gap-6 rounded-[24px]"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <h3 className="text-white text-body-bold">EDIT CHANNEL</h3>
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
                      errors?.name && "border border-red"
                    } placeholder:text-text-grey text-input-medium placeholder:text-input-medium`}
                  />
                  {errors?.name && (
                    <p className="text-sm text-red text-input-medium -mt-6">
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
                    className={`bg-light-grey p-4 rounded-md outline-none w-full text-white placeholder:text-text-grey text-input-medium placeholder:text-input-medium resize-none ${
                      errors?.description && "border border-red"
                    }`}
                  />
                  {errors?.description && (
                    <p className="text-sm text-red text-input-medium -mt-6">
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
                    className={`bg-light-grey h-[48px] p-4 rounded-md outline-none w-full text-white placeholder:text-text-grey text-input-medium placeholder:text-input-medium ${
                      errors?.imageURL && "border border-red"
                    }`}
                  />
                  {errors?.imageURL && (
                    <p className="text-sm text-red text-input-medium -mt-6">
                      {errors.imageURL.message}
                    </p>
                  )}
                </>
              )}
            />
            <div className="w-full flex justify-between gap-4">
              <DeleteChannel />
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="py-1 px-6 rounded-lg bg-medium-grey hover:bg-light-grey text-white hover:text-white text-body-medium outline-none ml-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue py-1 px-6 rounded-lg text-white text-body-medium hover:bg-blue-hover outline-none"
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Panel>
        {/* </div> */}
      </Dialog>
    </>
  );
}
