import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { WeddingProvider } from './contexts/WeddingContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { CustomerLayout } from './layouts/CustomerLayout';
import { VendorLayout } from './layouts/VendorLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { VendorsPage } from './pages/public/VendorsPage';
import { VendorDetailPage } from './pages/public/VendorDetailPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { PrivacyPage } from './pages/public/PrivacyPage';
import { TermsPage } from './pages/public/TermsPage';

// Auth & Onboarding Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { CustomerOnboardingPage } from './pages/onboarding/CustomerOnboardingPage';
import { VendorOnboardingPage } from './pages/onboarding/VendorOnboardingPage';

// Customer Pages
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { AIPlannerPage } from './pages/customer/AIPlannerPage';
import { BudgetPage } from './pages/customer/BudgetPage';
import { TasksPage } from './pages/customer/TasksPage';
import { CalendarPage } from './pages/customer/CalendarPage';
import { ComparePage } from './pages/customer/ComparePage';
import { BookingsPage } from './pages/customer/BookingsPage';
import { GuestsPage } from './pages/customer/GuestsPage';
import { WishlistPage } from './pages/customer/WishlistPage';
import { NotificationsPage } from './pages/customer/NotificationsPage';
import { CustomerSettingsPage } from './pages/customer/CustomerSettingsPage';

// Vendor Pages
import { VendorDashboardPage } from './pages/vendor/VendorDashboardPage';
import { VendorProfilePage } from './pages/vendor/VendorProfilePage';
import { VendorServicesPage } from './pages/vendor/VendorServicesPage';
import { VendorPortfolioPage } from './pages/vendor/VendorPortfolioPage';
import { VendorAvailabilityPage } from './pages/vendor/VendorAvailabilityPage';
import { VendorEnquiriesPage } from './pages/vendor/VendorEnquiriesPage';
import { VendorAnalyticsPage } from './pages/vendor/VendorAnalyticsPage';
import { VendorReviewsPage } from './pages/vendor/VendorReviewsPage';
import { VendorVerificationPage } from './pages/vendor/VendorVerificationPage';
import { VendorSettingsPage } from './pages/vendor/VendorSettingsPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminVendorsPage } from './pages/admin/AdminVendorsPage';
import { AdminVerificationsPage } from './pages/admin/AdminVerificationsPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminAuditLogPage } from './pages/admin/AdminAuditLogPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Error Pages
import { NotFoundPage } from './pages/errors/NotFoundPage';

// Scroll to top upon route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastProvider>
        <AuthProvider>
          <WeddingProvider>
            <Routes>
              {/* Public Website Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/vendors" element={<VendorsPage />} />
                <Route path="/vendors/:vendorId" element={<VendorDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
              </Route>

              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Onboarding Routes */}
              <Route
                path="/onboarding/customer"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'admin']}>
                    <CustomerOnboardingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/onboarding/vendor"
                element={
                  <ProtectedRoute allowedRoles={['vendor', 'admin']}>
                    <VendorOnboardingPage />
                  </ProtectedRoute>
                }
              />

              {/* Customer Portal Routes */}
              <Route
                path="/app"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'admin']}>
                    <CustomerLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<CustomerDashboard />} />
                <Route path="ai-planner" element={<AIPlannerPage />} />
                <Route path="budget" element={<BudgetPage />} />
                <Route path="budget/expenses" element={<BudgetPage />} />
                <Route path="budget/categories" element={<BudgetPage />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="compare" element={<ComparePage />} />
                <Route path="bookings" element={<BookingsPage />} />
                <Route path="bookings/:bookingId" element={<BookingsPage />} />
                <Route path="guests" element={<GuestsPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="settings" element={<CustomerSettingsPage />} />
              </Route>

              {/* Vendor Portal Routes */}
              <Route
                path="/vendor"
                element={
                  <ProtectedRoute allowedRoles={['vendor', 'admin']}>
                    <VendorLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<VendorDashboardPage />} />
                <Route path="profile" element={<VendorProfilePage />} />
                <Route path="services" element={<VendorServicesPage />} />
                <Route path="packages" element={<VendorServicesPage />} />
                <Route path="portfolio" element={<VendorPortfolioPage />} />
                <Route path="availability" element={<VendorAvailabilityPage />} />
                <Route path="enquiries" element={<VendorEnquiriesPage />} />
                <Route path="bookings" element={<VendorEnquiriesPage />} />
                <Route path="analytics" element={<VendorAnalyticsPage />} />
                <Route path="reviews" element={<VendorReviewsPage />} />
                <Route path="verification" element={<VendorVerificationPage />} />
                <Route path="settings" element={<VendorSettingsPage />} />
              </Route>

              {/* Administrator Control Room Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="vendors" element={<AdminVendorsPage />} />
                <Route path="verifications" element={<AdminVerificationsPage />} />
                <Route path="bookings" element={<AdminBookingsPage />} />
                <Route path="reports" element={<AdminReportsPage />} />
                <Route path="audit-log" element={<AdminAuditLogPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </WeddingProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
