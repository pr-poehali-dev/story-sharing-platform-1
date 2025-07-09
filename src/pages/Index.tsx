import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isWriting, setIsWriting] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [storyContent, setStoryContent] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [lastSaved, setLastSaved] = useState(new Date());
  const [wordCount, setWordCount] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapters, setChapters] = useState([
    { id: 1, title: "Глава 1", content: "", author: "Вы" },
  ]);
  const [isCollaborative, setIsCollaborative] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  // Автосохранение
  useEffect(() => {
    const interval = setInterval(() => {
      if (storyContent.trim()) {
        setLastSaved(new Date());
      }
    }, 30000); // Автосохранение каждые 30 секунд

    return () => clearInterval(interval);
  }, [storyContent]);

  // Подсчет слов
  useEffect(() => {
    const words = storyContent
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  }, [storyContent]);

  const startWriting = (story = null) => {
    setCurrentStory(story);
    setIsWriting(true);
    setActiveTab("writing");
    if (story) {
      setStoryContent(story.content || "");
      setIsCollaborative(story.collaborative || false);
    }
  };

  const addCollaborator = () => {
    // Заглушка для добавления соавтора
    const newCollaborator = {
      id: Date.now(),
      name: "Новый соавтор",
      avatar: "",
      online: true,
      lastSeen: new Date(),
    };
    setCollaborators([...collaborators, newCollaborator]);
  };

  const addComment = (text, selection = null) => {
    const newComment = {
      id: Date.now(),
      text,
      author: "Вы",
      timestamp: new Date(),
      selection,
      replies: [],
    };
    setComments([...comments, newComment]);
  };

  const addChapter = () => {
    const newChapter = {
      id: Date.now(),
      title: `Глава ${chapters.length + 1}`,
      content: "",
      author: "Вы",
    };
    setChapters([...chapters, newChapter]);
    setCurrentChapter(newChapter.id);
  };

  const popularStories = [
    {
      id: 1,
      title: "Мистический лес",
      description:
        "Захватывающее приключение в волшебном лесу, где каждый шаг может стать последним...",
      authors: ["Анна К.", "Михаил Р."],
      genre: "Фэнтези",
      collaborators: 3,
      views: 1250,
      status: "В процессе",
    },
    {
      id: 2,
      title: 'Космическая станция "Надежда"',
      description:
        "Научно-фантастическая история о выживании в далеком космосе...",
      authors: ["Елена П.", "Дмитрий С.", "Мария Т."],
      genre: "Научная фантастика",
      collaborators: 5,
      views: 2100,
      status: "Завершена",
    },
    {
      id: 3,
      title: "Тайна старого особняка",
      description:
        "Детективная история с элементами мистики и неожиданными поворотами...",
      authors: ["Олег В."],
      genre: "Детектив",
      collaborators: 2,
      views: 890,
      status: "В процессе",
    },
  ];

  const myStories = [
    {
      id: 1,
      title: "Путешествие во времени",
      description: "Моя первая совместная история...",
      role: "Автор",
      lastEdit: "2 часа назад",
      status: "В процессе",
    },
    {
      id: 2,
      title: "Городские легенды",
      description: "Коллаборация с тремя соавторами...",
      role: "Соавтор",
      lastEdit: "1 день назад",
      status: "На рецензии",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dark font-inter">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon
                  name="BookOpen"
                  size={20}
                  className="text-primary-foreground"
                />
              </div>
              <h1 className="text-2xl font-bold text-foreground">StoryWeave</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button
                variant="ghost"
                onClick={() => setActiveTab("home")}
                className={activeTab === "home" ? "text-primary" : ""}
              >
                Главная
              </Button>
              <Button
                variant="ghost"
                onClick={() => setActiveTab("create")}
                className={activeTab === "create" ? "text-primary" : ""}
              >
                Создать историю
              </Button>
              <Button
                variant="ghost"
                onClick={() => setActiveTab("my-stories")}
                className={activeTab === "my-stories" ? "text-primary" : ""}
              >
                Мои истории
              </Button>
              <Button
                variant="ghost"
                onClick={() => setActiveTab("popular")}
                className={activeTab === "popular" ? "text-primary" : ""}
              >
                Популярные
              </Button>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Search" size={16} className="mr-2" />
                Поиск
              </Button>
              <Avatar>
                <AvatarFallback>ЮК</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "home" && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative mb-12 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 z-10" />
              <img
                src="/img/407b5173-1a84-4c24-86b8-8569ee3799d6.jpg"
                alt="Collaborative Writing"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
                <div className="max-w-2xl px-4">
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-inter">
                    Создавайте истории вместе
                  </h2>
                  <p className="text-xl text-white/90 mb-8 font-source">
                    Платформа для совместного написания, где каждый может стать
                    соавтором удивительных историй
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                    onClick={() => startWriting()}
                  >
                    <Icon name="PenTool" size={20} className="mr-2" />
                    Начать писать
                  </Button>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Возможности платформы
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center animate-scale-in">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Users" size={24} className="text-primary" />
                    </div>
                    <CardTitle>Совместное творчество</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Приглашайте друзей и незнакомцев для создания уникальных
                      историй в режиме реального времени
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="text-center animate-scale-in">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon
                        name="GitBranch"
                        size={24}
                        className="text-primary"
                      />
                    </div>
                    <CardTitle>Версии и ветки</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Экспериментируйте с разными сюжетными линиями и выбирайте
                      лучшие варианты развития
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="text-center animate-scale-in">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon
                        name="MessageCircle"
                        size={24}
                        className="text-primary"
                      />
                    </div>
                    <CardTitle>Обсуждения</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Общайтесь с соавторами, делитесь идеями и получайте
                      обратную связь от сообщества
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Popular Stories Preview */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Популярные истории</h3>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("popular")}
                >
                  Смотреть все
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularStories.slice(0, 3).map((story) => (
                  <Card
                    key={story.id}
                    className="hover:shadow-lg transition-shadow animate-scale-in"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {story.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="secondary">{story.genre}</Badge>
                            <Badge
                              variant={
                                story.status === "Завершена"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {story.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {story.description}
                      </CardDescription>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Icon name="Users" size={14} />
                          <span>{story.collaborators} соавторов</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Eye" size={14} />
                          <span>{story.views}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "create" && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Создать новую историю
                </CardTitle>
                <CardDescription>
                  Начните писать удивительную историю или пригласите соавторов
                  для совместного творчества
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Название истории
                  </label>
                  <Input placeholder="Введите название вашей истории..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Краткое описание
                  </label>
                  <Textarea
                    placeholder="Опишите, о чем будет ваша история..."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Жанр</label>
                  <Input placeholder="Фэнтези, Научная фантастика, Детектив..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Режим написания
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                      <div className="flex items-center space-x-3">
                        <Icon name="User" size={20} className="text-primary" />
                        <div>
                          <h4 className="font-medium">Индивидуальное</h4>
                          <p className="text-sm text-muted-foreground">
                            Пишите самостоятельно
                          </p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4 cursor-pointer hover:ring-2 hover:ring-primary transition-all bg-primary/5">
                      <div className="flex items-center space-x-3">
                        <Icon name="Users" size={20} className="text-primary" />
                        <div>
                          <h4 className="font-medium">Совместное</h4>
                          <p className="text-sm text-muted-foreground">
                            Пригласите соавторов
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button
                    className="flex-1"
                    onClick={() =>
                      startWriting({
                        title: "Новая история",
                        content: "",
                        collaborative: isCollaborative,
                      })
                    }
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать историю
                  </Button>
                  <Button variant="outline">
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить черновик
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "my-stories" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Мои истории</h2>
              <Button onClick={() => setActiveTab("create")}>
                <Icon name="Plus" size={16} className="mr-2" />
                Новая история
              </Button>
            </div>
            <div className="space-y-4">
              {myStories.map((story) => (
                <Card key={story.id} className="animate-scale-in">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {story.title}
                          </h3>
                          <Badge variant="outline">{story.role}</Badge>
                          <Badge
                            variant={
                              story.status === "В процессе"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {story.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">
                          {story.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Последнее изменение: {story.lastEdit}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startWriting(story)}
                        >
                          <Icon name="Edit" size={16} className="mr-1" />
                          Редактировать
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Share" size={16} className="mr-1" />
                          Поделиться
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "popular" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Популярные истории</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Фильтры
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="SortDesc" size={16} className="mr-2" />
                  Сортировка
                </Button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {popularStories.map((story) => (
                <Card
                  key={story.id}
                  className="hover:shadow-lg transition-shadow animate-scale-in"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{story.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="secondary">{story.genre}</Badge>
                          <Badge
                            variant={
                              story.status === "Завершена"
                                ? "default"
                                : "outline"
                            }
                          >
                            {story.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {story.description}
                    </CardDescription>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Icon name="Users" size={14} />
                          <span>{story.collaborators}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Eye" size={14} />
                          <span>{story.views}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => startWriting(story)}
                      >
                        <Icon name="BookOpen" size={14} className="mr-2" />
                        Читать
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="UserPlus" size={14} className="mr-2" />
                        Присоединиться
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "writing" && (
          <div className="animate-fade-in">
            <div className="flex h-[calc(100vh-200px)]">
              {/* Sidebar */}
              <div className="w-80 border-r border-border bg-card/50 p-4 overflow-y-auto">
                <div className="space-y-6">
                  {/* Story Info */}
                  <div>
                    <h3 className="font-semibold mb-2">Информация о истории</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Слов:</span>
                        <span>{wordCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Глав:</span>
                        <span>{chapters.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Последнее сохранение:
                        </span>
                        <span>{lastSaved.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Chapters */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Главы</h3>
                      <Button variant="ghost" size="sm" onClick={addChapter}>
                        <Icon name="Plus" size={14} />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {chapters.map((chapter) => (
                        <div
                          key={chapter.id}
                          className={`p-2 rounded cursor-pointer transition-colors ${
                            currentChapter === chapter.id
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-accent"
                          }`}
                          onClick={() => setCurrentChapter(chapter.id)}
                        >
                          <div className="text-sm font-medium">
                            {chapter.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {
                              chapter.content
                                .split(" ")
                                .filter((w) => w.length > 0).length
                            }{" "}
                            слов
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {isCollaborative && (
                    <>
                      <Separator />

                      {/* Collaborators */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Соавторы</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={addCollaborator}
                          >
                            <Icon name="UserPlus" size={14} />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {collaborators.map((collaborator) => (
                            <div
                              key={collaborator.id}
                              className="flex items-center space-x-2"
                            >
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {collaborator.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 text-sm">
                                <div className="font-medium">
                                  {collaborator.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {collaborator.online ? "Онлайн" : "Оффлайн"}
                                </div>
                              </div>
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  collaborator.online
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                }`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Main Editor */}
              <div className="flex-1 flex flex-col">
                {/* Toolbar */}
                <div className="border-b border-border p-4 bg-card/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsWriting(false)}
                      >
                        <Icon name="ArrowLeft" size={16} className="mr-2" />
                        Назад
                      </Button>
                      <Separator orientation="vertical" className="h-6" />
                      <Button variant="ghost" size="sm">
                        <Icon name="Save" size={16} className="mr-2" />
                        Сохранить
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Download" size={16} className="mr-2" />
                        Экспорт
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Icon
                              name="MessageCircle"
                              size={16}
                              className="mr-2"
                            />
                            Комментарии ({comments.length})
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Комментарии</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="h-96">
                            <div className="space-y-4">
                              {comments.map((comment) => (
                                <div
                                  key={comment.id}
                                  className="border rounded p-3"
                                >
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback className="text-xs">
                                        {comment.author.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">
                                      {comment.author}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {comment.timestamp.toLocaleTimeString()}
                                    </span>
                                  </div>
                                  <p className="text-sm">{comment.text}</p>
                                </div>
                              ))}
                              {comments.length === 0 && (
                                <div className="text-center text-muted-foreground py-8">
                                  Комментариев пока нет
                                </div>
                              )}
                            </div>
                          </ScrollArea>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Добавить комментарий..."
                              className="flex-1"
                            />
                            <Button
                              size="sm"
                              onClick={() => addComment("Новый комментарий")}
                            >
                              <Icon name="Send" size={14} />
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm">
                        <Icon name="Share" size={16} className="mr-2" />
                        Поделиться
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Editor */}
                <div className="flex-1 p-6 bg-background">
                  <div className="max-w-4xl mx-auto">
                    <div className="mb-4">
                      <Input
                        placeholder="Название главы..."
                        className="text-xl font-bold border-none bg-transparent p-0 focus-visible:ring-0"
                        value={
                          chapters.find((c) => c.id === currentChapter)
                            ?.title || ""
                        }
                        onChange={(e) => {
                          const updatedChapters = chapters.map((c) =>
                            c.id === currentChapter
                              ? { ...c, title: e.target.value }
                              : c,
                          );
                          setChapters(updatedChapters);
                        }}
                      />
                    </div>
                    <Textarea
                      placeholder="Начните писать свою историю..."
                      className="min-h-[500px] border-none bg-transparent p-0 resize-none focus-visible:ring-0 text-lg leading-relaxed font-source"
                      value={storyContent}
                      onChange={(e) => setStoryContent(e.target.value)}
                    />
                  </div>
                </div>

                {/* Status Bar */}
                <div className="border-t border-border p-2 bg-card/50">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>Слов: {wordCount}</span>
                      <span>Символов: {storyContent.length}</span>
                      <span>
                        Глава{" "}
                        {chapters.findIndex((c) => c.id === currentChapter) + 1}{" "}
                        из {chapters.length}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      {isCollaborative && (
                        <div className="flex items-center space-x-2">
                          <Icon name="Users" size={14} />
                          <span>{collaborators.length + 1} участников</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={14} />
                        <span>Сохранено: {lastSaved.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
