import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TermsAndConditionsProps {
  onClose: () => void
}

export default function TermsAndConditions({ onClose }: TermsAndConditionsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Terms and Conditions</h2>
        <ScrollArea className="h-96 mb-4">
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
            <p>Welcome to AlphaWealth. By using our services, you agree to the following terms and conditions:</p>
            
            <h3 className="font-semibold text-blue-600 dark:text-blue-400">1. Risk Disclosure</h3>
            <p>Investing in financial markets involves risk. The value of your investments can go down as well as up. Past performance is not indicative of future results. You should only invest money you can afford to lose.</p>
            
            <h3 className="font-semibold text-blue-600 dark:text-blue-400">2. Market Data</h3>
            <p>While we strive to provide accurate and up-to-date market data, we cannot guarantee its accuracy or timeliness. Users should verify any information before relying on it for investment decisions.</p>
            
            <h3 className="font-semibold text-blue-600 dark:text-blue-400">3. Account Security</h3>
            <p>You are responsible for maintaining the confidentiality of your account information and password. You agree to notify us immediately of any unauthorized use of your account.</p>
            
            <h3 className="font-semibold text-blue-600 dark:text-blue-400">4. Compliance with Laws</h3>
            <p>You agree to comply with all applicable local, state, national, and international laws and regulations regarding online conduct and acceptable content.</p>
            
            <h3 className="font-semibold text-blue-600 dark:text-blue-400">5. Intellectual Property</h3>
            <p>All content and materials available on AlphaWealth, including but not limited to text, graphics, website name, code, images and logos are the intellectual property of AlphaWealth and are protected by applicable copyright and trademark law.</p>
            
            <h3 className="font-semibold text-blue-600 dark:text-blue-400">6. Limitation of Liability</h3>
            <p>AlphaWealth shall not be liable for any direct, indirect, incidental, special, consequential or exemplary damages resulting from your use or inability to use the service.</p>
            
            <h3 className="font-semibold text-blue-600 dark:text-blue-400">7. Modifications to Service</h3>
            <p>We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice at any time.</p>
            
            <h3 className="font-semibold text-blue-600 dark:text-blue-400">8. Governing Law</h3>
            <p>These terms and conditions are governed by and construed in accordance with the laws of Government of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
          </div>
        </ScrollArea>
        <Button onClick={onClose} className="w-full">Close</Button>
      </div>
    </div>
  )
}

