import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import CompanyList from "./components/CompanyList";
import CompanyForm from "./components/CompanyForm";
import CompanyDetail from "./components/CompanyDetail";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeDetail from "./components/EmployeeDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Sonner position="top-right" />
        <Routes>
          <Route path="/" element={<CompanyList />} />
          <Route path="/organizations" element={<CompanyList />} />
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/new" element={<CompanyForm />} />
          <Route path="/companies/:id" element={<CompanyDetail />} />
          <Route
            path="/companies/:companyId/employees/new"
            element={<EmployeeForm />}
          />
          <Route path="/employees/:employeeId" element={<EmployeeDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
