var suggestions = document.getElementById('suggestions');
var search = document.getElementById('search');

if (search !== null) {
  document.addEventListener('keydown', inputFocus);
}

function inputFocus(e) {
  if (e.ctrlKey && e.key === '/' ) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === 'Escape' ) {
    search.blur();
    suggestions.classList.add('d-none');
  }
}

document.addEventListener('click', function(event) {

  var isClickInsideElement = suggestions.contains(event.target);

  if (!isClickInsideElement) {
    suggestions.classList.add('d-none');
  }

});

/*
Source:
  - https://dev.to/shubhamprakash/trap-focus-using-javascript-6a3
*/

document.addEventListener('keydown',suggestionFocus);

function suggestionFocus(e) {
  const suggestionsHidden = suggestions.classList.contains('d-none');
  if (suggestionsHidden) return;

  const focusableSuggestions= [...suggestions.querySelectorAll('a')];
  if (focusableSuggestions.length === 0) return;

  const index = focusableSuggestions.indexOf(document.activeElement);

  if (e.key === "ArrowUp") {
    e.preventDefault();
    const nextIndex = index > 0 ? index - 1 : 0;
    focusableSuggestions[nextIndex].focus();
  }
  else if (e.key === "ArrowDown") {
    e.preventDefault();
    const nextIndex= index + 1 < focusableSuggestions.length ? index + 1 : index;
    focusableSuggestions[nextIndex].focus();
  }

}

/*
Source:
  - https://github.com/nextapps-de/flexsearch#index-documents-field-search
  - https://raw.githack.com/nextapps-de/flexsearch/master/demo/autocomplete.html
*/

(function(){

  var index = new FlexSearch.Document({
    tokenize: "forward",
    cache: 100,
    document: {
      id: 'id',
      store: [
        "href", "title", "description"
      ],
      index: ["title", "description", "content"]
    }
  });


  // Not yet supported: https://github.com/nextapps-de/flexsearch#complex-documents

  /*
  var docs = [
    {
        id: 0,
        href: "https://st-saint.github.io/cheatsheet/org/",
        title: "Org Cheat Shell",
        description: null,
        content: "\u003ch2 id=\"configuration\"\u003econfiguration \u003ca href=\"#configuration\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cul\u003e\n\u003cli\u003ereveal.js\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e#+REVEAL_THEME: Serif\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003eall\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e#+OPTIONS: broken-links:t \\n:t\n#+LATEX_HEADER: \\hypersetup{colorlinks=true,linkcolor=black}\n#+SETUPFILE: /home/yayu/org/org-html-themes/org/theme-readtheorg-local.setup\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003e\n\u003cp\u003e连接\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e  #+OPTIONS: broken-links:t \\n:t\n\u003c/code\u003e\u003c/pre\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cp\u003e换行\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e  #+OPTIONS: \\n:t\n\u003c/code\u003e\u003c/pre\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cp\u003eTOC 颜色\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e#+LATEX_HEADER: \\hypersetup{colorlinks=true,linkcolor=black}\n\u003c/code\u003e\u003c/pre\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cp\u003eHTML theme\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e#+SETUPFILE: /home/yayu/org/org-html-themes/org/theme-readtheorg-local.setup\n\u003c/code\u003e\u003c/pre\u003e\n\u003c/li\u003e\n\u003c/ul\u003e\n\u003ch2 id=\"fonts\"\u003efonts \u003ca href=\"#fonts\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003ch3 id=\"emphasis-and-monospace\"\u003eEmphasis and Monospace \u003ca href=\"#emphasis-and-monospace\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003col\u003e\n\u003cli\u003e\u003cstrong\u003ebold\u003c/strong\u003e\u003c/li\u003e\n\u003cli\u003e\u003cem\u003eitalic\u003c/em\u003e\u003c/li\u003e\n\u003cli\u003e\u003cspan class=\"underline\"\u003eunderlined\u003c/span\u003e\u003c/li\u003e\n\u003cli\u003e\u003ccode\u003everbatim\u003c/code\u003e\u003c/li\u003e\n\u003cli\u003e\u003ccode\u003ecode\u003c/code\u003e\u003c/li\u003e\n\u003cli\u003e\u003cdel\u003estrike-through\u003c/del\u003e\u003c/li\u003e\n\u003c/ol\u003e\n\u003ch2 id=\"open\"\u003eopen \u003ca href=\"#open\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cul\u003e\n\u003cli\u003e\n\u003cp\u003e快速打开文件\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;\u0026lt;SPC\u0026gt; n f\u0026quot; '+default/find-in-notes)\n\u003c/code\u003e\u003c/pre\u003e\n\u003c/li\u003e\n\u003c/ul\u003e\n\u003ch2 id=\"capture\"\u003ecapture \u003ca href=\"#capture\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cul\u003e\n\u003cli\u003ecapture 文件位置加入 org 文档\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;\u0026lt;SPC\u0026gt; X\u0026quot; 'org-capture)\n(\u0026quot;C-c C-w\u0026quot; 'refile)\n\u003c/code\u003e\u003c/pre\u003e\n\u003cp\u003e\u003ca href=\"/cheatsheet/org/\"\u003ecapture\u003c/a\u003e\u003c/p\u003e\n\u003ch2 id=\"link\"\u003elink \u003ca href=\"#link\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003ch3 id=\"插入链接\"\u003e插入链接 \u003ca href=\"#%e6%8f%92%e5%85%a5%e9%93%be%e6%8e%a5\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;\u0026lt;SPC\u0026gt; m l l\u0026quot; 'org-insert-link)\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"编辑连接\"\u003e编辑连接 \u003ca href=\"#%e7%bc%96%e8%be%91%e8%bf%9e%e6%8e%a5\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;C-c '\u0026quot; 'org-edit-special)\n(\u0026quot;C-C C-l\u0026quot; 'org-insert-link)\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"图片\"\u003e图片 \u003ca href=\"#%e5%9b%be%e7%89%87\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cul\u003e\n\u003cli\u003e调整图片大小\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e#+attr_html: :width 1000px\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch2 id=\"code-snippet\"\u003eCode Snippet \u003ca href=\"#code-snippet\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003ch3 id=\"edit\"\u003eedit \u003ca href=\"#edit\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003e进入模式编辑\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;C-c '\u0026quot; 'org-edit-special)\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"execute\"\u003eexecute \u003ca href=\"#execute\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;C-c C-c\u0026quot; 'org-ctrl-c-ctrl-c)\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch2 id=\"agenda\"\u003eagenda \u003ca href=\"#agenda\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003ch3 id=\"open-agenda\"\u003eopen agenda \u003ca href=\"#open-agenda\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;\u0026lt;SPC\u0026gt; o A\u0026quot; 'org-agenda)\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"pomodoro\"\u003epomodoro \u003ca href=\"#pomodoro\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cul\u003e\n\u003cli\u003estart\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;\u0026lt;SPC\u0026gt; p m\u0026quot; 'org-pomodoro)\n(\u0026quot;C-c p m\u0026quot; 'org-pomodoro)\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003erecent task\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;\u0026lt;SPC\u0026gt; n o\u0026quot; 'org-clock-goto)\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"time\"\u003etime \u003ca href=\"#time\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003ch4 id=\"插入时间\"\u003e插入时间 \u003ca href=\"#%e6%8f%92%e5%85%a5%e6%97%b6%e9%97%b4\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h4\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;C-c .\u0026quot; 'org-time-stamp)\n(\u0026quot;\u0026lt;SPC\u0026gt; m d t\u0026quot; 'org-time-stamp)\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch4 id=\"time-range\"\u003etime range \u003ca href=\"#time-range\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h4\u003e\n\u003col\u003e\n\u003cli\u003ein one day\u003c/li\u003e\n\u003c/ol\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e\u0026lt;2021-06-06 Sun 18:00-20:00\u0026gt;\n\u003c/code\u003e\u003c/pre\u003e\n\u003col\u003e\n\u003cli\u003ecross days\u003c/li\u003e\n\u003c/ol\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e\u0026lt;2021-06-06 Sun\u0026gt;--\u0026lt;2021-06-08 Tue\u0026gt;\n\u003c/code\u003e\u003c/pre\u003e\n\u003col\u003e\n\u003cli\u003eevaluate time range\u003c/li\u003e\n\u003c/ol\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;\u0026lt;SPC\u0026gt; m c t\u0026quot; 'org-evaluate-time-range)\n\u003c/code\u003e\u003c/pre\u003e\n"
      },
    {
        id: 1,
        href: "https://st-saint.github.io/cheatsheet/",
        title: "CheatSheet",
        description: null,
        content: ""
      },
    {
        id: 2,
        href: "https://st-saint.github.io/cheatsheet/linux/linux/",
        title: "Linux Cheat Sheet",
        description: null,
        content: "\u003ch2 id=\"shell\"\u003eshell \u003ca href=\"#shell\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003ch3 id=\"find-files\"\u003efind files \u003ca href=\"#find-files\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003efind ./fuzz-results/crashes -type f -name \u0026quot;id:$1*\u0026quot; -print0 | while read -d $'\\0' file\ndo\n    echo $file\ndone\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"xargs\"\u003exargs \u003ca href=\"#xargs\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003e多行转单行输入, 默认分隔符为换行\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003epacman -Q | grep -i \u0026quot;haskell\u0026quot; | xargs sudo pacman -S --noconfirm\n\u003c/code\u003e\u003c/pre\u003e\n\u003cp\u003eplaceholder\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003exargs -I {} mv dir1/{} dir2/{}\nxargs -I '{}' mv dir1/'{}' dir2/'{}'\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"stream\"\u003estream \u003ca href=\"#stream\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003ctable\u003e\n\u003cthead\u003e\n\u003ctr\u003e\n\u003cth\u003esymbol\u003c/th\u003e\n\u003cth\u003emeanings\u003c/th\u003e\n\u003c/tr\u003e\n\u003c/thead\u003e\n\u003ctbody\u003e\n\u003ctr\u003e\n\u003ctd\u003e0\u003c/td\u003e\n\u003ctd\u003estdin\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003e1\u003c/td\u003e\n\u003ctd\u003estdout\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003e2\u003c/td\u003e\n\u003ctd\u003estderr\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003e2\u0026gt;\u0026amp;1\u003c/td\u003e\n\u003ctd\u003estderr to stdout\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003e1\u0026gt;\u003c/td\u003e\n\u003ctd\u003estdout redirect\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003e2\u0026gt;\u003c/td\u003e\n\u003ctd\u003estderr redirect\u003c/td\u003e\n\u003c/tr\u003e\n\u003ctr\u003e\n\u003ctd\u003e1\u0026gt;/dev/null\u003c/td\u003e\n\u003ctd\u003ewrite to void\u003c/td\u003e\n\u003c/tr\u003e\n\u003c/tbody\u003e\n\u003c/table\u003e\n\u003ch3 id=\"uniq\"\u003euniq \u003ca href=\"#uniq\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003e仅输出 unique 行\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003euniq -u\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"grep\"\u003egrep \u003ca href=\"#grep\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003egrep\u003c/p\u003e\n\u003ch2 id=\"zip\"\u003ezip \u003ca href=\"#zip\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003ch3 id=\"zip\"\u003ezip \u003ca href=\"#zip\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cul\u003e\n\u003cli\u003e-q 不显示命令\u003c/li\u003e\n\u003cli\u003e-r 递归\u003c/li\u003e\n\u003cli\u003e-y 不解析 symbol link\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003ezip -qry zip_file.zip file1 file2 dir1\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003e-d\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003eunzip jacoco-0.8.7.zip -d jacoco\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"tar\"\u003etar \u003ca href=\"#tar\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003ch4 id=\"解压\"\u003e解压 \u003ca href=\"#%e8%a7%a3%e5%8e%8b\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h4\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003etar -xzvf sample.tar.gz -C ./sample\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch2 id=\"network\"\u003enetwork \u003ca href=\"#network\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003ch3 id=\"iw\"\u003eiw \u003ca href=\"#iw\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cul\u003e\n\u003cli\u003e格式\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003eiw [ OPTIONS ] { help [ command ] | OBJECT COMMAND }\nOBJECT := { dev | phy | reg }\nOPTIONS := { --version | --debug }\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003e搜索\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003eiw dev \u0026lt;devname\u0026gt; scan\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003e显示设备\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003eiw dev\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003e显示设备信息\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003eiw dev \u0026lt;devename\u0026gt; info\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003e显示连接信息\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003eiw dev \u0026lt;devname\u0026gt; link\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003e连接\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003eiw dev \u0026lt;devname\u0026gt; connect [-w] \u0026lt;SSID\u0026gt; [\u0026lt;freq in MHz\u0026gt;] [\u0026lt;bssid\u0026gt;] [key 0:abcde d:1:6162636465] [mfp:req/opt/no]\n# Join the network with the given SSID (and frequency, BSSID).\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"network-manager\"\u003eNetwork Manager \u003ca href=\"#network-manager\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cul\u003e\n\u003cli\u003e扫描\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003enmcli device wifi rescan\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003e显示\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003enmcli device wifi list\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003e连接\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003enmcli device wifi connect \u0026lt;SSID\u0026gt; password \u0026lt;password\u0026gt; [hidden yes]\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch2 id=\"user-management\"\u003euser management \u003ca href=\"#user-management\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003ch3 id=\"add-user\"\u003eadd user \u003ca href=\"#add-user\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cul\u003e\n\u003cli\u003e连接到服务器\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003essh root@10.105.250.92\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003e创建用户\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003eadduser example\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003e添加 \u003ccode\u003esudo\u003c/code\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003eadduser example sudo\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"ssh-pem\"\u003essh pem \u003ca href=\"#ssh-pem\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cul\u003e\n\u003cli\u003e生成密钥\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003esudo su example\ncd ~/.ssh\nssh-keygen -t ed25519 -C \u0026quot;example@mail.com\u0026quot;\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003e修改权限\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003ecp ed25519.pub authorized_keys\nchmod 600 authorized_keys\nchmod 700 ~/.ssh\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003e拷贝密钥\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003escp root@10.105.250.92:/home/example/.ssh/ed25519 ~/.ssh/\n\u003c/code\u003e\u003c/pre\u003e\n"
      },
    {
        id: 3,
        href: "https://st-saint.github.io/cheatsheet/shell/",
        title: "Shell Cheat Sheet",
        description: null,
        content: "\u003ch2 id=\"循环\"\u003e循环 \u003ca href=\"#%e5%be%aa%e7%8e%af\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003efor it in $array; do\ndone\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch2 id=\"条件\"\u003e条件 \u003ca href=\"#%e6%9d%a1%e4%bb%b6\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003ch3 id=\"中括号\"\u003e中括号 \u003ca href=\"#%e4%b8%ad%e6%8b%ac%e5%8f%b7\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003ch4 id=\"单中括号\"\u003e单中括号 [ ] \u003ca href=\"#%e5%8d%95%e4%b8%ad%e6%8b%ac%e5%8f%b7\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h4\u003e\n\u003col\u003e\n\u003cli\u003e[  ] 两个符号左右都要有空格分隔\u003c/li\u003e\n\u003cli\u003e内部操作符与操作变量之间要有空格：如 [ \u0026ldquo;a\u0026rdquo; = \u0026ldquo;b\u0026rdquo; ]\u003c/li\u003e\n\u003cli\u003e字符串比较中，\u0026gt; \u0026lt; 需要写成\u0026gt; \\\u0026lt; 进行转义\u003c/li\u003e\n\u003cli\u003e[  ] 中字符串或者${}变量尽量使用\u0026quot;\u0026ldquo;双引号扩住，以避免值未定义引用而出错\u003c/li\u003e\n\u003cli\u003e[  ] 中可以使用 –a –o 进行逻辑运算\u003c/li\u003e\n\u003cli\u003e[  ] 是 shell 内置命令\u003c/li\u003e\n\u003c/ol\u003e\n\u003ch4 id=\"双中括号\"\u003e双中括号 \u003ca href=\"#%e5%8f%8c%e4%b8%ad%e6%8b%ac%e5%8f%b7\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h4\u003e\n\u003col\u003e\n\u003cli\u003e\u003ccode\u003e[[ ]]\u003c/code\u003e 两个符号左右都要有空格分隔\u003c/li\u003e\n\u003cli\u003e\u003ccode\u003e[[ ]]\u003c/code\u003e 内部操作符与操作变量之间要有空格：如 \u003ccode\u003e[[ \u0026quot;a\u0026quot; = \u0026quot;b\u0026quot; ]]\u003c/code\u003e\u003c/li\u003e\n\u003cli\u003e\u003ccode\u003e[[ ]]\u003c/code\u003e 字符串比较中，可以直接使用 \u0026gt; \u0026lt; 无需转义\u003c/li\u003e\n\u003cli\u003e\u003ccode\u003e[[ ]]\u003c/code\u003e 中字符串或者${}变量尽量使用\u0026rdquo;\u0026quot; 双引号扩住，如未使用\u0026quot;\u0026ldquo;会进行模式和元字符匹配\u003c/li\u003e\n\u003cli\u003e\u003ccode\u003e[[ ]]\u003c/code\u003e 内部可以使用 \u0026amp;\u0026amp; || 进行逻辑运算\u003c/li\u003e\n\u003cli\u003e\u003ccode\u003e[[ ]]\u003c/code\u003e 是 bash keyword\u003c/li\u003e\n\u003c/ol\u003e\n\u003ch3 id=\"文件夹或文件\"\u003e文件夹或文件 \u003ca href=\"#%e6%96%87%e4%bb%b6%e5%a4%b9%e6%88%96%e6%96%87%e4%bb%b6\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003ch4 id=\"存在\"\u003e存在 \u003ca href=\"#%e5%ad%98%e5%9c%a8\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h4\u003e\n\u003c!--list-separator--\u003e\n\u003cul\u003e\n\u003cli\u003e\n\u003cp\u003e文件夹\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003eif [ ! -d \u0026quot;folder\u0026quot; ];then\nfi\n\u003c/code\u003e\u003c/pre\u003e\n\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--list-separator--\u003e\n\u003cul\u003e\n\u003cli\u003e\n\u003cp\u003e文件\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-shell\"\u003eif [ ! -f \u0026quot;file\u0026quot; ];then\nfi\n\u003c/code\u003e\u003c/pre\u003e\n\u003c/li\u003e\n\u003c/ul\u003e\n"
      },
    ];
  */

  // https://discourse.gohugo.io/t/range-length-or-last-element/3803/2

  index.add(
    {
        id: 0,
        href: "/cheatsheet/org/",
        title: "Org Cheat Shell",
        description: "configuration #  reveal.js   #+REVEAL_THEME: Serif   all   #+OPTIONS: broken-links:t \\n:t #+LATEX_HEADER: \\hypersetup{colorlinks=true,linkcolor=black} #+SETUPFILE: /home/yayu/org/org-html-themes/org/theme-readtheorg-local.setup    连接\n#+OPTIONS: broken-links:t \\n:t    换行\n#+OPTIONS: \\n:t    TOC 颜色\n#+LATEX_HEADER: \\hypersetup{colorlinks=true,linkcolor=black}    HTML theme\n#+SETUPFILE: /home/yayu/org/org-html-themes/org/theme-readtheorg-local.setup    fonts # Emphasis and Monospace #  bold italic underlined verbatim code strike-through  open #   快速打开文件\n(\u0026quot;\u0026lt;SPC\u0026gt; n f\u0026quot; '+default/find-in-notes)    capture #  capture 文件位置加入 org 文档   (\u0026quot;\u0026lt;SPC\u0026gt; X\u0026quot; 'org-capture) (\u0026quot;C-c C-w\u0026quot; 'refile)  capture",
        content: "configuration #  reveal.js   #+REVEAL_THEME: Serif   all   #+OPTIONS: broken-links:t \\n:t #+LATEX_HEADER: \\hypersetup{colorlinks=true,linkcolor=black} #+SETUPFILE: /home/yayu/org/org-html-themes/org/theme-readtheorg-local.setup    连接\n#+OPTIONS: broken-links:t \\n:t    换行\n#+OPTIONS: \\n:t    TOC 颜色\n#+LATEX_HEADER: \\hypersetup{colorlinks=true,linkcolor=black}    HTML theme\n#+SETUPFILE: /home/yayu/org/org-html-themes/org/theme-readtheorg-local.setup    fonts # Emphasis and Monospace #  bold italic underlined verbatim code strike-through  open #   快速打开文件\n(\u0026quot;\u0026lt;SPC\u0026gt; n f\u0026quot; '+default/find-in-notes)    capture #  capture 文件位置加入 org 文档   (\u0026quot;\u0026lt;SPC\u0026gt; X\u0026quot; 'org-capture) (\u0026quot;C-c C-w\u0026quot; 'refile)  capture\nlink # 插入链接 # (\u0026quot;\u0026lt;SPC\u0026gt; m l l\u0026quot; 'org-insert-link)  编辑连接 # (\u0026quot;C-c '\u0026quot; 'org-edit-special) (\u0026quot;C-C C-l\u0026quot; 'org-insert-link)  图片 #  调整图片大小   #+attr_html: :width 1000px  Code Snippet # edit # 进入模式编辑\n(\u0026quot;C-c '\u0026quot; 'org-edit-special)  execute # (\u0026quot;C-c C-c\u0026quot; 'org-ctrl-c-ctrl-c)  agenda # open agenda # (\u0026quot;\u0026lt;SPC\u0026gt; o A\u0026quot; 'org-agenda)  pomodoro #  start   (\u0026quot;\u0026lt;SPC\u0026gt; p m\u0026quot; 'org-pomodoro) (\u0026quot;C-c p m\u0026quot; 'org-pomodoro)   recent task   (\u0026quot;\u0026lt;SPC\u0026gt; n o\u0026quot; 'org-clock-goto)  time # 插入时间 # (\u0026quot;C-c .\u0026quot; 'org-time-stamp) (\u0026quot;\u0026lt;SPC\u0026gt; m d t\u0026quot; 'org-time-stamp)  time range #  in one day   \u0026lt;2021-06-06 Sun 18:00-20:00\u0026gt;   cross days   \u0026lt;2021-06-06 Sun\u0026gt;--\u0026lt;2021-06-08 Tue\u0026gt;   evaluate time range   (\u0026quot;\u0026lt;SPC\u0026gt; m c t\u0026quot; 'org-evaluate-time-range)  "
      })
      .add(
      {
        id: 1,
        href: "/cheatsheet/",
        title: "CheatSheet",
        description: "",
        content: ""
      })
      .add(
      {
        id: 2,
        href: "/cheatsheet/linux/linux/",
        title: "Linux Cheat Sheet",
        description: "shell # find files # find ./fuzz-results/crashes -type f -name \u0026quot;id:$1*\u0026quot; -print0 | while read -d $'\\0' file do echo $file done  xargs # 多行转单行输入, 默认分隔符为换行\npacman -Q | grep -i \u0026quot;haskell\u0026quot; | xargs sudo pacman -S --noconfirm  placeholder\nxargs -I {} mv dir1/{} dir2/{} xargs -I '{}' mv dir1/'{}' dir2/'{}'  stream #    symbol meanings     0 stdin   1 stdout   2 stderr   2\u0026gt;\u0026amp;1 stderr to stdout   1\u0026gt; stdout redirect   2\u0026gt; stderr redirect   1\u0026gt;/dev/null write to void    uniq # 仅输出 unique 行",
        content: "shell # find files # find ./fuzz-results/crashes -type f -name \u0026quot;id:$1*\u0026quot; -print0 | while read -d $'\\0' file do echo $file done  xargs # 多行转单行输入, 默认分隔符为换行\npacman -Q | grep -i \u0026quot;haskell\u0026quot; | xargs sudo pacman -S --noconfirm  placeholder\nxargs -I {} mv dir1/{} dir2/{} xargs -I '{}' mv dir1/'{}' dir2/'{}'  stream #    symbol meanings     0 stdin   1 stdout   2 stderr   2\u0026gt;\u0026amp;1 stderr to stdout   1\u0026gt; stdout redirect   2\u0026gt; stderr redirect   1\u0026gt;/dev/null write to void    uniq # 仅输出 unique 行\nuniq -u  grep # grep\nzip # zip #  -q 不显示命令 -r 递归 -y 不解析 symbol link   zip -qry zip_file.zip file1 file2 dir1   -d   unzip jacoco-0.8.7.zip -d jacoco  tar # 解压 # tar -xzvf sample.tar.gz -C ./sample  network # iw #  格式   iw [ OPTIONS ] { help [ command ] | OBJECT COMMAND } OBJECT := { dev | phy | reg } OPTIONS := { --version | --debug }   搜索   iw dev \u0026lt;devname\u0026gt; scan   显示设备   iw dev   显示设备信息   iw dev \u0026lt;devename\u0026gt; info   显示连接信息   iw dev \u0026lt;devname\u0026gt; link   连接   iw dev \u0026lt;devname\u0026gt; connect [-w] \u0026lt;SSID\u0026gt; [\u0026lt;freq in MHz\u0026gt;] [\u0026lt;bssid\u0026gt;] [key 0:abcde d:1:6162636465] [mfp:req/opt/no] # Join the network with the given SSID (and frequency, BSSID).  Network Manager #  扫描   nmcli device wifi rescan   显示   nmcli device wifi list   连接   nmcli device wifi connect \u0026lt;SSID\u0026gt; password \u0026lt;password\u0026gt; [hidden yes]  user management # add user #  连接到服务器   ssh root@10.105.250.92   创建用户   adduser example   添加 sudo   adduser example sudo  ssh pem #  生成密钥   sudo su example cd ~/.ssh ssh-keygen -t ed25519 -C \u0026quot;example@mail.com\u0026quot;   修改权限   cp ed25519.pub authorized_keys chmod 600 authorized_keys chmod 700 ~/.ssh   拷贝密钥   scp root@10.105.250.92:/home/example/.ssh/ed25519 ~/.ssh/  "
      })
      .add(
      {
        id: 3,
        href: "/cheatsheet/shell/",
        title: "Shell Cheat Sheet",
        description: "循环 # for it in $array; do done  条件 # 中括号 # 单中括号 [ ] #  [ ] 两个符号左右都要有空格分隔 内部操作符与操作变量之间要有空格：如 [ \u0026ldquo;a\u0026rdquo; = \u0026ldquo;b\u0026rdquo; ] 字符串比较中，\u0026gt; \u0026lt; 需要写成\u0026gt; \\\u0026lt; 进行转义 [ ] 中字符串或者${}变量尽量使用\u0026quot;\u0026ldquo;双引号扩住，以避免值未定义引用而出错 [ ] 中可以使用 –a –o 进行逻辑运算 [ ] 是 shell 内置命令  双中括号 #  [[ ]] 两个符号左右都要有空格分隔 [[ ]] 内部操作符与操作变量之间要有空格：如 [[ \u0026quot;a\u0026quot; = \u0026quot;b\u0026quot; ]] [[ ]] 字符串比较中，可以直接使用 \u0026gt; \u0026lt; 无需转义 [[ ]] 中字符串或者${}变量尽量使用\u0026rdquo;\u0026quot; 双引号扩住，如未使用\u0026quot;\u0026ldquo;会进行模式和元字符匹配 [[ ]] 内部可以使用 \u0026amp;\u0026amp; || 进行逻辑运算 [[ ]] 是 bash keyword  文件夹或文件 # 存在 #    文件夹",
        content: "循环 # for it in $array; do done  条件 # 中括号 # 单中括号 [ ] #  [ ] 两个符号左右都要有空格分隔 内部操作符与操作变量之间要有空格：如 [ \u0026ldquo;a\u0026rdquo; = \u0026ldquo;b\u0026rdquo; ] 字符串比较中，\u0026gt; \u0026lt; 需要写成\u0026gt; \\\u0026lt; 进行转义 [ ] 中字符串或者${}变量尽量使用\u0026quot;\u0026ldquo;双引号扩住，以避免值未定义引用而出错 [ ] 中可以使用 –a –o 进行逻辑运算 [ ] 是 shell 内置命令  双中括号 #  [[ ]] 两个符号左右都要有空格分隔 [[ ]] 内部操作符与操作变量之间要有空格：如 [[ \u0026quot;a\u0026quot; = \u0026quot;b\u0026quot; ]] [[ ]] 字符串比较中，可以直接使用 \u0026gt; \u0026lt; 无需转义 [[ ]] 中字符串或者${}变量尽量使用\u0026rdquo;\u0026quot; 双引号扩住，如未使用\u0026quot;\u0026ldquo;会进行模式和元字符匹配 [[ ]] 内部可以使用 \u0026amp;\u0026amp; || 进行逻辑运算 [[ ]] 是 bash keyword  文件夹或文件 # 存在 #    文件夹\nif [ ! -d \u0026quot;folder\u0026quot; ];then fi       文件\nif [ ! -f \u0026quot;file\u0026quot; ];then fi    "
      })
      ;

  search.addEventListener('input', show_results, true);

  function show_results(){
    const maxResult = 5;
    var searchQuery = this.value;
    var results = index.search(searchQuery, {limit: maxResult, enrich: true});

    // flatten results since index.search() returns results for each indexed field
    const flatResults = new Map(); // keyed by href to dedupe results
    for (const result of results.flatMap(r => r.result)) {
      if (flatResults.has(result.doc.href)) continue;
      flatResults.set(result.doc.href, result.doc);
    }

    suggestions.innerHTML = "";
    suggestions.classList.remove('d-none');

    // inform user that no results were found
    if (flatResults.size === 0 && searchQuery) {
      const noResultsMessage = document.createElement('div')
      noResultsMessage.innerHTML = `No results for "<strong>${searchQuery}</strong>"`
      noResultsMessage.classList.add("suggestion__no-results");
      suggestions.appendChild(noResultsMessage);
      return;
    }

    // construct a list of suggestions
    for(const [href, doc] of flatResults) {
        const entry = document.createElement('div');
        suggestions.appendChild(entry);

        const a = document.createElement('a');
        a.href = href;
        entry.appendChild(a);

        const title = document.createElement('span');
        title.textContent = doc.title;
        title.classList.add("suggestion__title");
        a.appendChild(title);

        const description = document.createElement('span');
        description.textContent = doc.description;
        description.classList.add("suggestion__description");
        a.appendChild(description);

        suggestions.appendChild(entry);

        if(suggestions.childElementCount == maxResult) break;
    }
  }
}());
