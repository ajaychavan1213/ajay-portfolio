import { getPortfolioData } from "@/lib/db";
import HomeClient from "@/components/home-client";
import LoadingScreen from "@/components/loading-screen";

// Force dynamic execution so changes made in the admin panel are visible on refresh
export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <>
      <LoadingScreen />
      <HomeClient data={data} />
    </>
  );
}
