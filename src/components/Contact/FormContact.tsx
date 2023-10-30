"use client"

import { formSubmission } from "@/actions/SubmitForm";

import toast from "react-hot-toast";

import { FormSchema } from "../../../lib/typesForm";



const FormContact = () => {
    const clientAction = async (formData: FormData) => {
        const newContact = {
            name:  formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message")
        }
        // client validitaion 
        const result = FormSchema.safeParse(newContact);

        if (!result.success) {
            let errorMessage = "";

            result.error.issues.forEach((issue, index) => {
                errorMessage =  issue.message + "."
            });
            console.log(errorMessage)

            toast.error(errorMessage);

            return;
        }
        console.log(result.data)

        const response = await formSubmission(result.data)
        if(response?.error){
            toast.error(response.error)
        }

        toast.success("Successfully sent!")
    }

    return (
        <form action={clientAction} className="z-10 flex flex-col justify-center gap-5">
            <input
                name="name"
                type="text"
                className="pl-4 py-4 rounded-lg h-12 text-[#172B4D]"
                placeholder="Name"
                required
            />
            <input
                name="email"
                type="email"
                className="pl-4 py-4 rounded-lg h-12 text-[#172B4D]"
                placeholder="Email"
                required
            />
            <textarea
                name="message"
                className="pl-4 pt-4 pr-9 h-40 flex content-start  rounded-lg text-[#B3BAC5]"
                placeholder="Write your message here..."
            ></textarea>
            <div className="flex lg:justify-center">
                <button
                    type="submit"
                    className="w-1/2 flex justify-center mb-3 lg:w-36 py-3 px-4 bg-white rounded-lg border-[#6070FF] border-2 text-[#396DF2] font-medium hover:bg-[#6070FF] hover:text-[#FFFFFF] transition-all duration-1000 ease-out active:bg-[#2230D2] active:text-[#FFFFFF] disabled:text-[#5E6C84] disabled:border-[#C1C7D0] hover:scale-110 hover:border-blue-800 disabled:bg-[#ffffff] "
                >
                    Get in touch
                </button>
            </div>
        </form>
    )
}

export default FormContact