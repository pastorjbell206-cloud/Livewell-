import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";
import { Suspense, lazy, startTransition, useCallback, useEffect } from "react";
import { JUSTICE, DISRUPTION } from "./lib/prophetic";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";
import { ToastContainer } from "./components/ToastContainer";
import Home from "./pages/Home";
const Writing = lazy(() => import("./pages/Writing"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const Books = lazy(() => import("./pages/Books"));
const BookDetail = lazy(() => import("./pages/BookDetail"));
const AloneInACrowdedChurch = lazy(() => import("./pages/books/AloneInACrowdedChurch"));
const AloneInACrowdedChurchThankYou = lazy(() => import("./pages/books/AloneInACrowdedChurchThankYou"));
const Covenant = lazy(() => import("./pages/books/Covenant"));
const CovenantThankYou = lazy(() => import("./pages/books/CovenantThankYou"));
const Babylon = lazy(() => import("./pages/books/Babylon"));
const BabylonThankYou = lazy(() => import("./pages/books/BabylonThankYou"));
const HowToReadTheBible = lazy(() => import("./pages/books/HowToReadTheBible"));
const HowToReadTheBibleThankYou = lazy(() => import("./pages/books/HowToReadTheBibleThankYou"));
const BeTrueToYourself = lazy(() => import("./pages/books/BeTrueToYourself"));
const BeTrueToYourselfThankYou = lazy(() => import("./pages/books/BeTrueToYourselfThankYou"));
const WhatBelongsToThePoor = lazy(() => import("./pages/books/WhatBelongsToThePoor"));
const WhatBelongsToThePoorThankYou = lazy(() => import("./pages/books/WhatBelongsToThePoorThankYou"));
const RuleOfLifeBook = lazy(() => import("./pages/books/RuleOfLife"));
const RuleOfLifeThankYou = lazy(() => import("./pages/books/RuleOfLifeThankYou"));
const WhyNotWhat = lazy(() => import("./pages/books/WhyNotWhat"));
const WhyNotWhatThankYou = lazy(() => import("./pages/books/WhyNotWhatThankYou"));
const SermonOnTheMountAsPolitics = lazy(() => import("./pages/books/SermonOnTheMountAsPolitics"));
const SermonOnTheMountAsPoliticsThankYou = lazy(() => import("./pages/books/SermonOnTheMountAsPoliticsThankYou"));
const PropheticJustice101 = lazy(() => import("./pages/books/PropheticJustice101"));
const PropheticJustice101ThankYou = lazy(() => import("./pages/books/PropheticJustice101ThankYou"));
const MarriageInMinistry = lazy(() => import("./pages/books/MarriageInMinistry"));
const MarriageInMinistryThankYou = lazy(() => import("./pages/books/MarriageInMinistryThankYou"));
const TheLonelinessOfThePastor = lazy(() => import("./pages/books/TheLonelinessOfThePastor"));
const TheLonelinessOfThePastorThankYou = lazy(() => import("./pages/books/TheLonelinessOfThePastorThankYou"));
const HealWell = lazy(() => import("./pages/books/HealWell"));
const HealWellThankYou = lazy(() => import("./pages/books/HealWellThankYou"));
const BornAgainFromAtheism = lazy(() => import("./pages/books/BornAgainFromAtheism"));
const BornAgainFromAtheismThankYou = lazy(() => import("./pages/books/BornAgainFromAtheismThankYou"));
const TheGodWhoIsNotNice = lazy(() => import("./pages/books/TheGodWhoIsNotNice"));
const TheGodWhoIsNotNiceThankYou = lazy(() => import("./pages/books/TheGodWhoIsNotNiceThankYou"));
const FaithAfterDeconstruction = lazy(() => import("./pages/books/FaithAfterDeconstruction"));
const FaithAfterDeconstructionThankYou = lazy(() => import("./pages/books/FaithAfterDeconstructionThankYou"));
const OrdinaryHoliness = lazy(() => import("./pages/books/OrdinaryHoliness"));
const OrdinaryHolinessThankYou = lazy(() => import("./pages/books/OrdinaryHolinessThankYou"));
const TheScandalOfTheCross = lazy(() => import("./pages/books/TheScandalOfTheCross"));
const TheScandalOfTheCrossThankYou = lazy(() => import("./pages/books/TheScandalOfTheCrossThankYou"));
const HeavenIsNotYourReward = lazy(() => import("./pages/books/HeavenIsNotYourReward"));
const HeavenIsNotYourRewardThankYou = lazy(() => import("./pages/books/HeavenIsNotYourRewardThankYou"));
const PrayerInTheDark = lazy(() => import("./pages/books/PrayerInTheDark"));
const PrayerInTheDarkThankYou = lazy(() => import("./pages/books/PrayerInTheDarkThankYou"));
const TheBodyYouLeft = lazy(() => import("./pages/books/TheBodyYouLeft"));
const TheBodyYouLeftThankYou = lazy(() => import("./pages/books/TheBodyYouLeftThankYou"));
const WhenGodBlessAmerica = lazy(() => import("./pages/WhenGodBlessAmerica"));
const WhenGodBlessAmericaThankYou = lazy(() => import("./pages/WhenGodBlessAmericaThankYou"));
const Believe = lazy(() => import("./pages/Believe"));
const BelieveThankYou = lazy(() => import("./pages/BelieveThankYou"));
const DeconstructionOfFaith = lazy(() => import("./pages/DeconstructionOfFaith"));
const DeconstructionOfFaithThankYou = lazy(() => import("./pages/DeconstructionOfFaithThankYou"));
const RaisingBelievers = lazy(() => import("./pages/RaisingBelievers"));
const RaisingBelieversThankYou = lazy(() => import("./pages/RaisingBelieversThankYou"));
const TheMonsterInTheMirror = lazy(() => import("./pages/TheMonsterInTheMirror"));
const TheMonsterInTheMirrorThankYou = lazy(() => import("./pages/TheMonsterInTheMirrorThankYou"));
const TheReliabilityOfScripture = lazy(() => import("./pages/TheReliabilityOfScripture"));
const TheReliabilityOfScriptureThankYou = lazy(() => import("./pages/TheReliabilityOfScriptureThankYou"));
const BibleAndHomosexuality = lazy(() => import("./pages/BibleAndHomosexuality"));
const BibleAndHomosexualityThankYou = lazy(() => import("./pages/BibleAndHomosexualityThankYou"));
const BibleAndTransgenderIdentity = lazy(() => import("./pages/BibleAndTransgenderIdentity"));
const BibleAndTransgenderIdentityThankYou = lazy(() => import("./pages/BibleAndTransgenderIdentityThankYou"));
const IsCriticalRaceTheoryBiblical = lazy(() => import("./pages/IsCriticalRaceTheoryBiblical"));
const IsCriticalRaceTheoryBiblicalThankYou = lazy(() => import("./pages/IsCriticalRaceTheoryBiblicalThankYou"));
const ConsiderTheBirds = lazy(() => import("./pages/ConsiderTheBirds"));
const ConsiderTheBirdsThankYou = lazy(() => import("./pages/ConsiderTheBirdsThankYou"));
const WhereYourTreasureIs = lazy(() => import("./pages/WhereYourTreasureIs"));
const WhereYourTreasureIsThankYou = lazy(() => import("./pages/WhereYourTreasureIsThankYou"));
const About = lazy(() => import("./pages/About"));
const Exile = lazy(() => import("./pages/Exile"));
const Table = lazy(() => import("./pages/table/Table"));
const TableStudy = lazy(() => import("./pages/table/TableStudy"));
const BookLibrary = lazy(() => import("./pages/books/BookLibrary"));
const BookReader = lazy(() => import("./pages/books/BookReader"));

const Resources = lazy(() => import("./pages/Resources"));
const ContextLibrary = lazy(() => import("./pages/resources/ContextLibrary"));
const CreedsLibrary = lazy(() => import("./pages/resources/CreedsLibrary"));
const CreedDocument = lazy(() => import("./pages/resources/CreedDocument"));
const ContextGuide = lazy(() => import("./pages/resources/ContextGuide"));
const StudyGuide = lazy(() => import("./pages/studyguides/StudyGuide"));
const StudyGuidesIndex = lazy(() => import("./pages/studyguides/StudyGuidesIndex"));
const SubstackPage = lazy(() => import("./pages/Substack"));
const Pastors = lazy(() => import("./pages/Pastors"));
const SkepticTrack = lazy(() => import("./pages/SkepticTrack"));
const PastorsResourceWall = lazy(() => import("./pages/PastorsResourceWall"));
const HardIssuesSeries = lazy(() => import("./pages/HardIssuesSeries"));
const RoadMap = lazy(() => import("./pages/RoadMap"));
const Library = lazy(() => import("./pages/Library"));
const Diagnostic = lazy(() => import("./pages/Diagnostic"));
const BooksStore = lazy(() => import("./pages/BooksStore"));
const SearchPage = lazy(() => import("./pages/Search"));
const TheologyQuiz = lazy(() => import("./pages/TheologyQuiz"));
const ResourcesForPastors = lazy(() => import("./pages/ResourcesForPastors"));
const ReadingPaths = lazy(() => import("./pages/ReadingPaths"));
const Pathways = lazy(() => import("./pages/Pathways"));
const TopicPathway = lazy(() => import("./pages/TopicPathway"));
const EmailSignup = lazy(() => import("./pages/EmailSignup"));
const Pillars = lazy(() => import("./pages/Pillars"));
const LivingWell = lazy(() => import("./pages/LivingWell"));
const ForPastors = lazy(() => import("./pages/ForPastors"));
const ForLeaders = lazy(() => import("./pages/ForLeaders"));
const Membership = lazy(() => import("./pages/Membership"));
const MembershipSuccess = lazy(() => import("./pages/MembershipSuccess"));
const Discipleship = lazy(() => import("./pages/Discipleship"));
const DiscipleMaking = lazy(() => import("./pages/DiscipleMaking"));
const Wisdom = lazy(() => import("./pages/Wisdom"));
const HowTos = lazy(() => import("./pages/HowTos"));
const HowToArticle = lazy(() => import("./pages/HowToArticle"));
const LifeIndex = lazy(() => import("./pages/life/LifeIndex"));
const LifeDomain = lazy(() => import("./pages/life/LifeDomain"));
const WholeLifeAssessment = lazy(() => import("./pages/life/WholeLifeAssessment"));
const Marriage = lazy(() => import("./pages/Marriage"));
const Parenting = lazy(() => import("./pages/Parenting"));
const Doubt = lazy(() => import("./pages/Doubt"));
const Help = lazy(() => import("./pages/Help"));
const CarePlan = lazy(() => import("./pages/plans/CarePlan"));
const StartHereQuiz = lazy(() => import("./pages/StartHereQuiz"));
const StartHereDiagnostic = lazy(() => import("./pages/StartHereDiagnostic"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const Terms = lazy(() => import("./pages/Terms"));
const ToolsHub = lazy(() => import("./pages/ToolsHub"));
const VerseFinder = lazy(() => import("./pages/tools/VerseFinder"));
const PrayerGenerator = lazy(() => import("./pages/tools/PrayerGenerator"));
const BibleStudy = lazy(() => import("./pages/tools/BibleStudy"));
const MarriageAssessment = lazy(() => import("./pages/tools/MarriageAssessment"));
const FinancialHealth = lazy(() => import("./pages/tools/FinancialHealth"));
const ParentingGuide = lazy(() => import("./pages/tools/ParentingGuide"));
const ParentingVerses = lazy(() => import("./pages/tools/ParentingVerses"));
const Family = lazy(() => import("./pages/Family"));
const FamilyCatechism = lazy(() => import("./pages/FamilyCatechism"));
const FamilyDevotions = lazy(() => import("./pages/FamilyDevotions"));
const FamilyReadingPlans = lazy(() => import("./pages/FamilyReadingPlans"));
const Theology = lazy(() => import("./pages/Theology"));
const TheologyMethodology = lazy(() => import("./pages/TheologyMethodology"));
const TheologyDoctrine = lazy(() => import("./pages/TheologyDoctrine"));
const PassageContext = lazy(() => import("./pages/tools/PassageContext"));
const TheologyHistory = lazy(() => import("./pages/TheologyHistory"));
const HistoryEssay = lazy(() => import("./pages/history/HistoryEssay"));
const Framework = lazy(() => import("./pages/Framework"));
const TheologyBiblical = lazy(() => import("./pages/TheologyBiblical"));
const TheologyCompare = lazy(() => import("./pages/TheologyCompare"));
const TheologyGlossary = lazy(() => import("./pages/TheologyGlossary"));
const TheologyCreeds = lazy(() => import("./pages/TheologyCreeds"));
const TheologyHermeneutics = lazy(() => import("./pages/TheologyHermeneutics"));
const TheologyDiagnostic = lazy(() => import("./pages/TheologyDiagnostic"));
const TheologyQuestions = lazy(() => import("./pages/TheologyQuestions"));
const TheologyTraditions = lazy(() => import("./pages/TheologyTraditions"));
const TheologySearch = lazy(() => import("./pages/TheologySearch"));
const TheologyPaths = lazy(() => import("./pages/TheologyPaths"));
const PropheticHub = lazy(() => import("./pages/prophetic/PropheticHub"));
const PropheticPosture = lazy(() => import("./pages/prophetic/PropheticPosture"));
const PropheticTopic = lazy(() => import("./pages/prophetic/PropheticTopic"));
const PropheticConsistency = lazy(() => import("./pages/prophetic/PropheticConsistency"));
const PropheticGlossary = lazy(() => import("./pages/prophetic/PropheticGlossary"));
const PropheticQuestions = lazy(() => import("./pages/prophetic/PropheticQuestions"));
const PropheticWitnesses = lazy(() => import("./pages/prophetic/PropheticWitnesses"));
const PropheticTimeline = lazy(() => import("./pages/prophetic/PropheticTimeline"));
const NationHub = lazy(() => import("./pages/nation/NationHub"));
const NationEssay = lazy(() => import("./pages/nation/NationEssay"));
const NationScorecard = lazy(() => import("./pages/nation/NationScorecard"));
const NationPolicy = lazy(() => import("./pages/nation/NationPolicy"));
const LeadershipHub = lazy(() => import("./pages/leadership/LeadershipHub"));
const LeadershipArticle = lazy(() => import("./pages/leadership/LeadershipArticle"));
const SermonWorkbench = lazy(() => import("./pages/leadership/SermonWorkbench"));
const IllustrationLibrary = lazy(() => import("./pages/leadership/IllustrationLibrary"));
const MeetingBuilder = lazy(() => import("./pages/leadership/MeetingBuilder"));
const VisitationTracker = lazy(() => import("./pages/leadership/VisitationTracker"));
const LeaderAssessment = lazy(() => import("./pages/leadership/LeaderAssessment"));
const ProfileSurvey = lazy(() => import("./pages/leadership/ProfileSurvey"));
const GuidedWorkflow = lazy(() => import("./pages/leadership/GuidedWorkflow"));
const ServiceBuilder = lazy(() => import("./pages/leadership/ServiceBuilder"));
const DecisionLog = lazy(() => import("./pages/leadership/DecisionLog"));
const BudgetCalculator = lazy(() => import("./pages/leadership/BudgetCalculator"));
const BeforeYouPost = lazy(() => import("./pages/leadership/BeforeYouPost"));
const GovernanceLibrary = lazy(() => import("./pages/leadership/GovernanceLibrary"));
const LeadershipLibrary = lazy(() => import("./pages/leadership/LeadershipLibrary"));
const SermonSeries = lazy(() => import("./pages/leadership/SermonSeries"));
const WholeBibleSermons = lazy(() => import("./pages/leadership/WholeBibleSermons"));
const FormationIndex = lazy(() => import("./pages/leadership/FormationIndex"));
const ServantLeadership = lazy(() => import("./pages/leadership/ServantLeadership"));
const FormationGuides = lazy(() => import("./pages/leadership/FormationGuides"));
const ServantLeadershipHandbook = lazy(() => import("./pages/leadership/ServantLeadershipHandbook"));
const FormationTopic = lazy(() => import("./pages/leadership/FormationTopic"));
const FormationInventory = lazy(() => import("./pages/leadership/FormationInventory"));
const PropheticLament = lazy(() => import("./pages/prophetic/PropheticLament"));
const EmotionalHealth = lazy(() => import("./pages/tools/EmotionalHealth"));
const SavedItems = lazy(() => import("./pages/tools/SavedItems"));
const SermonOutline = lazy(() => import("./pages/tools/SermonOutline"));
const ScriptureMemory = lazy(() => import("./pages/tools/ScriptureMemory"));
const ConflictGuide = lazy(() => import("./pages/tools/ConflictGuide"));
const PastorBurnoutTool = lazy(() => import("./pages/tools/PastorBurnout"));
const LifeAudit = lazy(() => import("./pages/tools/LifeAudit"));
const ChurchHealth = lazy(() => import("./pages/tools/ChurchHealth"));
const DeepBibleCompanion = lazy(() => import("./pages/tools/DeepBibleCompanion"));
const FamilyDevotionBuilder = lazy(() => import("./pages/tools/FamilyDevotionBuilder"));
const DiscipleshipTable = lazy(() => import("./pages/tools/DiscipleshipTable"));
const RuleOfLife = lazy(() => import("./pages/tools/RuleOfLife"));
const BibleOnTopic = lazy(() => import("./pages/tools/BibleOnTopic"));
const WisdomFinder = lazy(() => import("./pages/tools/WisdomFinder"));
const Proverbs31 = lazy(() => import("./pages/tools/Proverbs31"));
const BibleReference = lazy(() => import("./pages/tools/BibleReference"));
const ToolsGlossary = lazy(() => import("./pages/tools/TheologyGlossary"));
const QuoteLibrary = lazy(() => import("./pages/tools/QuoteLibrary"));
const PostChristianSermonSeries = lazy(() => import("./pages/SermonSeries"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const WorkWithJames = lazy(() => import("./pages/WorkWithJames"));
const PastoralBurnout = lazy(() => import("./pages/landing/PastoralBurnout"));
const FaithCrisis = lazy(() => import("./pages/landing/FaithCrisis"));
const MarriageCrisis = lazy(() => import("./pages/landing/MarriageCrisis"));
const GriefLanding = lazy(() => import("./pages/landing/Grief"));
const ParentingStruggles = lazy(() => import("./pages/landing/ParentingStruggles"));
const Deconstruction = lazy(() => import("./pages/landing/Deconstruction"));
const ChurchHistory = lazy(() => import("./pages/landing/ChurchHistory"));
const HistoricFaith = lazy(() => import("./pages/HistoricFaith"));
const ChurchHurt = lazy(() => import("./pages/landing/ChurchHurt"));
const HonestQuestions = lazy(() => import("./pages/landing/HonestQuestions"));
const PostChristianLanding = lazy(() => import("./pages/landing/PostChristian"));
const FaqIndex = lazy(() => import("./pages/FaqIndex"));
const FAQWhyArePeopleLeavingChurch = lazy(() => import("./pages/faq/WhyArePeopleLeavingChurch"));
const FAQWhatIsDeconstruction = lazy(() => import("./pages/faq/WhatIsDeconstruction"));
const FAQIsBibleHistoricallyAccurate = lazy(() => import("./pages/faq/IsBibleHistoricallyAccurate"));
const FAQWhatDenominationShouldIJoin = lazy(() => import("./pages/faq/WhatDenominationShouldIJoin"));
const FAQDoesGodExist = lazy(() => import("./pages/faq/DoesGodExist"));
const FAQWhatDoChristiansBelieveAboutHell = lazy(() => import("./pages/faq/WhatDoChristiansBelieveAboutHell"));
const FAQCatholicVsProtestant = lazy(() => import("./pages/faq/WhatIsTheDifferenceBetweenCatholicAndProtestant"));
const FAQWhatIsReligiousTrauma = lazy(() => import("./pages/faq/WhatIsReligiousTrauma"));
const FAQWhyDoYoungPeopleLeaveChurch = lazy(() => import("./pages/faq/WhyDoYoungPeopleLeaveChurch"));
const FAQCanScienceAndFaithCoexist = lazy(() => import("./pages/faq/CanScienceAndFaithCoexist"));
const CatholicVsProtestant = lazy(() => import("./pages/comparisons/CatholicVsProtestant"));
const CalvinismVsArminianism = lazy(() => import("./pages/comparisons/CalvinismVsArminianism"));
const BaptistVsMethodist = lazy(() => import("./pages/comparisons/BaptistVsMethodist"));
const EvangelicalVsMainline = lazy(() => import("./pages/comparisons/EvangelicalVsMainline"));
const OrthodoxVsCatholic = lazy(() => import("./pages/comparisons/OrthodoxVsCatholic"));
const LiturgicalVsContemporary = lazy(() => import("./pages/comparisons/LiturgicalVsContemporary"));
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
const AdminSubscribers = lazy(() => import("./pages/AdminSubscribers"));
const AdminContentSync = lazy(() => import("./pages/AdminContentSync"));
const AdminPublishContent = lazy(() => import("./pages/AdminPublishContent"));
const AdminSetupNavigation = lazy(() => import("./pages/AdminSetupNavigation"));
const AdminDeduplicate = lazy(() => import("./pages/AdminDeduplicate"));
const AdminLoadDrafts = lazy(() => import("./pages/AdminLoadDrafts"));
const AdminImportSubstack = lazy(() => import("./pages/AdminImportSubstack"));
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
    <div
      role="status"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bone)",
      }}
    >
      {/* Nav-band silhouette so the header's place holds while a route loads */}
      <div
        aria-hidden
        style={{
          height: "58px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          background: "rgba(245,240,230,0.97)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span style={{ fontFamily: "var(--F)", fontSize: "20px", color: "var(--ink)" }}>LiveWell</span>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          textAlign: "center",
          padding: "var(--s-4)",
        }}
      >
      <p
        style={{
          fontFamily: "var(--F)",
          fontSize: "26px",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: "var(--ink)",
          margin: 0,
        }}
      >
        One moment.
      </p>
      <p
        style={{
          fontFamily: "var(--B)",
          fontSize: "14px",
          color: "var(--ink-muted)",
          margin: 0,
        }}
      >
        Loading the page…
      </p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/marriage" component={Marriage} />
        <Route path="/life/assessment" component={WholeLifeAssessment} />
        <Route path="/life/:slug" component={LifeDomain} />
        <Route path="/life" component={LifeIndex} />
        <Route path="/exile" component={Exile} />
        <Route path="/table/:slug" component={TableStudy} />
        <Route path="/table" component={Table} />
        <Route path="/read/:slug" component={BookReader} />
        <Route path="/read" component={BookLibrary} />
        <Route path="/parenting" component={Parenting} />
        <Route path="/family/catechism" component={FamilyCatechism} />
        <Route path="/family/devotions" component={FamilyDevotions} />
        <Route path="/family/reading-plans" component={FamilyReadingPlans} />
        <Route path="/family" component={Family} />
        <Route path="/theology/passage" component={PassageContext} />
        <Route path="/theology/history/:slug" component={HistoryEssay} />
        <Route path="/theology/history" component={TheologyHistory} />
        <Route path="/framework" component={Framework} />
        <Route path="/theology/biblical" component={TheologyBiblical} />
        <Route path="/theology/compare" component={TheologyCompare} />
        <Route path="/theology/glossary" component={TheologyGlossary} />
        <Route path="/theology/creeds" component={TheologyCreeds} />
        <Route path="/theology/hermeneutics" component={TheologyHermeneutics} />
        <Route path="/theology/which-view" component={TheologyDiagnostic} />
        <Route path="/theology/questions" component={TheologyQuestions} />
        <Route path="/theology/traditions" component={TheologyTraditions} />
        <Route path="/theology/search" component={TheologySearch} />
        <Route path="/theology/paths" component={TheologyPaths} />
        <Route path="/disruption/posture"><PropheticPosture config={DISRUPTION} /></Route>
        <Route path="/disruption/consistency"><PropheticConsistency config={DISRUPTION} /></Route>
        <Route path="/disruption/glossary"><PropheticGlossary config={DISRUPTION} /></Route>
        <Route path="/disruption/questions"><PropheticQuestions config={DISRUPTION} /></Route>
        <Route path="/disruption/witnesses"><PropheticWitnesses config={DISRUPTION} /></Route>
        <Route path="/disruption/topic/:slug"><PropheticTopic config={DISRUPTION} /></Route>
        <Route path="/disruption"><PropheticHub config={DISRUPTION} /></Route>
        <Route path="/justice/posture"><PropheticPosture config={JUSTICE} /></Route>
        <Route path="/justice/glossary"><PropheticGlossary config={JUSTICE} /></Route>
        <Route path="/justice/witnesses"><PropheticWitnesses config={JUSTICE} /></Route>
        <Route path="/justice/timeline"><PropheticTimeline /></Route>
        <Route path="/nation/christian-nation"><NationEssay slug="christian-nation" /></Route>
        <Route path="/nation/theocracy"><NationEssay slug="theocracy" /></Route>
        <Route path="/nation/empire"><NationEssay slug="empire" /></Route>
        <Route path="/nation/which-party"><NationEssay slug="which-party" /></Route>
        <Route path="/nation/render"><NationEssay slug="render" /></Route>
        <Route path="/nation/christian-nationalism"><NationEssay slug="christian-nationalism" /></Route>
        <Route path="/nation/nationalism-history"><NationEssay slug="nationalism-history" /></Route>
        <Route path="/nation/power-and-church"><NationEssay slug="power-and-church" /></Route>
        <Route path="/nation/progressive-captivity"><NationEssay slug="progressive-captivity" /></Route>
        <Route path="/nation/compassion-and-coercion"><NationEssay slug="compassion-and-coercion" /></Route>
        <Route path="/lament"><PropheticLament /></Route>
        <Route path="/nation/scorecard"><NationScorecard /></Route>
        <Route path="/nation/policy"><NationPolicy /></Route>
        <Route path="/nation"><NationHub /></Route>
        <Route path="/leadership/sermon-prep"><SermonWorkbench /></Route>
        <Route path="/leadership/illustrations"><IllustrationLibrary /></Route>
        <Route path="/leadership/meeting"><MeetingBuilder /></Route>
        <Route path="/leadership/visitation"><VisitationTracker /></Route>
        <Route path="/leadership/assessment/:slug"><LeaderAssessment /></Route>
        <Route path="/leadership/survey/:slug"><ProfileSurvey /></Route>
        <Route path="/leadership/workflow/:slug"><GuidedWorkflow /></Route>
        <Route path="/leadership/service/:slug"><ServiceBuilder /></Route>
        <Route path="/leadership/governance"><GovernanceLibrary /></Route>
        <Route path="/leadership/library"><LeadershipLibrary /></Route>
        <Route path="/leadership/bible-sermons/:bookId"><WholeBibleSermons /></Route>
        <Route path="/leadership/bible-sermons"><WholeBibleSermons /></Route>
        <Route path="/leadership/sermon-series"><SermonSeries /></Route>
        <Route path="/leadership/budget"><BudgetCalculator /></Route>
        <Route path="/leadership/decision-log"><DecisionLog /></Route>
        <Route path="/leadership/before-you-post"><BeforeYouPost /></Route>
        <Route path="/leadership/article/:slug"><LeadershipArticle /></Route>
        <Route path="/leadership/formation/:slug" component={FormationTopic} />
        <Route path="/leadership/handbook" component={ServantLeadershipHandbook} />
        <Route path="/leadership/servant-leadership" component={ServantLeadership} />
        <Route path="/leadership/guides/:slug" component={FormationGuides} />
        <Route path="/leadership/guides" component={FormationGuides} />
        <Route path="/leadership/formation" component={FormationIndex} />
        <Route path="/leadership/inventory" component={FormationInventory} />
        <Route path="/leadership"><LeadershipHub /></Route>
        <Route path="/justice/topic/:slug"><PropheticTopic config={JUSTICE} /></Route>
        <Route path="/justice"><PropheticHub config={JUSTICE} /></Route>
        <Route path="/theology/how-to-use" component={TheologyMethodology} />
        <Route path="/theology/doctrine/:slug" component={TheologyDoctrine} />
        <Route path="/theology" component={Theology} />
        <Route path="/doubt" component={Doubt} />
        <Route path="/help" component={Help} />
        <Route path="/plans/:slug" component={CarePlan} />
        <Route path="/start" component={StartHereQuiz} />
        <Route path="/start-here" component={StartHereDiagnostic} />
        <Route path="/for-families" component={ForFamiliesRedirect} />
        <Route path="/pillars" component={Pillars} />
        <Route path="/living-well" component={LivingWell} />
        <Route path="/for-pastors" component={ForPastors} />
        <Route path="/for-leaders" component={ForLeaders} />
        <Route path="/membership" component={Membership} />
        <Route path="/membership/success" component={MembershipSuccess} />
        <Route path="/discipleship" component={Discipleship} />
        <Route path="/disciple-making" component={DiscipleMaking} />
        <Route path="/wisdom" component={Wisdom} />
        <Route path="/how-tos" component={HowTos} />
        <Route path="/how-tos/:slug" component={HowToArticle} />
        <Route path="/studyguides" component={StudyGuidesIndex} />
        <Route path="/studyguides/:slug" component={StudyGuide} />
        <Route path="/writing" component={Writing} />
        <Route path="/writing/:slug" component={ArticleDetail} />
        <Route path="/articles" component={ArticlesRedirect} />
        <Route path="/reading-paths" component={ReadingPaths} />
        <Route path="/reading-paths/:slug" component={ReadingPathDetail} />
        <Route path="/pathways" component={Pathways} />
        <Route path="/pathways/:slug" component={TopicPathway} />
        <Route path="/subscribe" component={EmailSignup} />
        <Route path="/authors/:slug" component={AuthorProfile} />
        <Route path="/article-collections" component={ArticleCollections} />
        <Route path="/book-bundles" component={BookBundles} />
        <Route path="/resources/hard-issues-series" component={HardIssuesSeries} />
        <Route path="/resources/context/:slug" component={ContextGuide} />
        <Route path="/resources/context" component={ContextLibrary} />
        <Route path="/resources/creeds/:slug" component={CreedDocument} />
        <Route path="/resources/creeds" component={CreedsLibrary} />
        <Route path="/resources" component={Resources} />
        <Route path="/books" component={Books} />
        <Route path="/books/when-god-bless-america/thank-you" component={WhenGodBlessAmericaThankYou} />
        <Route path="/books/when-god-bless-america" component={WhenGodBlessAmerica} />
        <Route path="/books/believe/thank-you" component={BelieveThankYou} />
        <Route path="/books/believe" component={Believe} />
        <Route path="/books/deconstruction-of-faith/thank-you" component={DeconstructionOfFaithThankYou} />
        <Route path="/books/deconstruction-of-faith" component={DeconstructionOfFaith} />
        <Route path="/books/raising-believers/thank-you" component={RaisingBelieversThankYou} />
        <Route path="/books/raising-believers" component={RaisingBelievers} />
        <Route path="/books/the-monster-in-the-mirror/thank-you" component={TheMonsterInTheMirrorThankYou} />
        <Route path="/books/the-monster-in-the-mirror" component={TheMonsterInTheMirror} />
        <Route path="/books/the-reliability-of-scripture/thank-you" component={TheReliabilityOfScriptureThankYou} />
        <Route path="/books/the-reliability-of-scripture" component={TheReliabilityOfScripture} />
        <Route path="/books/bible-and-homosexuality/thank-you" component={BibleAndHomosexualityThankYou} />
        <Route path="/books/bible-and-homosexuality" component={BibleAndHomosexuality} />
        <Route path="/books/bible-and-transgender-identity/thank-you" component={BibleAndTransgenderIdentityThankYou} />
        <Route path="/books/bible-and-transgender-identity" component={BibleAndTransgenderIdentity} />
        <Route path="/books/critical-race-theory-biblical/thank-you" component={IsCriticalRaceTheoryBiblicalThankYou} />
        <Route path="/books/critical-race-theory-biblical" component={IsCriticalRaceTheoryBiblical} />
        <Route path="/books/:slug" component={BookDetail} />
        {/* LiveWell series — top-level sales + gated thank-you pages */}
        <Route path="/consider-the-birds/thank-you" component={ConsiderTheBirdsThankYou} />
        <Route path="/consider-the-birds" component={ConsiderTheBirds} />
        <Route path="/where-your-treasure-is/thank-you" component={WhereYourTreasureIsThankYou} />
        <Route path="/where-your-treasure-is" component={WhereYourTreasureIs} />
        <Route path="/alone-in-a-crowded-church/thank-you" component={AloneInACrowdedChurchThankYou} />
        <Route path="/alone-in-a-crowded-church" component={AloneInACrowdedChurch} />
        <Route path="/covenant/thank-you" component={CovenantThankYou} />
        <Route path="/covenant" component={Covenant} />
        <Route path="/babylon/thank-you" component={BabylonThankYou} />
        <Route path="/babylon" component={Babylon} />
        <Route path="/how-to-read-the-bible/thank-you" component={HowToReadTheBibleThankYou} />
        <Route path="/how-to-read-the-bible" component={HowToReadTheBible} />
        <Route path="/be-true-to-yourself/thank-you" component={BeTrueToYourselfThankYou} />
        <Route path="/be-true-to-yourself" component={BeTrueToYourself} />
        <Route path="/what-belongs-to-the-poor/thank-you" component={WhatBelongsToThePoorThankYou} />
        <Route path="/what-belongs-to-the-poor" component={WhatBelongsToThePoor} />
        <Route path="/rule-of-life/thank-you" component={RuleOfLifeThankYou} />
        <Route path="/rule-of-life" component={RuleOfLifeBook} />
        <Route path="/why-not-what/thank-you" component={WhyNotWhatThankYou} />
        <Route path="/why-not-what" component={WhyNotWhat} />
        <Route path="/sermon-series" component={PostChristianSermonSeries} />
        <Route path="/sermon-on-the-mount-as-politics/thank-you" component={SermonOnTheMountAsPoliticsThankYou} />
        <Route path="/sermon-on-the-mount-as-politics" component={SermonOnTheMountAsPolitics} />
        <Route path="/prophetic-justice-101/thank-you" component={PropheticJustice101ThankYou} />
        <Route path="/prophetic-justice-101" component={PropheticJustice101} />
        <Route path="/marriage-in-ministry/thank-you" component={MarriageInMinistryThankYou} />
        <Route path="/marriage-in-ministry" component={MarriageInMinistry} />
        <Route path="/the-loneliness-of-the-pastor/thank-you" component={TheLonelinessOfThePastorThankYou} />
        <Route path="/the-loneliness-of-the-pastor" component={TheLonelinessOfThePastor} />
        <Route path="/healwell/thank-you" component={HealWellThankYou} />
        <Route path="/healwell" component={HealWell} />
        <Route path="/born-again-from-atheism/thank-you" component={BornAgainFromAtheismThankYou} />
        <Route path="/born-again-from-atheism" component={BornAgainFromAtheism} />
        <Route path="/the-god-who-is-not-nice/thank-you" component={TheGodWhoIsNotNiceThankYou} />
        <Route path="/the-god-who-is-not-nice" component={TheGodWhoIsNotNice} />
        <Route path="/faith-after-deconstruction/thank-you" component={FaithAfterDeconstructionThankYou} />
        <Route path="/faith-after-deconstruction" component={FaithAfterDeconstruction} />
        <Route path="/ordinary-holiness/thank-you" component={OrdinaryHolinessThankYou} />
        <Route path="/ordinary-holiness" component={OrdinaryHoliness} />
        <Route path="/the-scandal-of-the-cross/thank-you" component={TheScandalOfTheCrossThankYou} />
        <Route path="/the-scandal-of-the-cross" component={TheScandalOfTheCross} />
        <Route path="/heaven-is-not-your-reward/thank-you" component={HeavenIsNotYourRewardThankYou} />
        <Route path="/heaven-is-not-your-reward" component={HeavenIsNotYourReward} />
        <Route path="/prayer-in-the-dark/thank-you" component={PrayerInTheDarkThankYou} />
        <Route path="/prayer-in-the-dark" component={PrayerInTheDark} />
        <Route path="/the-body-you-left/thank-you" component={TheBodyYouLeftThankYou} />
        <Route path="/the-body-you-left" component={TheBodyYouLeft} />
        <Route path="/substack" component={SubstackPage} />
        <Route path="/pastors" component={Pastors} />
        <Route path="/about" component={About} />
        <Route path="/books-store" component={BooksStore} />
        <Route path="/search" component={SearchPage} />
        <Route path="/tools/theology-quiz" component={TheologyQuiz} />
        {/* Legacy alias; vercel.json 301s /quiz to /tools/theology-quiz */}
        <Route path="/quiz" component={TheologyQuiz} />
        <Route path="/skeptic-track" component={SkepticTrack} />
        <Route path="/pastors-resource-wall" component={PastorsResourceWall} />
        <Route path="/roadmap" component={RoadMap} />
        <Route path="/library" component={Library} />
        <Route path="/diagnostic" component={Diagnostic} />
        <Route path="/tools" component={ToolsHub} />
        <Route path="/tools/verse-finder" component={VerseFinder} />
        <Route path="/tools/prayer-generator" component={PrayerGenerator} />
        <Route path="/tools/bible-study" component={BibleStudy} />
        <Route path="/tools/parenting-verses" component={ParentingVerses} />
        <Route path="/tools/marriage-assessment" component={MarriageAssessment} />
        <Route path="/tools/financial-health" component={FinancialHealth} />
        <Route path="/tools/parenting-guide" component={ParentingGuide} />
        <Route path="/tools/emotional-health" component={EmotionalHealth} />
        <Route path="/tools/saved" component={SavedItems} />
        <Route path="/tools/sermon-outline" component={SermonOutline} />
        <Route path="/tools/scripture-memory" component={ScriptureMemory} />
        <Route path="/tools/conflict-guide" component={ConflictGuide} />
        <Route path="/tools/pastor-burnout" component={PastorBurnoutTool} />
        <Route path="/tools/life-audit" component={LifeAudit} />
        <Route path="/tools/church-health" component={ChurchHealth} />
        <Route path="/tools/deep-bible" component={DeepBibleCompanion} />
        <Route path="/tools/family-devotions" component={FamilyDevotionBuilder} />
        <Route path="/tools/discipleship-table" component={DiscipleshipTable} />
        <Route path="/tools/rule-of-life" component={RuleOfLife} />
        <Route path="/tools/bible-on" component={BibleOnTopic} />
        <Route path="/tools/wisdom-finder" component={WisdomFinder} />
        <Route path="/tools/proverbs-31" component={Proverbs31} />
        <Route path="/tools/bible-says" component={BibleReference} />
        <Route path="/tools/quotes" component={QuoteLibrary} />
        <Route path="/tools/glossary" component={ToolsGlossary} />
        <Route path="/work-with-james" component={WorkWithJames} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/accessibility" component={Accessibility} />
        <Route path="/terms" component={Terms} />
        <Route path="/resources-for-pastors" component={ResourcesForPastors} />
        <Route path="/pastoral-burnout" component={PastoralBurnout} />
        <Route path="/faith-crisis" component={FaithCrisis} />
        <Route path="/marriage-crisis" component={MarriageCrisis} />
        <Route path="/grief" component={GriefLanding} />
        <Route path="/parenting-help" component={ParentingStruggles} />
        <Route path="/deconstruction" component={Deconstruction} />
        <Route path="/church-history" component={ChurchHistory} />
        <Route path="/historic-faith" component={HistoricFaith} />
        <Route path="/church-hurt" component={ChurchHurt} />
        <Route path="/honest-questions" component={HonestQuestions} />
        <Route path="/compare/catholic-vs-protestant" component={CatholicVsProtestant} />
        <Route path="/compare/calvinism-vs-arminianism" component={CalvinismVsArminianism} />
        <Route path="/compare/baptist-vs-methodist" component={BaptistVsMethodist} />
        <Route path="/compare/evangelical-vs-mainline" component={EvangelicalVsMainline} />
        <Route path="/compare/orthodox-vs-catholic" component={OrthodoxVsCatholic} />
        <Route path="/compare/liturgical-vs-contemporary" component={LiturgicalVsContemporary} />
        <Route path="/post-christian" component={PostChristianLanding} />
        <Route path="/faq" component={FaqIndex} />
        <Route path="/faq/why-are-people-leaving-church" component={FAQWhyArePeopleLeavingChurch} />
        <Route path="/faq/what-is-deconstruction" component={FAQWhatIsDeconstruction} />
        <Route path="/faq/is-the-bible-historically-accurate" component={FAQIsBibleHistoricallyAccurate} />
        <Route path="/faq/what-denomination-should-i-join" component={FAQWhatDenominationShouldIJoin} />
        <Route path="/faq/does-god-exist" component={FAQDoesGodExist} />
        <Route path="/faq/what-do-christians-believe-about-hell" component={FAQWhatDoChristiansBelieveAboutHell} />
        <Route path="/faq/catholic-vs-protestant" component={FAQCatholicVsProtestant} />
        <Route path="/faq/what-is-religious-trauma" component={FAQWhatIsReligiousTrauma} />
        <Route path="/faq/why-do-young-people-leave-church" component={FAQWhyDoYoungPeopleLeaveChurch} />
        <Route path="/faq/can-science-and-faith-coexist" component={FAQCanScienceAndFaithCoexist} />
        <Route path="/dashboard" component={Dashboard} />
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
        <Route path="/admin/subscribers"><ProtectedRoute component={AdminSubscribers} requireAdmin /></Route>
        <Route path="/admin/sync"><ProtectedRoute component={AdminContentSync} requireAdmin /></Route>
        <Route path="/admin/publish-content"><ProtectedRoute component={AdminPublishContent} requireAdmin /></Route>
        <Route path="/admin/setup-navigation"><ProtectedRoute component={AdminSetupNavigation} requireAdmin /></Route>
        <Route path="/admin/deduplicate"><ProtectedRoute component={AdminDeduplicate} requireAdmin /></Route>
        <Route path="/admin/load-drafts"><ProtectedRoute component={AdminLoadDrafts} requireAdmin /></Route>
        <Route path="/admin/import-substack"><ProtectedRoute component={AdminImportSubstack} requireAdmin /></Route>
        <Route path="/admin/moderation"><ProtectedRoute component={ModerationAdmin} requireAdmin /></Route>
        <Route path="/admin/notifications"><ProtectedRoute component={NotificationsAdmin} requireAdmin /></Route>
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

/**
 * wouter location hook with navigations wrapped in startTransition: React
 * keeps the current page on screen while the next route's lazy chunk loads,
 * instead of unmounting to the Suspense fallback between pages.
 */
function useTransitionLocation(): ReturnType<typeof useBrowserLocation> {
  const [location, navigate] = useBrowserLocation();
  const navigateInTransition = useCallback(
    (to: string, opts?: { replace?: boolean; state?: unknown }) => {
      startTransition(() => {
        navigate(to, opts);
      });
    },
    [navigate]
  );
  return [location, navigateInTransition as typeof navigate];
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <ToastProvider>
          <TooltipProvider>
            <Toaster />
            <ToastContainer />
            <WouterRouter hook={useTransitionLocation}>
              <Router />
            </WouterRouter>
          </TooltipProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
