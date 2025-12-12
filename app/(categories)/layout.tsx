import AuthModal from "@/components/AuthModal";
import { AuthProvider } from "@/context/AuthContext";

const CategoriesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AuthProvider>
        {children}
        <AuthModal />
      </AuthProvider>
    </div>
  );
};

export default CategoriesLayout;
