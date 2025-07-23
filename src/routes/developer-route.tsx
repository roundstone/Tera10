import { ROUTES } from "@/config/route";
import { CustomRouteObject } from "@/types/route.type";
import DashboardLayout from "@/layouts/dashboard-layout";
import DeveloperDashboard from "@/features/dashboard/developer/index.lazy";
import AddAsset from "@/features/dashboard/developer/add-asset/index.lazy";
import Portfolio from "@/features/dashboard/developer/portfolio";
import Listings from "@/features/dashboard/developer/listings";
import Wallet from "@/features/dashboard/developer/wallet";
import Milestone from "@/features/dashboard/developer/milestone";
import DeveloperOnboardingPage from "@/features/onboarding/developer";
import DeveloperOnboardingLayout from "@/layouts/developer-onboarding-layout";
import DeveloperOnboardingVEmailPage from "@/features/onboarding/developer/verify-email";
import DeveloperOnboardingConsoleOverviewPage from "@/features/onboarding/developer/console";
import DeveloperOnboardingKYCPage from "@/features/onboarding/developer/kyc";
import DeveloperOnboardingKYCConfirmationPage from "@/features/onboarding/developer/thank-you";
import Profile from "@/features/dashboard/developer/profile";

export const developerRoutes: CustomRouteObject[] = [
  // Onboarding
  {
    path: ROUTES.ONBOARDING.DEVELOPER.EMAIL,
    element: <DeveloperOnboardingPage />,
    layout: DeveloperOnboardingLayout,
  },
  {
    path: ROUTES.ONBOARDING.DEVELOPER.VERIFY_EMAIL,
    element: <DeveloperOnboardingVEmailPage />,
    layout: DeveloperOnboardingLayout,
  },
  {
    path: ROUTES.ONBOARDING.DEVELOPER.CONSOLE_OVERVIEW,
    element: <DeveloperOnboardingConsoleOverviewPage />,
    layout: DeveloperOnboardingLayout,
  },
  {
    path: ROUTES.ONBOARDING.DEVELOPER.KYC,
    element: <DeveloperOnboardingKYCPage />,
    layout: DeveloperOnboardingLayout,
  },
  {
    path: ROUTES.ONBOARDING.DEVELOPER.THANK_YOU,
    element: <DeveloperOnboardingKYCConfirmationPage />,
    layout: DeveloperOnboardingLayout,
  },

  // Dashboard
  {
    path: ROUTES.DASHBOARD.DEVELOPER.HOME,
    element: <DeveloperDashboard />,
    layout: DashboardLayout,
  },
  {
    path: ROUTES.DASHBOARD.DEVELOPER.ADD_ASSETS,
    element: <AddAsset />,
    layout: DashboardLayout,
  },
  {
    path: ROUTES.DASHBOARD.DEVELOPER.PORTFOLIO,
    element: <Portfolio />,
    layout: DashboardLayout,
  },
  {
    path: ROUTES.DASHBOARD.DEVELOPER.LISTING,
    element: <Listings />,
    layout: DashboardLayout,
  },
  {
    path: ROUTES.DASHBOARD.DEVELOPER.MILESTONE,
    element: <Milestone />,
    layout: DashboardLayout,
  },
  {
    path: ROUTES.DASHBOARD.DEVELOPER.WALLET,
    element: <Wallet />,
    layout: DashboardLayout,
  },
  {
    path: ROUTES.DASHBOARD.DEVELOPER.PROFILE,
    element: <Profile />,
    layout: DashboardLayout,
  },
];
