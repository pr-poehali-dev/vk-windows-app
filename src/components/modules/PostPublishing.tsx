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

interface PostPublishingProps {
  onBack: () => void;
}

interface Group {
  id: string;
  vkId: string;
  name: string;
  category: string;
  selected: boolean;
}

interface Post {
  id: string;
  category: string;
  text: string;
  hasMedia: boolean;
  selected: boolean;
}

const PostPublishing = ({ onBack }: PostPublishingProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [searchGroup, setSearchGroup] = useState('');
  const [searchPost, setSearchPost] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [minPause, setMinPause] = useState('30');
  const [maxPause, setMaxPause] = useState('60');
  const [timeUnit, setTimeUnit] = useState('seconds');
  const [startTime, setStartTime] = useState('immediate');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const [groups, setGroups] = useState<Group[]>([
    { id: '1', vkId: '12345', name: 'Группа 1', category: 'Маркетинг', selected: false },
    { id: '2', vkId: '67890', name: 'Группа 2', category: 'IT', selected: false },
    { id: '3', vkId: '11111', name: 'Группа 3', category: 'Маркетинг', selected: false },
  ]);

  const [posts, setPosts] = useState<Post[]>([
    { id: '1', category: 'Промо', text: 'Отличное предложение для вас!', hasMedia: true, selected: false },
    { id: '2', category: 'Новости', text: 'Важная новость дня', hasMedia: false, selected: false },
    { id: '3', category: 'Промо', text: 'Специальная акция только сегодня', hasMedia: true, selected: false },
  ]);

  const categories = ['all', 'Маркетинг', 'IT', 'Промо', 'Новости'];

  const toggleGroup = (id: string) => {
    setGroups(groups.map(g => g.id === id ? { ...g, selected: !g.selected } : g));
  };

  const togglePost = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, selected: !p.selected } : p));
  };

  const selectAllGroups = () => {
    setGroups(groups.map(g => ({ ...g, selected: true })));
  };

  const deselectAllGroups = () => {
    setGroups(groups.map(g => ({ ...g, selected: false })));
  };

  const selectAllPosts = () => {
    setPosts(posts.map(p => ({ ...p, selected: true })));
  };

  const deselectAllPosts = () => {
    setPosts(posts.map(p => ({ ...p, selected: false })));
  };

  const handleCreateTask = () => {
    const selectedGroups = groups.filter(g => g.selected);
    const selectedPosts = posts.filter(p => p.selected);
    
    if (selectedGroups.length === 0 || selectedPosts.length === 0) {
      toast.error('Выберите группы и посты');
      return;
    }

    toast.success('Задача создана успешно');
    onBack();
  };

  const filteredGroups = groups.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchGroup.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || g.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.text.toLowerCase().includes(searchPost.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
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
            <h1 className="text-3xl font-bold text-gray-900">Публикация постов</h1>
            <p className="text-gray-600 mt-1">Шаг {step} из 3</p>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Выбор групп</CardTitle>
              <CardDescription>Выберите группы для публикации постов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Поиск по названию</Label>
                  <Input
                    placeholder="Введите название группы"
                    value={searchGroup}
                    onChange={(e) => setSearchGroup(e.target.value)}
                  />
                </div>
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
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAllGroups}>
                  Выбрать все
                </Button>
                <Button variant="outline" size="sm" onClick={deselectAllGroups}>
                  Снять все
                </Button>
              </div>

              <div className="border rounded-lg">
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
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!groups.some(g => g.selected)}>
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
              <CardTitle>Выбор постов</CardTitle>
              <CardDescription>Выберите посты для публикации</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Поиск по тексту</Label>
                  <Input
                    placeholder="Введите текст поста"
                    value={searchPost}
                    onChange={(e) => setSearchPost(e.target.value)}
                  />
                </div>
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
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAllPosts}>
                  Выбрать все
                </Button>
                <Button variant="outline" size="sm" onClick={deselectAllPosts}>
                  Снять все
                </Button>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">№</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Текст поста</TableHead>
                      <TableHead className="w-24">Медиа</TableHead>
                      <TableHead className="w-24">Выбрать</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.map((post, index) => (
                      <TableRow key={post.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell className="max-w-md truncate">{post.text}</TableCell>
                        <TableCell>
                          {post.hasMedia && <Icon name="Image" size={16} className="text-blue-600" />}
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={post.selected}
                            onCheckedChange={() => togglePost(post.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Назад
                </Button>
                <Button onClick={() => setStep(3)} disabled={!posts.some(p => p.selected)}>
                  Далее
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
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
                <Button variant="outline" onClick={() => setStep(2)}>
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

export default PostPublishing;
