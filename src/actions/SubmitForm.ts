"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { FormSchema } from "../../lib/typesForm";

export const formSubmission = async (newContact: unknown) => {
  // server side validation
  const result = FormSchema.safeParse(newContact);

  if (!result.success) {
    let errorMessage = "";
    result.error.issues.map((issue, index) => {
      errorMessage = 
        errorMessage + issue.path[index] + ": " + issue.message + ".";
    });
    return {
        error: errorMessage
    };
  }
  await prisma.contact.create({
    data: {
      name: result.data.name,
      email: result.data.email,
      message: result.data.message,
    },
  });

  return {
    succes: true,
  };
};
