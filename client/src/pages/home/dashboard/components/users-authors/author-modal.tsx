/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ModalWrapper from "../../../../../components/utility-comps/modal-wrapper";
import InputField from "../../../../../components/utility-comps/input-field";
import InputAutocomplete from "../../../../../components/utility-comps/input-autocomplete";
import { citiesCountries } from "../../../../../lib/data/cities";
import { PiUserCircleLight } from "react-icons/pi";
import AvatarSelector from "../../../../../components/link-selector-modal/avatar-selector";
import API from "../../../../../api";
import { cn } from "../../../../../lib/utilities";
import spinner from '../../../../../assets/loaders/spinner-grey.svg'

const defaultData: AuthorData = {
  _id: "0",
  avatarUrl: "",
  name: "",
  location: "",
};
export default function AuthorModal({
  authorData,
  submitCallback,
  children,
}: {
  submitCallback: (data: AuthorData) => void;
  authorData?: AuthorData;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inputData, setInputData] = useState<AuthorData>(
    authorData ?? defaultData
  );

  const handleUpdate = (key: keyof AuthorData, value: string) => {
    setInputData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!open) setInputData(authorData ?? defaultData);
  }, [open]);

  const createAuthor = async () => {
    setSubmitting(true);
    try {
      const { data, error } = await API.user.createAuthor(inputData);
      console.log({ data, error });
    } catch (error) {
      console.error(error);
    }
    submitCallback(inputData);
    setOpen(false);
    setSubmitting(false);
  }

  const updateAuthor = async () => {
    submitCallback(inputData);
    setOpen(false);
  }

  const onsubmit = async () => {
    authorData ? updateAuthor() : createAuthor();
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <ModalWrapper open={open} onClose={() => setOpen(false)}>
        <div className="bg-white rounded-lg p-4 w-[500px] gap-2 relative">
          <h1 className="text-xl font-semibold text-indigo-500 mb-2">
            Create Author
          </h1>
          <div
            className={cn(
              "w-full h-[125px] flex gap-2",
              submitting ? "opacity-45" : ""
            )}
          >
            <AvatarSelector
              selectCallback={(url) => handleUpdate("avatarUrl", url)}
            >
              <div className="w-[125px] h-full border hover:border-indigo-500 rounded-lg flex items-center justify-center overflow-hidden">
                {inputData.avatarUrl ? (
                  <img
                    src={inputData.avatarUrl}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <PiUserCircleLight className="text-[80px] text-gray-200" />
                )}
              </div>
            </AvatarSelector>
            <div className="grow h-full flex flex-col justify-between">
              <InputField
                additionalClass="hover:border-indigo-500"
                placeholder="Name"
                value={inputData.name}
                onChange={(val: string) => handleUpdate("name", val)}
              />
              <InputAutocomplete
                defaultValue={inputData.location}
                additionalClass="hover:border-indigo-500 relative z-30"
                placeholder="Location"
                matchKey="city"
                outputPattern={["city", "country"]}
                onChangeCallback={(val: string) =>
                  handleUpdate("location", val)
                }
                options={citiesCountries}
              />
            </div>
          </div>
          <div className="w-full flex justify-end items-center gap-2 mt-2 relative z-0">
            {submitting && (
              <img src={spinner} alt="loading-spinner" height={30} width={30} />
            )}
            <div
              onClick={onsubmit}
              className={cn(
                "button-main m-0",
                Object.values(inputData).some((i) => i === "")
                  ? "opacity-45 pointer-events-none"
                  : ""
              )}
            >
              submit
            </div>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};
