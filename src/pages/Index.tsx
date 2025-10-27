import { useState } from 'react';
import TokenManagement from '@/components/modules/TokenManagement';
import MainMenu from '@/components/modules/MainMenu';
import PostPublishing from '@/components/modules/PostPublishing';
import Reposts from '@/components/modules/Reposts';
import MassLiking from '@/components/modules/MassLiking';
import DataManagement from '@/components/modules/DataManagement';
import TasksMonitor from '@/components/modules/TasksMonitor';
import DatabaseManagement from '@/components/modules/DatabaseManagement';

type Module = 'token' | 'main' | 'posts' | 'reposts' | 'likes' | 'add' | 'tasks' | 'db';

const Index = () => {
  const [currentModule, setCurrentModule] = useState<Module>('token');
  const [tokenSaved, setTokenSaved] = useState(false);

  const handleTokenSaved = () => {
    setTokenSaved(true);
    setCurrentModule('main');
  };

  const handleTokenDeleted = () => {
    setTokenSaved(false);
    setCurrentModule('token');
  };

  const navigateToModule = (module: Module) => {
    setCurrentModule(module);
  };

  const returnToMain = () => {
    setCurrentModule('main');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {currentModule === 'token' && (
        <TokenManagement 
          onTokenSaved={handleTokenSaved} 
          onTokenDeleted={handleTokenDeleted}
          tokenSaved={tokenSaved}
        />
      )}
      
      {currentModule === 'main' && (
        <MainMenu 
          onNavigate={navigateToModule}
        />
      )}
      
      {currentModule === 'posts' && (
        <PostPublishing onBack={returnToMain} />
      )}
      
      {currentModule === 'reposts' && (
        <Reposts onBack={returnToMain} />
      )}
      
      {currentModule === 'likes' && (
        <MassLiking onBack={returnToMain} />
      )}
      
      {currentModule === 'add' && (
        <DataManagement onBack={returnToMain} />
      )}
      
      {currentModule === 'tasks' && (
        <TasksMonitor onBack={returnToMain} />
      )}
      
      {currentModule === 'db' && (
        <DatabaseManagement onBack={returnToMain} />
      )}
    </div>
  );
};

export default Index;