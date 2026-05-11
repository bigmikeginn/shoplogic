import { useState, useEffect } from 'react';
import ModuleMenu from './components/ModuleMenu';
import ToolLayout from './components/ToolLayout';
import BoardFeet from './components/BoardFeet';
import PlywoodPlanner from './components/PlywoodPlanner';
import FinishEstimator from './components/FinishEstimator';
import MetricConverter from './components/MetricConverter';
import WoodDatabase from './components/WoodDatabase';
import JoinerySpacing from './components/JoinerySpacing';
import CutListGenerator from './components/CutListGenerator';
import WoodMovementCalc from './components/WoodMovementCalc';
import FastenerCalculator from './components/FastenerCalculator';
import GoldenRatio from './components/GoldenRatio';
import StairCalculator from './components/StairCalculator';
import CompoundMiter from './components/CompoundMiter';
import ShelfSag from './components/ShelfSag';
import BoardFootPricing from './components/BoardFootPricing';
import ArcRadius from './components/ArcRadius';
import MetalWeight from './components/MetalWeight';
import TapDrill from './components/TapDrill';
import TorqueConverter from './components/TorqueConverter';
import GearRatio from './components/GearRatio';
import BoltCircle from './components/BoltCircle';
import TriangleSolver from './components/TriangleSolver';
import { getModuleById } from './utils/moduleConfig';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import useFirebaseAuth from './hooks/useFirebaseAuth';

const COMPONENT_MAP = {
  'board-feet': BoardFeet,
  'plywood-planner': PlywoodPlanner,
  'finish-estimator': FinishEstimator,
  'metric-converter': MetricConverter,
  'wood-database': WoodDatabase,
  'joinery-spacer': JoinerySpacing,
  'cut-list-generator': CutListGenerator,
  'wood-movement-calc': WoodMovementCalc,
  'fastener-calculator': FastenerCalculator,
  'golden-ratio': GoldenRatio,
  'stair-calculator': StairCalculator,
  'compound-miter': CompoundMiter,
  'shelf-sag': ShelfSag,
  'board-foot-pricing': BoardFootPricing,
  'arc-radius': ArcRadius,
  'metal-weight': MetalWeight,
  'tap-drill': TapDrill,
  'torque-converter': TorqueConverter,
  'gear-ratio': GearRatio,
  'bolt-circle': BoltCircle,
  'triangle-solver': TriangleSolver,
};

export default function App() {
  const { user, loading: authLoading, signOut } = useFirebaseAuth();
  const [viewMode, setViewMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('app') === 'true' ? 'menu' : 'landing';
  });
  const [activeModule, setActiveModule] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [authView, setAuthView] = useState('login');

  const handleSelectModule = (moduleId) => {
    setActiveModule(moduleId);
    setViewMode('module');
    window.history.pushState({ viewMode: 'module', moduleId }, '');
  };

  const handleBackToMenu = () => {
    setViewMode('menu');
    setActiveModule(null);
  };

  const handleLoginSuccess = () => {
    setViewMode('projects');
  };

  const handleSignupSuccess = () => {
    setViewMode('projects');
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setViewMode('landing');
      setSelectedProjectId(null);
      setAuthView('login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    setViewMode('project-detail');
  };

  const handleBackFromProject = () => {
    setSelectedProjectId(null);
    setViewMode('projects');
  };

  useEffect(() => {
    const handlePopState = () => handleBackToMenu();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-[var(--text-muted)]">Loading...</div>
      </div>
    );
  }

  // Landing page (unauthenticated, not in app mode)
  if (viewMode === 'landing') {
    return <LandingPage />;
  }

  // Auth pages (login/signup)
  if (!user) {
    if (authView === 'login') {
      return (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignup={() => setAuthView('signup')}
        />
      );
    }
    return (
      <SignupPage
        onSignupSuccess={handleSignupSuccess}
        onSwitchToLogin={() => setAuthView('login')}
      />
    );
  }

  // Projects page (authenticated)
  if (viewMode === 'projects') {
    return (
      <ProjectsPage
        onSelectProject={handleSelectProject}
        onLogout={handleLogout}
      />
    );
  }

  // Project detail page
  if (viewMode === 'project-detail') {
    return (
      <ProjectDetailPage
        projectId={selectedProjectId}
        onBack={handleBackFromProject}
      />
    );
  }

  // Menu (authenticated, with app=true)
  if (viewMode === 'menu') {
    return <ModuleMenu onSelectModule={handleSelectModule} />;
  }

  // Module/tool view
  const Component = COMPONENT_MAP[activeModule];
  const moduleConfig = getModuleById(activeModule);

  return (
    <ToolLayout
      title={moduleConfig?.title ?? ''}
      description={moduleConfig?.description ?? ''}
      onBack={handleBackToMenu}
    >
      {Component && <Component />}
    </ToolLayout>
  );
}