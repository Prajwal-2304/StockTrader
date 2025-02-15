"use server"

import { r2 } from "@/cloud/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default async function GenerateUrl({ type }: {
  type: "image" | "json"
}) {
  const key = randomUUID() + (type == "image" ? ".png" : "/metadata.json")
  const bucket = process.env.NEXT_PUBLIC_R2_BUCKET

  try {
    const command = new PutObjectCommand({ Bucket: bucket, Key: key })
    const url = await getSignedUrl(r2, command, { expiresIn: 600 })
    return { key, url }
  } catch (error) {
    console.error('Error generating signed URL:', error)
    throw new Error('Failed to generate signed URL')
  }
}
