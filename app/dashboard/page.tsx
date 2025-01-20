import { Suspense, use } from 'react';
import db from "@/db/index"
import App from '@/components/App';

export default async function DashboardPage() {
  // Fetch initial data
  const userId = 1; // Replace with actual user ID from your auth system
  const user = await db.users.findUnique({
    where: { id: userId },
    include: {
      watchlists: {
        include: {
          stocks: {
            include: {
              stocks: true
            }
          }
        }
      },
      portfolio: {
        include: {
          stocks: {
            include: {
              stock: true
            }
          }
        }
      }
    }
  });
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <App initialData={user} />
    </Suspense>
  );
}
