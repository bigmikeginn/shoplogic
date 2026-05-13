import { useState, useEffect, useRef } from 'react';
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
import useEntitlement from './hooks/useEntitlement';
import useStripeSuccessHandler from './hooks/useStripeSuccessHandler';
import SaveOutputModal from './components/SaveOutputModal';
import UpgradeModal from './components/UpgradeModal';

function normalizeText(value) {
  return value?.replace(/\s+/g, ' ').trim() ?? '';
}

function getFieldLabel(field, index) {
  const explicitLabel = field.getAttribute('aria-label')
    || field.getAttribute('name')
    || field.getAttribute('placeholder')
    || field.closest('label')?.textContent;

  return normalizeText(explicitLabel) || `field_${index + 1}`;
}

function buildToolSnapshot(container) {
  if (!container) {
    throw new Error('Tool content is not available to save right now.');
  }

  const inputs = {};
  const result = {};

  const labelCounts = {};
  const fields = Array.from(container.querySelectorAll('input, select, textarea'));
  fields.forEach((field, index) => {
    if (field.disabled) return;

    if ((field.type === 'radio' || field.type === 'checkbox') && !field.checked) {
      return;
    }

    const value = field.value;
    if (value === '') return;

    const baseLabel = getFieldLabel(field, index);
    labelCounts[baseLabel] = (labelCounts[baseLabel] || 0) + 1;
    const label = labelCounts[baseLabel] > 1 ? `${baseLabel} (${labelCounts[baseLabel]})` : baseLabel;
    inputs[label] = value;
  });

  const resultCards = Array.from(container.querySelectorAll('.result-card, .result-card-highlight'));
  resultCards.forEach((card, index) => {
    const text = normalizeText(card.innerText);
    if (text) {
      result[`section_${index + 1}`] = text;
    }
  });

  const errors = Array.from(container.querySelectorAll('[class*="text-red"], [class*="border-red"]'))
    .map((node) => normalizeText(node.textContent))
    .filter(Boolean);

  if (errors.length > 0 && Object.keys(result).length === 0) {
    throw new Error('Please calculate a valid result before saving it to a project.');
  }

  if (Object.keys(result).length === 0) {
    throw new Error('Run the tool first so there is something to save.');
  }

  return { inputs, result };
}

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
  const entitlement = useEntitlement();
  useStripeSuccessHandler();
  const toolContentRef = useRef(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [viewMode, setViewMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('app') === 'true' ? 'menu' : 'landing';
  });
  const [activeModule, setActiveModule] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [authView, setAuthView] = useState('login');
  const [saveModalState, setSaveModalState] = useState(null);

  const handleSelectModule = (moduleId) => {
    setActiveModule(moduleId);
    setViewMode('module');
    window.history.pushState({ viewMode: 'module', moduleId }, '');
  };

  const handleBackToMenu = () => {
    setViewMode('menu');
    setActiveModule(null);
  };

  const handleStartSignup = () => {
    setAuthView('signup');
    setViewMode('auth');
  };

  const handleStartLogin = () => {
    setAuthView('login');
    setViewMode('auth');
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

  const handleOpenTools = () => {
    setViewMode('menu');
  };

  const handleOpenSaveModal = () => {
    try {
      if (!activeModule) {
        throw new Error('Open a tool before saving its output.');
      }
      if (!entitlement.isPremium && entitlement.status !== 'loading') {
        setShowUpgradeModal(true);
        return;
      }
      const snapshot = buildToolSnapshot(toolContentRef.current);
      const moduleConfig = getModuleById(activeModule);

      setSaveModalState({
        toolId: activeModule,
        toolName: moduleConfig?.title ?? 'Tool Output',
        inputs: snapshot.inputs,
        result: snapshot.result,
      });
    } catch (err) {
      window.alert(err.message);
    }
  };

  useEffect(() => {
    const handlePopState = () => handleBackToMenu();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (user && (viewMode === 'landing' || viewMode === 'auth')) {
      setViewMode('projects');
    }
  }, [user, viewMode]);

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
    return <LandingPage onGetStarted={handleStartSignup} onSignIn={handleStartLogin} />;
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
          onOpenTools={handleOpenTools}
          entitlement={entitlement}
        />
      );
  }

  // Project detail page
  if (viewMode === 'project-detail') {
      return (
        <ProjectDetailPage
          projectId={selectedProjectId}
          onBack={handleBackFromProject}
          onOpenTools={handleOpenTools}
          entitlement={entitlement}
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
    <>
      <ToolLayout
        title={moduleConfig?.title ?? ''}
        description={moduleConfig?.description ?? ''}
        onBack={handleBackToMenu}
        action={{ label: 'Save to Project', onClick: handleOpenSaveModal }}
      >
        <div ref={toolContentRef}>
          {Component && <Component />}
        </div>
      </ToolLayout>

      {saveModalState && (
        <SaveOutputModal
          toolId={saveModalState.toolId}
          toolName={saveModalState.toolName}
          inputs={saveModalState.inputs}
          result={saveModalState.result}
          onClose={() => setSaveModalState(null)}
          onSuccess={() => setSaveModalState(null)}
        />
      )}

      {showUpgradeModal && (
        <UpgradeModal
          onClose={() => setShowUpgradeModal(false)}
          title="Saving needs premium"
          message="Your free 2-week trial of project folders has ended. Upgrade once and keep saving outputs forever."
        />
      )}
    </>
  );
}
