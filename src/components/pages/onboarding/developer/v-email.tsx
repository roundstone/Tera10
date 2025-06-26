import { useNavigation } from "../../../../utils/navigation";
import IMAGES from "../../../../assets/images";
import { ROUTES } from "../../../../config/route";
import { maskEmail } from "../../../../utils/string";
import { useEffect } from "react";
import { useRegistration } from '../../../../context/RegistrationContext';

const DeveloperOnboardingVEmail = () => {
  const { goTo } = useNavigation();
  const { state, dispatch } = useRegistration();

  // Auto redirect after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      goTo(ROUTES.ONBOARDING.DEVELOPER.CONSOLE_OVERVIEW);
    }, 5000);

    return () => clearTimeout(timeout); // Clean up
  }, [goTo]);

  return (
    <div className="relative h-[673px] w-[556px] z-10 self-center mt-20">
      <div className="absolute inset-0 rounded-2xl bg-[#6882C1] w-[556px] max-w-full h-full py-10 px-10 text-white z-30">
        <div className="text-2xl font-light pb-5"> Email Sent!</div>
        <p className="text-sm">
          Follow the confirmation instruction sent to your <br /> email to
          continue
        </p>
        <div className="flex flex-col items-center justify-center">
          <img src={IMAGES.EmailBird} className="w-[402px] h-[402px]" alt="" />
          <div className="text-2xl text-center">
            {maskEmail(state.formData.step1?.email || "")}
          </div>
        </div>
        <p className="text-sm pt-15">This page will reload automatically</p>
      </div>

      <div className="absolute top-[30px] left-[-30px] rounded-2xl w-[556px] h-[673px] bg-gradient-to-b from-[#E0E2E8] to-transparent  z-20"></div>

      <div className="absolute top-[60px] left-[-60px] rounded-2xl bg-gradient-to-b from-[#F5F5F5] to-transparent w-[556px] max-w-full h-full z-10"></div>
    </div>
  );
};

export default DeveloperOnboardingVEmail;
