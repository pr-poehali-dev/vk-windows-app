import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface TasksMonitorProps {
  onBack: () => void;
}

interface Task {
  id: string;
  type: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  startTime: string;
  progress: number;
}

interface LogEntry {
  time: string;
  status: 'success' | 'pause' | 'error';
  message: string;
}

const TasksMonitor = ({ onBack }: TasksMonitorProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', type: 'Публикация постов', status: 'running', startTime: '14:30', progress: 65 },
    { id: '2', type: 'Репосты', status: 'completed', startTime: '13:15', progress: 100 },
    { id: '3', type: 'Массовый лайкинг', status: 'pending', startTime: '16:00', progress: 0 },
    { id: '4', type: 'Публикация постов', status: 'error', startTime: '12:00', progress: 45 },
  ]);

  const logs: LogEntry[] = [
    { time: '14:30:15', status: 'success', message: 'Опубликован пост в группу "Группа 1"' },
    { time: '14:31:20', status: 'pause', message: 'Пауза 45 секунд' },
    { time: '14:32:05', status: 'success', message: 'Опубликован пост в группу "Группа 2"' },
    { time: '14:33:10', status: 'pause', message: 'Пауза 52 секунды' },
    { time: '14:34:02', status: 'error', message: 'Ошибка: токен недействителен' },
  ];

  const getStatusBadge = (status: Task['status']) => {
    const variants: Record<Task['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline', label: string }> = {
      pending: { variant: 'secondary', label: 'Ожидает' },
      running: { variant: 'default', label: 'Выполняется' },
      completed: { variant: 'outline', label: 'Завершена' },
      error: { variant: 'destructive', label: 'Ошибка' }
    };
    return variants[status];
  };

  const getLogIcon = (status: LogEntry['status']) => {
    switch (status) {
      case 'success':
        return <Icon name="CheckCircle" size={16} className="text-green-600" />;
      case 'pause':
        return <Icon name="Clock" size={16} className="text-orange-600" />;
      case 'error':
        return <Icon name="XCircle" size={16} className="text-red-600" />;
    }
  };

  const handleStartTask = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: 'running' as const } : t
    ));
    toast.success('Задача запущена');
  };

  const handleStopTask = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: 'pending' as const } : t
    ));
    toast.success('Задача остановлена');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    toast.success('Задача удалена');
  };

  const handleShowDetails = (task: Task) => {
    setSelectedTask(task);
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Поставленные задачи</h1>
            <p className="text-gray-600 mt-1">Управление и мониторинг задач</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="List" size={20} />
              Список задач
            </CardTitle>
            <CardDescription>Просмотр и управление всеми задачами</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Тип задачи</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Время запуска</TableHead>
                    <TableHead>Прогресс</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => {
                    const statusInfo = getStatusBadge(task.status);
                    return (
                      <TableRow key={task.id}>
                        <TableCell className="font-mono">#{task.id}</TableCell>
                        <TableCell className="font-medium">{task.type}</TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                        </TableCell>
                        <TableCell>{task.startTime}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={task.progress} className="w-24 h-2" />
                            <span className="text-sm text-gray-600">{task.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            {task.status === 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStartTask(task.id)}
                              >
                                <Icon name="Play" size={14} className="mr-1" />
                                Запустить
                              </Button>
                            )}
                            {task.status === 'running' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStopTask(task.id)}
                              >
                                <Icon name="Pause" size={14} className="mr-1" />
                                Остановить
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleShowDetails(task)}
                            >
                              <Icon name="Info" size={14} className="mr-1" />
                              Детали
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Детали задачи #{selectedTask?.id}</DialogTitle>
              <DialogDescription>{selectedTask?.type}</DialogDescription>
            </DialogHeader>
            
            {selectedTask && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Статус выполнения</span>
                    <Badge variant={getStatusBadge(selectedTask.status).variant}>
                      {getStatusBadge(selectedTask.status).label}
                    </Badge>
                  </div>
                  <Progress value={selectedTask.progress} className="h-3" />
                  <p className="text-sm text-gray-600">
                    {selectedTask.progress}% завершено
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Лог выполнения</h4>
                  <ScrollArea className="h-64 border rounded-lg p-4">
                    <div className="space-y-3">
                      {logs.map((log, index) => (
                        <div key={index} className="flex items-start gap-3">
                          {getLogIcon(log.status)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-mono text-gray-500">{log.time}</span>
                            </div>
                            <p className="text-sm">{log.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="flex justify-end gap-2">
                  {selectedTask.status === 'running' && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleStopTask(selectedTask.id);
                        setShowDetails(false);
                      }}
                    >
                      <Icon name="Pause" size={16} className="mr-2" />
                      Остановить
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setShowDetails(false)}>
                    Закрыть
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TasksMonitor;
