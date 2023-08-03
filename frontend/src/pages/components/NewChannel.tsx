import { useState } from "react";
import AddIcon from "../../assets/add-icon.svg";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useNavigate } from "react-router-dom";

const BACKEND_URL =
  "https://w24-group-final-group-3-production.up.railway.app/";

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

const schema = yup.object({
  name: yup.string().required("Channel name is required"),
  description: yup.string().required("Channel description is required"),
  imageURL: yup.string().required("Image URL is required"),
});

export default function NewChannel(props: {
  setChannelList: React.Dispatch<React.SetStateAction<Channel[]>>;
  setChannelDetail: React.Dispatch<React.SetStateAction<Channel | undefined>>;
}) {
  const access_token = localStorage.getItem("access_token");
  const [newChannelModalIsOpen, setNewChannelModalIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Channel>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        props.setChannelDetail(result);
        setNewChannelModalIsOpen(false);
      })
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

            <div className="w-full flex justify-end gap-4">
              <button
                onClick={() => setNewChannelModalIsOpen(false)}
                type="button"
                className="py-1 px-6 rounded-lg bg-medium-grey hover:bg-light-grey text-white hover:text-white text-body-medium outline-none"
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
        </div>
      )}
    </>
  );
}
