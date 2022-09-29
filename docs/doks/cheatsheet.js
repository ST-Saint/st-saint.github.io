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
        href: "https://st-saint.github.io/doks/cheatsheet/org/",
        title: "Org Cheat Shell",
        description: null,
        content: "\u003ch2 id=\"configuration\"\u003econfiguration \u003ca href=\"#configuration\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cul\u003e\n\u003cli\u003ereveal.js\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e#+REVEAL_THEME: Serif\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003eall\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e#+OPTIONS: broken-links:t \\n:t\n#+LATEX_HEADER: \\hypersetup{colorlinks=true,linkcolor=black}\n#+SETUPFILE: /home/yayu/org/org-html-themes/org/theme-readtheorg-local.setup\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003e\n\u003cp\u003e连接\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e  #+OPTIONS: broken-links:t \\n:t\n\u003c/code\u003e\u003c/pre\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cp\u003e换行\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e  #+OPTIONS: \\n:t\n\u003c/code\u003e\u003c/pre\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cp\u003eTOC 颜色\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e#+LATEX_HEADER: \\hypersetup{colorlinks=true,linkcolor=black}\n\u003c/code\u003e\u003c/pre\u003e\n\u003c/li\u003e\n\u003cli\u003e\n\u003cp\u003eHTML theme\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e#+SETUPFILE: /home/yayu/org/org-html-themes/org/theme-readtheorg-local.setup\n\u003c/code\u003e\u003c/pre\u003e\n\u003c/li\u003e\n\u003c/ul\u003e\n\u003ch2 id=\"fonts\"\u003efonts \u003ca href=\"#fonts\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003ch3 id=\"emphasis-and-monospace\"\u003eEmphasis and Monospace \u003ca href=\"#emphasis-and-monospace\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003col\u003e\n\u003cli\u003e\u003cstrong\u003ebold\u003c/strong\u003e\u003c/li\u003e\n\u003cli\u003e\u003cem\u003eitalic\u003c/em\u003e\u003c/li\u003e\n\u003cli\u003e\u003cspan class=\"underline\"\u003eunderlined\u003c/span\u003e\u003c/li\u003e\n\u003cli\u003e\u003ccode\u003everbatim\u003c/code\u003e\u003c/li\u003e\n\u003cli\u003e\u003ccode\u003ecode\u003c/code\u003e\u003c/li\u003e\n\u003cli\u003e\u003cdel\u003estrike-through\u003c/del\u003e\u003c/li\u003e\n\u003c/ol\u003e\n\u003ch2 id=\"open\"\u003eopen \u003ca href=\"#open\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cul\u003e\n\u003cli\u003e\n\u003cp\u003e快速打开文件\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;\u0026lt;SPC\u0026gt; n f\u0026quot; '+default/find-in-notes)\n\u003c/code\u003e\u003c/pre\u003e\n\u003c/li\u003e\n\u003c/ul\u003e\n\u003ch2 id=\"capture\"\u003ecapture \u003ca href=\"#capture\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cul\u003e\n\u003cli\u003ecapture 文件位置加入 org 文档\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;\u0026lt;SPC\u0026gt; X\u0026quot; 'org-capture)\n(\u0026quot;C-c C-w\u0026quot; 'refile)\n\u003c/code\u003e\u003c/pre\u003e\n\u003cp\u003e\u003ca href=\"/doks/cheatsheet/org/\"\u003ecapture\u003c/a\u003e\u003c/p\u003e\n\u003ch2 id=\"link\"\u003elink \u003ca href=\"#link\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003ch3 id=\"插入链接\"\u003e插入链接 \u003ca href=\"#%e6%8f%92%e5%85%a5%e9%93%be%e6%8e%a5\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;\u0026lt;SPC\u0026gt; m l l\u0026quot; 'org-insert-link)\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"编辑连接\"\u003e编辑连接 \u003ca href=\"#%e7%bc%96%e8%be%91%e8%bf%9e%e6%8e%a5\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;C-c '\u0026quot; 'org-edit-special)\n(\u0026quot;C-C C-l\u0026quot; 'org-insert-link)\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"图片\"\u003e图片 \u003ca href=\"#%e5%9b%be%e7%89%87\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cul\u003e\n\u003cli\u003e调整图片大小\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e#+attr_html: :width 1000px\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch2 id=\"code-snippet\"\u003eCode Snippet \u003ca href=\"#code-snippet\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003ch3 id=\"edit\"\u003eedit \u003ca href=\"#edit\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003e进入模式编辑\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;C-c '\u0026quot; 'org-edit-special)\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"execute\"\u003eexecute \u003ca href=\"#execute\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;C-c C-c\u0026quot; 'org-ctrl-c-ctrl-c)\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch2 id=\"agenda\"\u003eagenda \u003ca href=\"#agenda\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003ch3 id=\"open-agenda\"\u003eopen agenda \u003ca href=\"#open-agenda\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;\u0026lt;SPC\u0026gt; o A\u0026quot; 'org-agenda)\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"pomodoro\"\u003epomodoro \u003ca href=\"#pomodoro\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cul\u003e\n\u003cli\u003estart\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;\u0026lt;SPC\u0026gt; p m\u0026quot; 'org-pomodoro)\n(\u0026quot;C-c p m\u0026quot; 'org-pomodoro)\n\u003c/code\u003e\u003c/pre\u003e\n\u003cul\u003e\n\u003cli\u003erecent task\u003c/li\u003e\n\u003c/ul\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;\u0026lt;SPC\u0026gt; n o\u0026quot; 'org-clock-goto)\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"time\"\u003etime \u003ca href=\"#time\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003ch4 id=\"插入时间\"\u003e插入时间 \u003ca href=\"#%e6%8f%92%e5%85%a5%e6%97%b6%e9%97%b4\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h4\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;C-c .\u0026quot; 'org-time-stamp)\n(\u0026quot;\u0026lt;SPC\u0026gt; m d t\u0026quot; 'org-time-stamp)\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch4 id=\"time-range\"\u003etime range \u003ca href=\"#time-range\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h4\u003e\n\u003col\u003e\n\u003cli\u003ein one day\u003c/li\u003e\n\u003c/ol\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e\u0026lt;2021-06-06 Sun 18:00-20:00\u0026gt;\n\u003c/code\u003e\u003c/pre\u003e\n\u003col\u003e\n\u003cli\u003ecross days\u003c/li\u003e\n\u003c/ol\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-org\"\u003e\u0026lt;2021-06-06 Sun\u0026gt;--\u0026lt;2021-06-08 Tue\u0026gt;\n\u003c/code\u003e\u003c/pre\u003e\n\u003col\u003e\n\u003cli\u003eevaluate time range\u003c/li\u003e\n\u003c/ol\u003e\n\u003c!--listend--\u003e\n\u003cpre\u003e\u003ccode class=\"language-emacs-lisp\"\u003e(\u0026quot;\u0026lt;SPC\u0026gt; m c t\u0026quot; 'org-evaluate-time-range)\n\u003c/code\u003e\u003c/pre\u003e\n"
      },
    {
        id: 1,
        href: "https://st-saint.github.io/doks/cheatsheet/",
        title: "CheatSheet",
        description: null,
        content: ""
      },
    ];
  */

  // https://discourse.gohugo.io/t/range-length-or-last-element/3803/2

  index.add(
    {
        id: 0,
        href: "/doks/cheatsheet/org/",
        title: "Org Cheat Shell",
        description: "configuration # reveal.js #+REVEAL_THEME: Serif all #+OPTIONS: broken-links:t \\n:t #+LATEX_HEADER: \\hypersetup{colorlinks=true,linkcolor=black} #+SETUPFILE: /home/yayu/org/org-html-themes/org/theme-readtheorg-local.setup 连接\n#+OPTIONS: broken-links:t \\n:t 换行\n#+OPTIONS: \\n:t TOC 颜色\n#+LATEX_HEADER: \\hypersetup{colorlinks=true,linkcolor=black} HTML theme\n#+SETUPFILE: /home/yayu/org/org-html-themes/org/theme-readtheorg-local.setup fonts # Emphasis and Monospace # bold italic underlined verbatim code strike-through open # 快速打开文件\n(\u0026quot;\u0026lt;SPC\u0026gt; n f\u0026quot; '+default/find-in-notes) capture # capture 文件位置加入 org 文档 (\u0026quot;\u0026lt;SPC\u0026gt; X\u0026quot; 'org-capture) (\u0026quot;C-c C-w\u0026quot; 'refile) capture\nlink # 插入链接 # (\u0026quot;\u0026lt;SPC\u0026gt; m l l\u0026quot; 'org-insert-link) 编辑连接 # (\u0026quot;C-c '\u0026quot; 'org-edit-special) (\u0026quot;C-C C-l\u0026quot; 'org-insert-link) 图片 # 调整图片大小 #+attr_html: :width 1000px Code Snippet # edit # 进入模式编辑",
        content: "configuration # reveal.js #+REVEAL_THEME: Serif all #+OPTIONS: broken-links:t \\n:t #+LATEX_HEADER: \\hypersetup{colorlinks=true,linkcolor=black} #+SETUPFILE: /home/yayu/org/org-html-themes/org/theme-readtheorg-local.setup 连接\n#+OPTIONS: broken-links:t \\n:t 换行\n#+OPTIONS: \\n:t TOC 颜色\n#+LATEX_HEADER: \\hypersetup{colorlinks=true,linkcolor=black} HTML theme\n#+SETUPFILE: /home/yayu/org/org-html-themes/org/theme-readtheorg-local.setup fonts # Emphasis and Monospace # bold italic underlined verbatim code strike-through open # 快速打开文件\n(\u0026quot;\u0026lt;SPC\u0026gt; n f\u0026quot; '+default/find-in-notes) capture # capture 文件位置加入 org 文档 (\u0026quot;\u0026lt;SPC\u0026gt; X\u0026quot; 'org-capture) (\u0026quot;C-c C-w\u0026quot; 'refile) capture\nlink # 插入链接 # (\u0026quot;\u0026lt;SPC\u0026gt; m l l\u0026quot; 'org-insert-link) 编辑连接 # (\u0026quot;C-c '\u0026quot; 'org-edit-special) (\u0026quot;C-C C-l\u0026quot; 'org-insert-link) 图片 # 调整图片大小 #+attr_html: :width 1000px Code Snippet # edit # 进入模式编辑\n(\u0026quot;C-c '\u0026quot; 'org-edit-special) execute # (\u0026quot;C-c C-c\u0026quot; 'org-ctrl-c-ctrl-c) agenda # open agenda # (\u0026quot;\u0026lt;SPC\u0026gt; o A\u0026quot; 'org-agenda) pomodoro # start (\u0026quot;\u0026lt;SPC\u0026gt; p m\u0026quot; 'org-pomodoro) (\u0026quot;C-c p m\u0026quot; 'org-pomodoro) recent task (\u0026quot;\u0026lt;SPC\u0026gt; n o\u0026quot; 'org-clock-goto) time # 插入时间 # (\u0026quot;C-c .\u0026quot; 'org-time-stamp) (\u0026quot;\u0026lt;SPC\u0026gt; m d t\u0026quot; 'org-time-stamp) time range # in one day \u0026lt;2021-06-06 Sun 18:00-20:00\u0026gt; cross days \u0026lt;2021-06-06 Sun\u0026gt;--\u0026lt;2021-06-08 Tue\u0026gt; evaluate time range (\u0026quot;\u0026lt;SPC\u0026gt; m c t\u0026quot; 'org-evaluate-time-range) "
      })
      .add(
      {
        id: 1,
        href: "/doks/cheatsheet/",
        title: "CheatSheet",
        description: "",
        content: ""
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
