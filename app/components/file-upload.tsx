/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Aug 26 2023 11:16:23 GMT-0400 (Eastern Daylight Time)

Copyright (c) geekofia 2023 and beyond
*/

"use client";

import { X } from "lucide-react";
import { Button } from "./ui/button";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "productImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <img
          src={value}
          alt={`${value} file`}
          className="rounded-full object-cover"
        />
        <Button
          onClick={() => onChange("")}
          className="rounded-full"
          variant="destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  //   return (
  //     <UploadDropzone
  //       endpoint={endpoint}
  //       onClientUploadComplete={(res) => {
  //         onChange(res?.[0].url);
  //       }}
  //       onUploadError={(error: Error) => {
  //         console.log(error);
  //       }}
  //     />
  //   );
};
