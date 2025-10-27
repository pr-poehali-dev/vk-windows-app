import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MainMenuProps {
  onNavigate: (module: 'posts' | 'reposts' | 'likes' | 'add' | 'tasks' | 'db' | 'token') => void;
}

const MainMenu = ({ onNavigate }: MainMenuProps) => {
  const menuItems = [
    {
      id: 'posts' as const,
      title: 'Публикация постов',
      description: 'Создание задач для публикации постов в группы',
      icon: 'FileText',
      color: 'blue'
    },
    {
      id: 'reposts' as const,
      title: 'Репосты',
      description: 'Автоматические репосты из групп-доноров',
      icon: 'Repeat',
      color: 'green'
    },
    {
      id: 'likes' as const,
      title: 'Массовый лайкинг',
      description: 'Лайки постов сообществ и пользователей',
      icon: 'Heart',
      color: 'red'
    },
    {
      id: 'add' as const,
      title: 'Добавление данных',
      description: 'Группы, посты и категории',
      icon: 'PlusCircle',
      color: 'purple'
    },
    {
      id: 'tasks' as const,
      title: 'Поставленные задачи',
      description: 'Мониторинг выполнения задач',
      icon: 'List',
      color: 'orange'
    },
    {
      id: 'db' as const,
      title: 'Работа с БД',
      description: 'Управление данными',
      icon: 'Database',
      color: 'gray'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      red: 'bg-red-100 text-red-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      gray: 'bg-gray-100 text-gray-600'
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">VK Автоматизация</h1>
            <p className="text-gray-600 mt-1">Управление группами и задачами</p>
          </div>
          <Button variant="outline" onClick={() => onNavigate('token')}>
            <Icon name="Settings" size={16} className="mr-2" />
            Управление токеном
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card 
              key={item.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onNavigate(item.id)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(item.color)}`}>
                  <Icon name={item.icon as any} size={24} />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
