
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Exams from "./pages/Exams";
import ExamStartPrompt from "./pages/ExamStartPrompt";
import ExamSession from "./pages/ExamSession";
import ExamResults from "./pages/ExamResults";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout>
                <Home />
              </Layout>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/exams" 
            element={
              <Layout>
                <Exams />
              </Layout>
            } 
          />
          <Route 
            path="/exam/:examId" 
            element={
              <Layout>
                <ExamStartPrompt />
              </Layout>
            } 
          />
          <Route 
            path="/exam/session/:examId" 
            element={<ExamSession />} 
          />
          <Route 
            path="/exam/results" 
            element={
              <Layout>
                <ExamResults />
              </Layout>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <Layout>
                <Dashboard />
              </Layout>
            } 
          />
          <Route 
            path="/pricing" 
            element={
              <Layout>
                <Pricing />
              </Layout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
