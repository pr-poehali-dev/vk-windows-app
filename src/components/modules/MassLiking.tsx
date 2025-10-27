import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface MassLikingProps {
  onBack: () => void;
}

interface Group {
  id: string;
  vkId: string;
  name: string;
  category: string;
  selected: boolean;
}

interface User {
  id: string;
  vkId: string;
  firstName: string;
  lastName: string;
  selected: boolean;
}

const MassLiking = ({ onBack }: MassLikingProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [objectType, setObjectType] = useState<'groups' | 'users'>('groups');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [minPause, setMinPause] = useState('10');
  const [maxPause, setMaxPause] = useState('30');
  const [timeUnit, setTimeUnit] = useState('seconds');
  const [startTime, setStartTime] = useState('immediate');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const [groups, setGroups] = useState<Group[]>([
    { id: '1', vkId: '12345', name: 'Группа 1', category: 'Маркетинг', selected: false },
    { id: '2', vkId: '67890', name: 'Группа 2', category: 'IT', selected: false },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: '1', vkId: '111111', firstName: 'Иван', lastName: 'Иванов', selected: false },
    { id: '2', vkId: '222222', firstName: 'Петр', lastName: 'Петров', selected: false },
  ]);

  const categories = ['all', 'Маркетинг', 'IT'];

  const toggleGroup = (id: string) => {
    setGroups(groups.map(g => g.id === id ? { ...g, selected: !g.selected } : g));
  };

  const toggleUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, selected: !u.selected } : u));
  };

  const selectAll = () => {
    if (objectType === 'groups') {
      setGroups(groups.map(g => ({ ...g, selected: true })));
    } else {
      setUsers(users.map(u => ({ ...u, selected: true })));
    }
  };

  const deselectAll = () => {
    if (objectType === 'groups') {
      setGroups(groups.map(g => ({ ...g, selected: false })));
    } else {
      setUsers(users.map(u => ({ ...u, selected: false })));
    }
  };

  const handleCreateTask = () => {
    const hasSelection = objectType === 'groups' 
      ? groups.some(g => g.selected)
      : users.some(u => u.selected);
    
    if (!hasSelection) {
      toast.error('Выберите объекты для лайкинга');
      return;
    }

    toast.success('Задача лайкинга создана');
    onBack();
  };

  const filteredGroups = groups.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || g.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredUsers = users.filter(u => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Назад
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Массовый лайкинг</h1>
            <p className="text-gray-600 mt-1">Шаг {step} из 2</p>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Выбор объектов для лайкинга</CardTitle>
              <CardDescription>Выберите группы или пользователей</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Тип объектов</Label>
                <RadioGroup value={objectType} onValueChange={(v) => setObjectType(v as 'groups' | 'users')}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="groups" id="groups" />
                    <Label htmlFor="groups" className="font-normal cursor-pointer">Посты сообщества</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="users" id="users" />
                    <Label htmlFor="users" className="font-normal cursor-pointer">Посты пользователей</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Поиск</Label>
                  <Input
                    placeholder={objectType === 'groups' ? 'Введите название группы' : 'Введите имя пользователя'}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                {objectType === 'groups' && (
                  <div className="w-64">
                    <Label>Категория</Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>
                            {cat === 'all' ? 'Все категории' : cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAll}>
                  Выбрать все
                </Button>
                <Button variant="outline" size="sm" onClick={deselectAll}>
                  Снять все
                </Button>
              </div>

              <div className="border rounded-lg">
                {objectType === 'groups' ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">№</TableHead>
                        <TableHead>ID группы</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead className="w-24">Выбрать</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGroups.map((group, index) => (
                        <TableRow key={group.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="font-mono">{group.vkId}</TableCell>
                          <TableCell>{group.name}</TableCell>
                          <TableCell>{group.category}</TableCell>
                          <TableCell>
                            <Checkbox
                              checked={group.selected}
                              onCheckedChange={() => toggleGroup(group.id)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">№</TableHead>
                        <TableHead>ID пользователя</TableHead>
                        <TableHead>Имя</TableHead>
                        <TableHead>Фамилия</TableHead>
                        <TableHead className="w-24">Выбрать</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user, index) => (
                        <TableRow key={user.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="font-mono">{user.vkId}</TableCell>
                          <TableCell>{user.firstName}</TableCell>
                          <TableCell>{user.lastName}</TableCell>
                          <TableCell>
                            <Checkbox
                              checked={user.selected}
                              onCheckedChange={() => toggleUser(user.id)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)} 
                  disabled={objectType === 'groups' ? !groups.some(g => g.selected) : !users.some(u => u.selected)}
                >
                  Далее
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Настройка параметров</CardTitle>
              <CardDescription>Настройте параметры выполнения задачи</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minPause">Минимальная пауза</Label>
                  <Input
                    id="minPause"
                    type="number"
                    value={minPause}
                    onChange={(e) => setMinPause(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPause">Максимальная пауза</Label>
                  <Input
                    id="maxPause"
                    type="number"
                    value={maxPause}
                    onChange={(e) => setMaxPause(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Единицы измерения</Label>
                <Select value={timeUnit} onValueChange={setTimeUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seconds">Секунды</SelectItem>
                    <SelectItem value="minutes">Минуты</SelectItem>
                    <SelectItem value="hours">Часы</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Время запуска</Label>
                <RadioGroup value={startTime} onValueChange={setStartTime}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="immediate" id="immediate" />
                    <Label htmlFor="immediate" className="font-normal cursor-pointer">Сразу</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scheduled" id="scheduled" />
                    <Label htmlFor="scheduled" className="font-normal cursor-pointer">Запланированно</Label>
                  </div>
                </RadioGroup>

                {startTime === 'scheduled' && (
                  <div className="grid grid-cols-2 gap-4 ml-6">
                    <div className="space-y-2">
                      <Label htmlFor="date">Дата</Label>
                      <Input
                        id="date"
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Время</Label>
                      <Input
                        id="time"
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Назад
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onBack}>
                    Отмена
                  </Button>
                  <Button onClick={handleCreateTask}>
                    <Icon name="Check" size={16} className="mr-2" />
                    Создать задачу
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MassLiking;
