import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";
import { ToastContainer } from "./components/ToastContainer";

import Home from "./pages/Home";
import Writing from "./pages/Writing";
import Resources from "./pages/Resources";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import SubstackPage from "./pages/Substack";
import Pastors from "./pages/Pastors";
import About from "./pages/About";
import FileStorage from "./pages/FileStorage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPosts from "./pages/AdminPosts";
import AdminPostEditor from "./pages/AdminPostEditor";
import AdminResources from "./pages/AdminResources";
import AdminResourceEditor from "./pages/AdminResourceEditor";
import AdminBooks from "./pages/AdminBooks";
import AdminBookEditor from "./pages/AdminBookEditor";
import AdminAbout from "./pages/AdminAbout";
import AdminSettings from "./pages/AdminSettings";
import AdminContentSync from "./pages/AdminContentSync";
import ArticleDetail from "./pages/ArticleDetail";
import { NotificationsAdmin } from "./pages/admin/NotificationsAdmin";
import { ModerationAdmin } from "./pages/admin/ModerationAdmin";
import BooksStore from "./pages/BooksStore";
import SearchPage from "./pages/Search";
import TheologyQuiz from "./pages/TheologyQuiz";
import ResourcesForPastors from "./pages/ResourcesForPastors";
import ReadingPaths from "./pages/ReadingPaths";
import { ReadingPathDetail } from "./pages/ReadingPathDetail";
import { AuthorProfile } from "./pages/AuthorProfile";
import { ArticleCollections } from "./pages/ArticleCollections";
import { BookBundles } from "./pages/BookBundles";
import { LeadMagnetsPage } from "./pages/LeadMagnets";
import Pillars from "./pages/Pillars";
import ForPastors from "./pages/ForPastors";
import ForLeaders from "./pages/ForLeaders";
import Membership from "./pages/Membership";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pillars" component={Pillars} />
      <Route path="/for-pastors" component={ForPastors} />
      <Route path="/for-leaders" component={ForLeaders} />
      <Route path="/membership" component={Membership} />
      <Route path="/writing" component={Writing} />
      <Route path="/writing/:slug" component={ArticleDetail} />
      <Route path="/reading-paths" component={ReadingPaths} />
      <Route path="/reading-paths/:slug" component={ReadingPathDetail} />
      <Route path="/authors/:slug" component={AuthorProfile} />
      <Route path="/article-collections" component={ArticleCollections} />
      <Route path="/book-bundles" component={BookBundles} />
      <Route path="/lead-magnets/:magnetId" component={LeadMagnetsPage} />
      <Route path="/resources" component={Resources} />
      <Route path="/books" component={Books} />
      <Route path="/books/:slug" component={BookDetail} />
      <Route path="/substack" component={SubstackPage} />
      <Route path="/pastors" component={Pastors} />
      <Route path="/about" component={About} />
      <Route path="/files" component={FileStorage} />
      <Route path="/books-store" component={BooksStore} />
      <Route path="/search" component={SearchPage} />
      <Route path="/quiz" component={TheologyQuiz} />
      <Route path="/resources-for-pastors" component={ResourcesForPastors} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/posts" component={AdminPosts} />
      <Route path="/admin/posts/new" component={AdminPostEditor} />
      <Route path="/admin/posts/:id/edit" component={AdminPostEditor} />
      <Route path="/admin/resources" component={AdminResources} />
      <Route path="/admin/resources/new" component={AdminResourceEditor} />
      <Route path="/admin/resources/:id/edit" component={AdminResourceEditor} />
      <Route path="/admin/books" component={AdminBooks} />
      <Route path="/admin/books/new" component={AdminBookEditor} />
      <Route path="/admin/books/:id/edit" component={AdminBookEditor} />
      <Route path="/admin/about" component={AdminAbout} />
      <Route path="/admin/settings" component={AdminSettings} />
      <Route path="/admin/sync" component={AdminContentSync} />
      <Route path="/admin/moderation" component={ModerationAdmin} />
      <Route path="/admin/notifications" component={NotificationsAdmin} />
      
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <ToastProvider>
          <TooltipProvider>
            <Toaster />
            <ToastContainer />
            <Router />
          </TooltipProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
