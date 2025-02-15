"use server"

import GenerateUrl from "./presignedUrl"

export const HandleFileUpload = async (file: File) => {
  if (!file) return null

  try {
    const { key, url } = await GenerateUrl({ type: "image" })

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": file.type
      },
      body: file
    })

    return key
  } catch (e) {
    console.error("File upload failed:", e)
    //TODO: add toast here, even above
    return null
  }
}
