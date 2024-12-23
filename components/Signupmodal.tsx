'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Nominee {
  name: string;
  relation: string;
  percentage: string;
}

export default function SignupModal() {
  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState(1)
  const [personalDetails, setPersonalDetails] = useState({
    accountNumber: '',
    name: '',
    panNumber: '',
    phoneNumber: '',
    email: '',
  })
  const [nominees, setNominees] = useState<Nominee[]>([])
  const [currentNominee, setCurrentNominee] = useState<Nominee>({
    name: '',
    relation: '',
    percentage: '',
  })

  const handlePersonalDetailsSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStage(2)
  }

  const handleAddNominee = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNominees([...nominees, currentNominee])
    setCurrentNominee({ name: '', relation: '', percentage: '' })
  }

  const handleFinalSubmit = () => {
    console.log('Form submitted', { personalDetails, nominees })
    setOpen(false)
    setStage(1)
    setPersonalDetails({
      accountNumber: '',
      name: '',
      panNumber: '',
      phoneNumber: '',
      email: '',
    })
    setNominees([])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-700 dark:text-blue-300">Create an account</DialogTitle>
          <DialogDescription className="text-lg text-gray-600 dark:text-gray-400">
            {stage === 1 ? "Enter your personal details" : "Add nominee details"}
          </DialogDescription>
        </DialogHeader>
        {stage === 1 ? (
          <form onSubmit={handlePersonalDetailsSubmit} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Account Number
              </Label>
              <Input
                id="accountNumber"
                value={personalDetails.accountNumber}
                onChange={(e) => setPersonalDetails({...personalDetails, accountNumber: e.target.value})}
                placeholder="Enter your account number"
                required
                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </Label>
              <Input
                id="name"
                value={personalDetails.name}
                onChange={(e) => setPersonalDetails({...personalDetails, name: e.target.value})}
                placeholder="Enter your full name"
                required
                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="panNumber" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                PAN Number
              </Label>
              <Input
                id="panNumber"
                value={personalDetails.panNumber}
                onChange={(e) => setPersonalDetails({...personalDetails, panNumber: e.target.value})}
                placeholder="Enter your PAN number"
                required
                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={personalDetails.phoneNumber}
                onChange={(e) => setPersonalDetails({...personalDetails, phoneNumber: e.target.value})}
                placeholder="Enter your phone number"
                required
                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={personalDetails.email}
                onChange={(e) => setPersonalDetails({...personalDetails, email: e.target.value})}
                placeholder="Enter your email address"
                required
                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Next: Add Nominees
            </Button>
          </form>
        ) : (
          <div className="space-y-6 py-4">
            <form onSubmit={handleAddNominee} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nomineeName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nominee Name
                </Label>
                <Input
                  id="nomineeName"
                  value={currentNominee.name}
                  onChange={(e) => setCurrentNominee({...currentNominee, name: e.target.value})}
                  placeholder="Enter nominee's name"
                  required
                  className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomineeRelation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Relation
                </Label>
                <Input
                  id="nomineeRelation"
                  value={currentNominee.relation}
                  onChange={(e) => setCurrentNominee({...currentNominee, relation: e.target.value})}
                  placeholder="Enter relation to nominee"
                  required
                  className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomineePercentage" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Percentage of Shares
                </Label>
                <Input
                  id="nomineePercentage"
                  type="number"
                  min="0"
                  max="100"
                  value={currentNominee.percentage}
                  onChange={(e) => setCurrentNominee({...currentNominee, percentage: e.target.value})}
                  placeholder="Enter percentage of shares"
                  required
                  className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Add Nominee
              </Button>
            </form>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Added Nominees:</h3>
              {nominees.map((nominee, index) => (
                <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  {nominee.name} - {nominee.relation} ({nominee.percentage}%)
                </p>
              ))}
            </div>
            <Button onClick={handleFinalSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white">
              Complete Signup
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

