#### 1.1 Git的一些常用命令

~~~
1、远程仓库相关命令
如果想把本地的某个分支test提交到远程仓库，并作为远程仓库的master分支，或者作为另外一个名叫test的分支，如下
$ git push origin test:master// 提交本地test分支作为远程的master分支
$ git push origin test:test// 提交本地test分支作为远程的test分支

2、分支(branch)操作相关命令
查看本地分支：$ git branch
查看远程分支：$ git branch -r
创建本地分支：$ git branch [name]----注意新分支创建后不会自动切换为当前分支
切换分支：$ git checkout [name]
创建新分支并立即切换到新分支：$ git checkout -b [name]
删除分支：$ git branch -d [name] ---- -d选项只能删除已经参与了合并的分支，对于未有合并的分支是无法删除的。如果想强制删除一个分支，可以使用-D选项
合并分支：$ git merge [name]----将名称为[name]的分支与当前分支合并
创建远程分支(本地分支push到远程)：$ git push origin [name]
删除远程分支：$ git push origin :[name]
创建空的分支：(执行命令之前记得先提交你当前分支的修改，否则会被强制删干净没得后悔)
$ git symbolic-ref HEAD refs/heads/[name]
$ rm .git/index
$ git clean -fdx

3、版本(tag)操作相关命令
查看版本：$ git tag
创建版本：$ git tag [name]
删除版本：$ git tag -d [name]
查看远程版本：$ git tag -r
创建远程版本(本地版本push到远程)：$ git push origin [name]
删除远程版本：$ git push origin :refs/tags/[name]
合并远程仓库的tag到本地：$ git pull origin --tags
上传本地tag到远程仓库：$ git push origin --tags
创建带注释的tag：$ git tag -a [name] -m 'yourMessage'

4、子模块(submodule)相关操作命令
添加子模块：$ git submodule add [url] [path]
如：$ git submodule add [git://github.com/soberh/ui-libs.git]([https://link.jianshu.com?t=git://github.com/soberh/ui-libs.git](https://link.jianshu.com/?t=git://github.com/soberh/ui-libs.git)) src/main/webapp/ui-libs
初始化子模块：$ git submodule init ----只在首次检出仓库时运行一次就行
更新子模块：$ git submodule update----每次更新或切换分支后都需要运行一下
删除子模块：（分4步走哦）
1. $ git rm --cached [path]
2. 编辑“.gitmodules”文件，将子模块的相关配置节点删除掉
3. 编辑“ .git/config”文件，将子模块的相关配置节点删除掉
4. 手动删除子模块残留的目录

5、忽略一些文件、文件夹不提交
在仓库根目录下创建名称为“.gitignore”的文件，写入不需要的文件夹名或文件，每个元素占一行即可，如bin，*.db

附： Git 常用命令速查
git branch查看本地所有分支
git status查看当前状态
git commit提交
git branch -a查看所有的分支
git branch -r查看远程所有分支
git commit -am "init"提交并且加注释
git remote add origin git@192.168.1.119:ndshow
git push origin master将文件给推到服务器上
git remote show origin显示远程库origin里的资源
git push origin master:develop
git push origin master:hb-dev将本地库与服务器上的库进行关联
git checkout --track origin/dev切换到远程dev分支
git branch -D master develop删除本地库develop
git checkout -b dev建立一个新的本地分支dev
git merge origin/dev将分支dev与当前分支进行合并
git checkout dev切换到本地dev分支
git remote show查看远程库
git add .
git rm文件名(包括路径) 从git中删除指定文件
git clone [git://github.com/schacon/grit.git]([https://link.jianshu.com?t=git://github.com/schacon/grit.git](https://link.jianshu.com/?t=git://github.com/schacon/grit.git))从服务器上将代码给拉下来
git config --list看所有用户
git ls-files看已经被提交的
git rm [file name]删除一个文件
git commit -a提交当前repos的所有的改变
git add [file name]添加一个文件到git index
git commit -v当你用－v参数的时候可以看commit的差异
git commit -m "This is the message describing the commit"添加commit信息
git commit -a -a是代表add，把所有的change加到git index里然后再commit
git commit -a -v一般提交命令
git log看你commit的日志
git diff查看尚未暂存的更新
git rm a.a移除文件(从暂存区和工作区中删除)
git rm --cached a.a移除文件(只从暂存区中删除)
git commit -m "remove"移除文件(从Git中删除)
git rm -f a.a强行移除修改后文件(从暂存区和工作区中删除)
git diff --cached 或 $ git diff --staged查看尚未提交的更新
git stash push将文件给push到一个临时空间中
git stash pop将文件从临时空间pop下来
git remote add origin [git@github.com]([https://link.jianshu.com?t=mailto:git](https://link.jianshu.com/?t=mailto:git)@github.com):username/Hello-World.git
git push origin master将本地项目给提交到服务器中
git pull本地与服务器端同步
git push(远程仓库名) (分支名) 将本地分支推送到服务器上去。
git push origin server fix:awesome branch
git fetch相当于是从远程获取最新版本到本地，不会自动merge
git commit -a -m "log_message"(-a是提交所有改动，-m是加入log信息) 本地修改同步至服务器端 ：
git branch branch_0.1 master从主分支master创建branch_0.1分支
git branch -m branch_0.1 branch_1.0将branch_0.1重命名为branch_1.0
git checkout branch_1.0/master切换到branch_1.0/master分支
du -hs
git branch 删除远程branch
git push origin:branch_remote_name
git branch -r -d branch_remote_name
初始化版本库，并提交到远程服务器端
mkdir WebApp
cd WebApp
git init本地初始化
touch README
git add README添加文件
git commit -m 'first commit'
git remote add origin [git@github.com]([https://link.jianshu.com?t=mailto:git](https://link.jianshu.com/?t=mailto:git)@github.com):daixu/WebApp.git增加一个远程服务器端
~~~

#### 1.2 多人开发如何维护代码、版本管理

~~~
Git
Git 是 Linux 发明者 Linus 开发的一款分布式版本控制系统，是目前最为流行和软件开发着必须掌握的工具。

Git 基础
Git 是一个分布式版本控制系统，保存的是文件的完整快照，而不是差异变换或者文件补丁。保存每一次变化的完整内容。
Git 每一次提交都是对项目文件的一个完整拷贝，因此你可以完全恢复到以前的任何一个提交。Git 每个版本只会完整拷贝发生变化的文件，对于没有变化的文件，Git 只会保存一个指向上一个版本的文件的指针，即对一个特定版本的文件，Git 只会保存一个副本，但可以有多个指向该文件的指针。

Git 基本命令
如上图，使用 Git 的基本工作流程就是：
1. 从远程仓库将项目clone到本地；
2. 在本地工作区进行开发：增加、删除或者修改文件；
3. 将更改的文件add到暂存区域；
4. 将暂存区的更新commit到本地仓库；
5. 将本地仓库push到服务器。

Git 工程在本地有三个工作区域：
- 工作区：进行日常开发的区域。
- 暂存区域：运行 git add 命令后文件保存的区域，也是进行 commit 的区域。
- 本地仓库：本地版本库，记录工程的提交历史，意味着数据永远不会丢失。

对应的，文件有四种状态：
- 未跟踪的（untracked）：表示在工作区新建了某个文件，还没有add。
- 已修改（modofied）：表示在工作区中修改了某个文件，还没有 add。
- 已暂存（staged）：表示把已修改的文件已add到暂存区域。
- 已提交（commit）：表示文件已经commit到本地仓库保存起来了。

Git 分支
几乎所有的版本控制系统都以分支的方式进行操作，分支是独立于项目主线的一条支线，我们可以在不影响主线代码的情况下，在分支下进行工作。
Git 初始化仓库时，默认创建的分支名是master，Git有一个分支指针（HEAD），始终指向当前分支。

Git 分支相关的命令如下：
git branch ［branch-name］ //创建分支
git branch [branch-name] //[commit－head] 创建基于head提交的分支
git branch  //列出分支
git branch -r //列出远程分支
git branch -a //列出所有分支
git checkout -b [branch-name] //新建一个本地分支，并切换到该分支
git checkout -b [branch-name] origin/[branch-name] //新建一个基于远程分支的本地分支，并切换到该分支
git checkout [branch-name] //切换分支
git branch -d [branch-name] //删除分支
git branch -dr [remote/branch-name] //删除远程分支
git fetch origin //下载远程仓库代码的变动
~~~

**Git工作流**

![img](https://uploadfiles.nowcoder.com/images/20220301/4107856_1646129175095/91D966CEFC680A5BE05159F1FE93303E)

~~~
如上图，首先，项目存在两个长期分支：
- 主分支（maste）r：专门用于部署以及负责线上代码回滚的分支，是最为稳定的一个分支，master的代码等于或者落后于develop的代码。
- 开发分支（develop）：专门存放经过测试之后，保证代码无bug的代码分支。开发的时候主要依托于develop分支开发，基于develop分支新建分支，经过严格测试之后，才能合并到develop中，保证develop代码的稳定性（也就是日常开发中不要轻易修改develop分支代码）。

开发过程中会从develop分支中衍生出临时开发分支：
- 项目开发分支或功能分支（feature）：此分支特点是周期长、需要团队协作、代码量大。工作方式是需要创建本地以及远程feature分支，代码基于develop分支代码，经过开发、测试之后，最终合并到develop分支上。当项目上线之后，分支会保留一段时间，直至最终删除。
- 紧急bug、其他问题修复分支（hotfix）：此分支特点是修改时间短、优先级高、代码量稍小、改完之后急需测试、上线。此分支代码也是基于develop。此分支会是团队协作或者单人、团队协作工作方式会类似feature分支，单人只需构建本地分支即可满足开发要求，当修复上线一段时间后，即可删除。
- 预发布分支（release）：此分支是项目开发完成，经过测试没有问题之后，从develop分支分出用于项目的预发布，预发布一段时间没有问题之后合并到master分支进行正式发布。
~~~

#### 1.3 git冲突解决，版本回退

~~~
1. 版本回退
   1.1当已经提交修改，但是想回到修改前的样子时，可使用版本回退
   $ git reset ~head HEAD^HEAD is now at 1bc0043 Merge branch 'master' of put-me-down
   1.2 找到想要的那个版本的版本号后进行回退
   $ git reset ~head f8dce4b（版本号）

2. merge时出现冲突
3. 1合并分支语句
$ git merge 分支名

2.2 在写合并分支语句之前把要合并的分支的内容pull下来，如将主分支pull下来
$ git pull origin master

- pull 会出现冲突，pull下来的版本比本地版本更新，可以用git status 看存在哪些冲突，打开文件进行修改，如果要保存原来版本，可在修改前用下列语句存储代码：
  1. 保存
  $ git stash save "...."

  2.可用下列语句恢复
  $ git stash apply 
  
- 和分支进行合并的时候(git merge 分支名)，会出现冲突，同样用git status进行查看冲突，或者运行代码看报错情况，对冲突进行修改。修改后要用git status 查看情况：
- 看提示，要将修改的代码add，add后不能git commit -m "..."，git push origin 分支名，这样会报错，提示存在未合并的文件，不可提交，按照git status 的提示，
将需要add的文件都add ，
- 然后用git commit 提交，会进入vim 编辑器，写提交备注
  shift + c 键-- 进入编辑状态
  esc键 --退出编辑状态
  退出编辑状态后后“：+wq”退出编辑器
- 将冲突都解决，并提交后，程序试运行，看是否能跑，能跑再push
~~~

#### git 与 svn 的区别在哪里？

```
git 和 svn 最大的区别在于 git 是分布式的，而 svn 是集中式的。因此我们不能再离线的情况下使用 svn。如果服务器出现问题，我们就没有办法使用 svn 来提交我们的代码。
svn 中的分支是整个版本库的复制的一份完整目录，而 git 的分支是指针指向某次提交，因此 git 的分支创建更加开销更小并且分支上的变化不会影响到其他人。svn 的分支变化会影响到所有的人。
svn 的指令相对于 git 来说要简单一些，比 git 更容易上手。
```

#### git pull 和 git fetch 的区别

```
   git fetch 只是将远程仓库的变化下载下来，并没有和本地分支合并。
   git pull 会将远程仓库的变化下载下来，并和当前分支合并
```

#### git rebase 和 git merge 的区别

```
git merge 和 git rebase 都是用于分支合并，关键在 commit 记录的处理上不同。
git merge 会新建一个新的 commit 对象，然后两个分支以前的 commit 记录都指向这个新 commit 记录。这种方法会保留之前每个分支的 commit 历史。
git rebase 会先找到两个分支的第一个共同的 commit 祖先记录，然后将提取当前分支这之后的所有 commit 记录，然后将这个 commit 记录添加到目标分支的最新提交后面。经过这个合并后，两个分支合并后的 commit 记录就变为了线性的记录了。
```
