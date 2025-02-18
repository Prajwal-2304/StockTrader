"use client"

import * as React from "react"
import { z } from "zod"
import { Upload } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Image from 'next/image';
import { formSchema } from "@/lib/formSchema"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createTokenMint } from "@/app/actions/createMintAcc"
import { Loader2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { HandleFileUpload } from "@/cloud/uploadFile"
import { useSession } from "next-auth/react"

// import { createAccount } from "@/actions/createTokenAcc"

export default function CreateToken() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      decimals: "6",
      initSupply: "1",
      description: "",
      // website: "",
      // twitter: "",
      // telegram: "",
      // discord: "",
      revokeUpdate: false,
      revokeFreeze: false,
      revokeMint: false,
    },
  });

  const wallet = useWallet()
  const { connected } = useWallet()
  const router = useRouter();
  const { connection } = useConnection()
  const [isMintAvailable, setMintStatus] = React.useState(false)
  const [submitted, setSubmit] = React.useState(false)
  const [sig, setSig] = React.useState('')
  const addr = `https://explorer.solana.com/address/${sig}?cluster=devnet`
  const session = useSession()
  const [loading,setLoading]=React.useState(true)
  useEffect(() => {
    if(session.status==="unauthenticated"){
      router.replace("/unauthorized")
    }
    if (!connected || !wallet) {
      router.replace('/token')
    }
    setLoading(false)
  })



  function loadIcon() {
    setSubmit(true)
  }
  function setFalse() {
    setMintStatus(false)
    setSig('')
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isMintAvailable) {
      setFalse()
    }
    console.log(values)
    loadIcon()
    const fileKey = values.img ? await HandleFileUpload(values.img) : null
    const imgURL = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/token-launchpad/${fileKey}`
    if (wallet) {
      const mint = await createTokenMint({ connection, decimals: parseInt(values.decimals), wallet, description: values.description, tokenName: values.name, tokenSymbol: values.symbol, imgURL, supply: parseInt(values.initSupply) })
      console.log(`Mint address is at ${mint}`)

      if (mint) {
        setSig(mint)
        setMintStatus(true)
        console.log(`Mint address is at ${mint}`)
      } else {
        setSubmit(false)

      }
    }
  }
  if ((!isMintAvailable && submitted)||(loading)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }
  else {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8 transition-colors duration-200">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Solana Token Creator</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Easily Create your own Solana SPL Token in just 7+1 steps without Coding.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Put the name of your Token" {...field} className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Symbol <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Put the symbol of your Token" {...field} className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="decimals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Decimals <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" {...field} className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="initSupply"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supply <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" {...field} min={1} className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="img"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Image <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-800 rounded-lg p-8">
                        <Input
                          type="file"
                          accept="image/png, image/jpeg, image/jpg, image/gif"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                            }
                          }}
                          {...rest}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="flex flex-col items-center justify-center gap-2 cursor-pointer">
                          <Upload className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                          <span className="text-gray-500 dark:text-gray-400">Upload Image</span>
                        </label>
                      </div>
                    </FormControl>
                    <FormDescription>Most meme coins use a squared 1000x1000 logo</FormDescription>
                    <FormMessage />

                    {value && (
                      <div className="mt-4 relative flex justify-center items-center" style={{ height: '100%', width: '100%' }}>
                        <div className="relative" style={{ width: '100%', height: 'auto', maxWidth: '300px' }}>
                          <Image
                            src={URL.createObjectURL(value)}
                            alt="Uploaded preview"
                            width={300}
                            height={300}
                            className="w-full h-auto rounded"
                          />
                        </div>
                      </div>
                    )}
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Put the description of your Token"
                        className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800 min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["website", "twitter", "telegram", "discord"].map((social) => (
                  <FormField
                    key={social}
                    control={form.control}
                    name={social as "website" | "twitter" | "telegram" | "discord"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">{social}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Enter your ${social}`}
                            {...field}
                            className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div> */}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Revoke Authorities</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Solana Token have 3 authorities: Freeze Authority, Mint Authority and Update Authority. Revoke them to attract
                  more investors.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: "revokeUpdate", label: "Revoke Update (Immutable)", description: "Update Authority allows you to update token metadata" },
                    { name: "revokeFreeze", label: "Revoke Freeze", description: "Freeze Authority allows you to freeze token accounts" },
                    { name: "revokeMint", label: "Revoke Mint", description: "Mint Authority allows you to mint more supply" },
                  ].map((authority) => (
                    <FormField
                      key={authority.name}
                      control={form.control}
                      name={authority.name as "revokeUpdate" | "revokeFreeze" | "revokeMint"}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">{authority.label}</FormLabel>
                            <FormDescription>
                              {authority.description}
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
              {isMintAvailable && (
                <div className="inline-flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary/80">
                  <span>The transaction can be accessed at</span>
                  <Link
                    href={addr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 underline"
                    aria-label={`View transaction at ${addr}`}
                  >
                    <span>{addr.slice(0, 10)}...{addr.slice(-4)}</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              )}

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6">Create Token</Button>
            </form>
          </Form>
        </div>
      </div>
    )
  }
}
