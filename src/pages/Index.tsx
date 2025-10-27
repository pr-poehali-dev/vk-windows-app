import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type Module = 'main' | 'token' | 'posts' | 'reposts' | 'likes' | 'add' | 'tasks' | 'db';

interface Task {
  id: string;
  type: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  startTime: string;
}

const Index = () => {
  const [currentModule, setCurrentModule] = useState<Module>('token');
  const [token, setToken] = useState('');
  const [tokenSaved, setTokenSaved] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', type: 'Публикация постов', status: 'running', progress: 45, startTime: '14:30' },
    { id: '2', type: 'Репосты', status: 'completed', progress: 100, startTime: '13:15' },
    { id: '3', type: 'Массовый лайкинг', status: 'pending', progress: 0, startTime: '16:00' },
  ]);

  const handleSaveToken = () => {
    if (token.length < 10) {
      toast.error('Некорректный токен');
      return;
    }
    setTokenSaved(true);
    setCurrentModule('main');
    toast.success('Токен успешно сохранен');
  };

  const handleDeleteToken = () => {
    setToken('');
    setTokenSaved(false);
    toast.success('Токен удален');
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'running': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: Task['status']) => {
    switch (status) {
      case 'running': return 'Выполняется';
      case 'completed': return 'Завершена';
      case 'error': return 'Ошибка';
      default: return 'Ожидает';
    }
  };

  if (currentModule === 'token') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Управление токеном VK</CardTitle>
            <CardDescription>Введите токен доступа для начала работы</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="token">Токен доступа</Label>
              <Input
                id="token"
                type="password"
                placeholder="Введите токен ВКонтакте"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="font-mono"
              />
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={handleSaveToken} 
                className="flex-1"
                disabled={!token}
              >
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить
              </Button>
              <Button 
                variant="outline" 
                onClick={handleDeleteToken}
                disabled={!tokenSaved}
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Удалить
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentModule === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">VK Автоматизация</h1>
              <p className="text-gray-600 mt-1">Управление группами и задачами</p>
            </div>
            <Button variant="outline" onClick={() => setCurrentModule('token')}>
              <Icon name="Settings" size={16} className="mr-2" />
              Токен
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentModule('posts')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Icon name="FileText" size={24} className="text-blue-600" />
                </div>
                <CardTitle>Публикация постов</CardTitle>
                <CardDescription>Создание задач для публикации постов в группы</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentModule('reposts')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Icon name="Repeat" size={24} className="text-green-600" />
                </div>
                <CardTitle>Репосты</CardTitle>
                <CardDescription>Автоматические репосты из групп-доноров</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentModule('likes')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                  <Icon name="Heart" size={24} className="text-red-600" />
                </div>
                <CardTitle>Массовый лайкинг</CardTitle>
                <CardDescription>Лайки постов сообществ и пользователей</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentModule('add')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Icon name="PlusCircle" size={24} className="text-purple-600" />
                </div>
                <CardTitle>Добавление данных</CardTitle>
                <CardDescription>Группы, посты и категории</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentModule('tasks')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <Icon name="List" size={24} className="text-orange-600" />
                </div>
                <CardTitle>Поставленные задачи</CardTitle>
                <CardDescription>Мониторинг выполнения задач</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentModule('db')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                  <Icon name="Database" size={24} className="text-gray-600" />
                </div>
                <CardTitle>Работа с БД</CardTitle>
                <CardDescription>Управление данными</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Activity" size={20} />
                Активные задачи
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                        <div>
                          <p className="font-semibold">{task.type}</p>
                          <p className="text-sm text-gray-600">Запуск: {task.startTime}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{getStatusText(task.status)}</Badge>
                    </div>
                    {task.status === 'running' && (
                      <div className="space-y-2">
                        <Progress value={task.progress} className="h-2" />
                        <p className="text-sm text-gray-600">{task.progress}% завершено</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="outline" onClick={() => setCurrentModule('main')}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Модуль в разработке</h1>
            <p className="text-gray-600 mt-1">Этот функционал будет доступен в следующей версии</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
