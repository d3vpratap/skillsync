import { getUserOnboardingStatus } from "@/actions/user";
import { industries } from "@/data/industries";
import { redirect } from "next/navigation";
import OnboardingFrom from "./_components/onboarding-form";
const OnboardingPage = async () => {
  //check if user is Onboarded:
  const { isOnboarded } = await getUserOnboardingStatus();
  if (isOnboarded) {
    redirect("/dashboard");
  }
  return (
    <main>
      <OnboardingFrom industries={industries} />
    </main>
  );
};

export default OnboardingPage;
