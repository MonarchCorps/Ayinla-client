import FormImageField from "@/components/form/FormImageField";
import { Button } from "@/components/ui/button";
import { FaInfoCircle } from "react-icons/fa";

export default function Step2() {
    return (
        <div>
            <h1 className="font-medium text-3xl/relaxed mb-8">
                New Listing
            </h1>
            <div className="border-b border-solid border-[#D7D7D7] pt-1 pb-7 text-center">
                <h1 className="text-2xl mb-2 text-[#223A6A] font-semibold">Image Upload</h1>
                <p className="text-[#475467]">Please upload a minimum of 4, and a maximum of 8</p>
            </div>
            <div className="flex items-center justify-between mt-5">
                <div className="flex items-center space-x-2 text-[#414041]">
                    <p className="text-sm">Select Photo</p>
                    <FaInfoCircle />
                </div>
                <p className="text-sm text-amber-300">
                    You can drag to reorder images
                </p>
            </div>
            <FormImageField
                name="image"
            />
            <p className="text-xs text-amber-300">Note: The first image will be used as the thumbnail</p>
            <div className="flex items-center justify-end">
                <Button
                    type="submit"
                    className="h-12 w-50 cursor-pointer font-bold bg-[#23396A] hover:bg-[#23396A] rounded-none hover:rounded-xl"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}