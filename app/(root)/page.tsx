import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
  return (
    <div className="flex ">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default SetupPage;
