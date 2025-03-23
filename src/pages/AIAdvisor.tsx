import Navbar from "@/components/layout/Navbar"
import AIAdvisor from "@/components/dashboard/AIAdvisor"

const AIAdvisorPage = () => {
    return (
        <div className="lg:col-span-2">
            <Navbar />
            <AIAdvisor />
        </div>
    );
}

export default AIAdvisorPage;