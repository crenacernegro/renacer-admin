import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import Header from "./header";
import HeaderMobile from "./header-mobile";
import StoreSwitcher from "./store-switcher";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <Header />
        <HeaderMobile />
      </div>
    </div>
  );
};

export default Navbar;
