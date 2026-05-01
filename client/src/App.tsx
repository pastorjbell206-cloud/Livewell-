import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { Route, Switch, useLocation } from "wouter";
import { Suspense, lazy, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";
import { ToastContainer } from "./components/ToastContainer";
import Home from "./pages/Home";
import Writing from "./pages/Writing";
import ArticleDetail from "./pages/ArticleDetail";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import About from "./pages/About";

const Resources = lazy(() => import("./pages/Resources"));
const SubstackPage = lazy(() => import("./pages/Substack"));
const Pastors = lazy(() => import("./pages/Pastors"));
const Tools = lazy(() => import("./pages/Tools"));
const FileStorage = lazy(() => import("./pages/FileStorage"));
const BooksStore = lazy(() => import("./pages/BooksStore"));
const SearchPage = lazy(() => import("./pages/Search"));
const TheologyQuiz = lazy(() => import("./pages/TheologyQuiz"));
const ResourcesForPastors = lazy(() => import("./pages/ResourcesForPastors"));
const ReadingPaths = lazy(() => import("./pages/ReadingPaths"));
const Pillars = lazy(() => import("./pages/Pillars"));
const ForPastors = lazy(() => import("./pages/ForPastors"));
const ForLeaders = lazy(() => import("./pages/ForLeaders"));
const Membership = lazy(() => import("./pages/Membership"));
const Marriage = lazy(() => import("./pages/Marriage"));
const Parenting = lazy(() => import("./pages/Parenting"));
const Doubt = lazy(() => import("./pages/Doubt"));
const StartHereQuiz = lazy(() => import("./pages/StartHereQuiz"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const ToolsHub = lazy(() => import("./pages/ToolsHub"));
const VerseFinder = lazy(() => import("./pages/tools/VerseFinder"));
const WorkWithJames = lazy(() => import("./pages/WorkWithJames"));
const ReadingPathDetail = lazy(() =>
  import("./pages/ReadingPathDetail").then((m) => ({ default: m.ReadingPathDetail }))
);
const AuthorProfile = lazy(() =>
  import("./pages/AuthorProfile").then((m) => ({ default: m.AuthorProfile }))
);
const ArticleCollections = lazy(() =>
  import("./pages/ArticleCollections").then((m) => ({ default: m.ArticleCollections }))
);
const BookBundles = lazy(() =>
  import("./pages/BookBundles").then((m) => ({ default: m.BookBundles }))
);
const LeadMagnetsPage = lazy(() =>
  import("./pages/LeadMagnets").then((m) => ({ default: m.LeadMagnetsPage }))
);

const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminPosts = lazy(() => import("./pages/AdminPosts"));
const AdminPostEditor = lazy(() => import("./pages/AdminPostEditor"));
const AdminResources = lazy(() => import("./pages/AdminResources"));
const AdminResourceEditor = lazy(() => import("./pages/AdminResourceEditor"));
const AdminBooks = lazy(() => import("./pages/AdminBooks"));
const AdminBookEditor = lazy(() => import("./pages/AdminBookEditor"));
const AdminAbout = lazy(() => import("./pages/AdminAbout"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));
const AdminContentSync = lazy(() => import("./pages/AdminContentSync"));
const NotificationsAdmin = lazy(() =>
  import("./pages/admin/NotificationsAdmin").then((m) => ({ default: m.NotificationsAdmin }))
);
const ModerationAdmin = lazy(() =>
  import("./pages/admin/ModerationAdmin").then((m) => ({ default: m.ModerationAdmin }))
);

function ArticlesRedirect() {
  const [, navigate] = useLocation();
  useEffect(() => { navigate("/writing", { replace: true }); }, [navigate]);
  return null;
}

function ForFamiliesRedirect() {
  const [, navigate] = useLocation();
  useEffect(() => { navigate("/parenting", { replace: true }); }, [navigate]);
  return null;
}

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/marriage" component={Marriage} />
        <Route path="/parenting" component={Parenting} />
        <Route path="/doubt" component={Doubt} />
        <Route path="/start" component={StartHereQuiz} />
        <Route path="/for-families" component={ForFamiliesRedirect} />
        <Route path="/pillars" component={Pillars} />
        <Route path="/for-pastors" component={ForPastors} />
        <Route path="/for-leaders" component={ForLeaders} />
        <Route path="/membership" component={Membership} />
        <Route path="/writing" component={Writing} />
        <Route path="/writing/:slug" component={ArticleDetail} />
        <Route path="/articles" component={ArticlesRedirect} />
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
        <Route path="/tools" component={ToolsHub} />
        <Route path="/tools/verse-finder" component={VerseFinder} />
        <Route path="/work-with-james" component={WorkWithJames} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/resources-for-pastors" component={ResourcesForPastors} />
<Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin"><ProtectedRoute component={AdminDashboard} requireAdmin /></Route>
        <Route path="/admin/posts"><ProtectedRoute component={AdminPosts} requireAdmin /></Route>
        <Route path="/admin/posts/new"><ProtectedRoute component={AdminPostEditor} requireAdmin /></Route>
        <Route path="/admin/posts/:id/edit"><ProtectedRoute component={AdminPostEditor} requireAdmin /></Route>
        <Route path="/admin/resources"><ProtectedRoute component={AdminResources} requireAdmin /></Route>
        <Route path="/admin/resources/new"><ProtectedRoute component={AdminResourceEditor} requireAdmin /></Route>
        <Route path="/admin/resources/:id/edit"><ProtectedRoute component={AdminResourceEditor} requireAdmin /></Route>
        <Route path="/admin/books"><ProtectedRoute component={AdminBooks} requireAdmin /></Route>
        <Route path="/admin/books/new"><ProtectedRoute component={AdminBookEditor} requireAdmin /></Route>
        <Route path="/admin/books/:id/edit"><ProtectedRoute component={AdminBookEditor} requireAdmin /></Route>
        <Route path="/admin/about"><ProtectedRoute component={AdminAbout} requireAdmin /></Route>
        <Route path="/admin/settings"><ProtectedRoute component={AdminSettings} requireAdmin /></Route>
        <Route path="/admin/sync"><ProtectedRoute component={AdminContentSync} requireAdmin /></Route>
        <Route path="/admin/moderation"><ProtectedRoute component={ModerationAdmin} requireAdmin /></Route>
        <Route path="/admin/notifications"><ProtectedRoute component={NotificationsAdmin} requireAdmin /></Route>
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
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
