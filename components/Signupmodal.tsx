'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchemaStageOne,formSchemaStageTwo,formSchemaStageThree } from '@/lib/userRegSchema'

import { useForm,useFieldArray } from 'react-hook-form'
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "../components/ui/form"
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Eye,EyeOff } from 'lucide-react'
import { createAccount } from '@/app/actions/createAccount'
import { useToast } from '@/hooks/use-toast'




export default function SignupModal() {
  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [totalPercentage, setTotalPercentage] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {toast}=useToast();
  const formOne = useForm<z.infer<typeof formSchemaStageOne>>({
    resolver: zodResolver(formSchemaStageOne),
    defaultValues: {
      name: '',
      email: '',
      phoneNum: '',
      password: '',
      confirmPassword: '',
    },
  })

  const formTwo = useForm<z.infer<typeof formSchemaStageTwo>>({
    resolver: zodResolver(formSchemaStageTwo),
    defaultValues: {
      accno: '',
      panNo: '',
      dateOfBirth: '',
    },
  })

  const formThree = useForm<z.infer<typeof formSchemaStageThree>>({
    resolver: zodResolver(formSchemaStageThree),
    defaultValues: {
      nominees: [{ nomineeName: '', email: '', pan: '', relation: '', percentage: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: formThree.control,
    name: "nominees",
  })

  useEffect(() => {
    const watchedNominees = formThree.watch("nominees");
    const total = watchedNominees.reduce((sum, nominee) => 
      sum + (nominee.percentage || 0), 
      0
    );
    setTotalPercentage(total);
  }, [formThree.watch("nominees")])

  const onSubmitStageOne = (data: z.infer<typeof formSchemaStageOne>) => {
    setStage(2)
  }

  const onSubmitStageTwo = (data: z.infer<typeof formSchemaStageTwo>) => {
    setStage(3)
  }

  const onSubmitStageThree = async (data: z.infer<typeof formSchemaStageThree>) => {
    try {
      setIsSubmitting(true)
      
      // Combine all form data
      const formData = {
        ...formOne.getValues(),
        ...formTwo.getValues(),
        ...data
      }
      
      const res=await createAccount(formData)
      if(res.success){
        toast({
          title:"Success",
          description:"Account created successfully",
          variant:"default"
        })
        setOpen(false)
      setStage(1)
      formOne.reset()
      formTwo.reset()
      formThree.reset()
      setTotalPercentage(0)
      }else {
        console.log("Error is ",res.error)
        toast({
          title:"Failure",
          description:`Account creation failed : ${res.error}`,
          variant:"destructive"
        })
        //setOpen(false)
      setStage(1)
      formOne.reset()
      formTwo.reset()
      formThree.reset()
      setTotalPercentage(0)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-700 dark:text-blue-300">Create an account</DialogTitle>
          <DialogDescription className="text-lg text-gray-600 dark:text-gray-400">
            {stage === 1 ? "Enter your email, phone and password" : 
             stage === 2 ? "Enter your account number, PAN number, and date of birth" : 
             "Add nominees"}
          </DialogDescription>
        </DialogHeader>
        {stage === 1 && (
          <Form {...formOne}>
            <form onSubmit={formOne.handleSubmit(onSubmitStageOne)} className="space-y-6 py-4">
              <FormField
                control={formOne.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formOne.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formOne.control}
                name="phoneNum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formOne.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Enter a strong password" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formOne.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Confirm your password" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Next: Account Details
              </Button>
            </form>
          </Form>
        )}
        {stage === 2 && (
          <Form {...formTwo}>
            <form onSubmit={formTwo.handleSubmit(onSubmitStageTwo)} className="space-y-6 py-4">
              <FormField
                control={formTwo.control}
                name="accno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your account number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formTwo.control}
                name="panNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PAN Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your PAN number" 
                        {...field} 
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        value={field.value.toUpperCase()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formTwo.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} max={new Date().toISOString().split("T")[0]} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Next: Nominee Details
              </Button>
            </form>
          </Form>
        )}
        {stage === 3 && (
          <Form {...formThree}>
            <form onSubmit={formThree.handleSubmit(onSubmitStageThree)} className="space-y-6 py-4">
              <div className="mb-4">
                <p className={`text-sm font-medium ${
                  totalPercentage > 100 ? 'text-red-500' : 
                  totalPercentage === 100 ? 'text-green-500' : 
                  'text-blue-500'
                }`}>
                  Total Allocation: {totalPercentage.toFixed(1)}%
                  {totalPercentage === 100 ? ' ✓' : ` (${(100 - totalPercentage).toFixed(1)}% remaining)`}
                </p>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      totalPercentage > 100 ? 'bg-red-500' :
                      totalPercentage === 100 ? 'bg-green-500' :
                      'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                  <FormField
                    control={formThree.control}
                    name={`nominees.${index}.nomineeName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nominee Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter nominee name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formThree.control}
                    name={`nominees.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter nominee email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formThree.control}
                    name={`nominees.${index}.pan`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PAN Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter PAN number" 
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                            value={field.value.toUpperCase()}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formThree.control}
                    name={`nominees.${index}.relation`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relation</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter relation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formThree.control}
                    name={`nominees.${index}.percentage`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Percentage Share: {field.value?.toFixed(1) || '0.0'}%
                        </FormLabel>
                        <FormControl>
                          <Slider
                            min={0}
                            max={100}
                            step={0.1}
                            value={[field.value || 0]}
                            onValueChange={(value) => {
                              const newValue = value[0];
                              const currentNominees = formThree.getValues("nominees");
                              const otherNomineesTotal = currentNominees.reduce(
                                (sum, nominee, i) => i === index ? sum : sum + (nominee.percentage || 0),
                                0
                              );
                              
                              if (otherNomineesTotal + newValue <= 100) {
                                field.onChange(newValue);
                              }
                            }}
                            className="py-4"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length > 1 && (
                    <Button 
                      type="button" 
                      variant="destructive" 
                      onClick={() => remove(index)}
                      className="mt-2"
                    >
                      Remove Nominee
                    </Button>
                  )}
                </div>
              ))}

              <div className="flex justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ nomineeName: '', email: '', pan: '', relation: '', percentage: 0 })}
                  disabled={totalPercentage >= 100}
                  className="flex-1"
                >
                  Add Nominee
                </Button>
              </div>

              <FormMessage>{formThree.formState.errors.nominees?.message}</FormMessage>

              <Button 
                type="submit" 
                className={`w-full ${
                  totalPercentage === 100 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white`}
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? 'Creating Account...' 
                  : 'Complete Signup'}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}