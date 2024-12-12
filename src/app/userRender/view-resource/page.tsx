import Sidebar from "../../components/sidebarDashboard";
import Header from "@/app/components/LandingPage/header";
import CommunityQuestions from "../../userComponents/communityQuestions";
import ResourcePage from "../../userComponents/resources/view-resources";
import Footer from "@/app/components/LandingPage/footer";
const ResourceRender = () => {
  return (
    <main className="relative flex flex-col">
      <Header />

      <div className="flex-1  w-full overflow-y-auto">
        <ResourcePage />
      </div>

      <Footer />
    </main>
  );
};
export default ResourceRender;
